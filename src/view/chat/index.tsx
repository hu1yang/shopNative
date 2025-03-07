import React , {useState , useEffect , useRef} from "react";
import {View, Text, TextInput, StyleSheet, Button, Alert, SafeAreaView, TouchableOpacity, Platform , KeyboardAvoidingView , ScrollView } from "react-native";
import { MainTabProps } from "@/router/NestingNavigators";
import {createMessage} from "@/util/message";
import axios from "@/util/axios";
import Toast from "react-native-toast-message";
import WebSocketClient , { IWebSocketParams } from "@/util/socket";
import {optionMessageProp} from "@/types/message";
import { useSelector , useDispatch } from "react-redux";
import {RootState} from "@/store";
import {IUserInfo} from "@/types/user";
import defaultStyled from "@/assets/defaultStyled";
import { KeyboardProvider } from "react-native-keyboard-controller";


import History from './History'

const styles = StyleSheet.create({
    container:{
        width:'100%',
        height:'100%',
        backgroundColor:'#f8f8f8'
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderTopWidth: 1,
        borderTopColor: '#E5E5E5',
        padding: 10,
    },
    textInput: {
        flex: 1,
        height: 40,
        borderColor: '#E5E5E5',
        borderWidth: 1,
        borderRadius: 20,
        paddingLeft: 12,
        fontSize: 16,
    },
    sendButton: {
        backgroundColor: '#0078D4',
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 20,
        marginLeft: 10,
    },
    sendButtonText: {
        color: '#fff',
        fontSize: 16,
    },
})
const Chat = (props:MainTabProps<'Chat'>) => {
    const [chat, setChat] = useState<string>('');
    const [roomId, setRoomId] = useState<number|null>(null);
    const [messageList, setMessageList] = useState<optionMessageProp[]>([]);
    const socketRef = useRef<WebSocketClient|null>(null)

    const userInfo:IUserInfo = useSelector((state:RootState) => state.user.userInfo)

    useEffect( () => {
        const fetchUserInfo = async () => {
            if (props.route.params.roomId) {
                setRoomId(props.route.params?.roomId);
                checkRoom(props.route.params?.roomId);
            }
        };

        fetchUserInfo();
        return () => {
            socketRef.current?.disconnect()
            socketRef.current = null
            console.log('关闭socket')
        }
    },[])

    const checkRoom = (room_id:number) => {
        axios.get('/message/room/check',{roomId:room_id}).then((res) => {
            if(res.code === 200){
                !socketRef.current && clientSocket(room_id)
            }else{
                Toast.show({
                    type: 'error',  // 可以选择不同的类型，如 success, error, info
                    position: 'top',  // 默认从顶部显示
                    text1: res.msg,
                    visibilityTime: 3000,  // Toast显示时长
                    topOffset: 150, // 控制顶部距离，修改此值调整 Toast 显示的高度
                    text1Style: {
                        fontSize: 14,
                        color: '#333', // 自定义文字颜色
                    },
                    text2Style:{
                        fontSize: 12,
                        color: '#ccc', // 自定义文字颜色
                    }
                });
                setTimeout(() => {
                    props.navigation.goBack()
                },200)
            }
        })
    }



    const showReconnectAlert = () => {
        Alert.alert(
            '连接失败',
            'Socket 连接失败，请检查网络或点击重试以重新连接。',
            [
                {
                    text: '取消',
                    style: 'cancel',
                    onPress: () => {
                        props.navigation.reset({
                            index: 0, // 重置堆栈的索引
                            routes: [{ name: 'Tabbar', params: { screen: 'Home' } }],
                        });
                    }
                },
                {
                    text: '重试',
                    onPress: () => {
                        socketRef.current = null
                        roomId && clientSocket(roomId); // 用户点击重试时重新连接
                    },
                },
            ],
            { cancelable: false }
        );
    };
    const clientSocket = async (room_id:number) => {
        if(!room_id || !userInfo) return

        const params:IWebSocketParams = {
            roomId:room_id,
            userId:userInfo.id
        }
        // 如果已存在连接，则直接返回
        if (socketRef.current) {
            console.log('Socket already initialized.');
            return;
        }
        console.log(params)
        socketRef.current = new WebSocketClient(params)

        try {
            await socketRef.current?.connect()
            // socketRef.current.onMessage('connect_error', (error) => {
            //     console.error('连接失败:', error);
            //     showReconnectAlert();
            // });
            //
            // socketRef.current.onMessage('disconnect', (reason) => {
            //     console.warn('连接断开:', reason);
            //     showReconnectAlert();
            // });
            console.log('连接socket')
            receiveMessage()
        } catch (error) {
            console.error('连接失败:', error);
        }

    }
    const receiveMessage = () => {
        if(!socketRef.current) return
        socketRef.current?.onMessage((option:optionMessageProp) => {
            console.log(option)
            setMessageList((prevList) => [...prevList, { ...option }]);
        })
    }
    const sendMessage = () => {
        if(!socketRef.current || !socketRef.current?.connected || !chat || !roomId) return
        const option = createMessage({
            message:chat,
            type:1,
            roomId,
            sendInfo:userInfo
        })
        socketRef.current?.sendMessage(option as optionMessageProp);
        setChat('');
    }
    return (
        <KeyboardProvider>
          <View style={styles.container}>
              <SafeAreaView style={{flex:1}}>
                  <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : 'height'} keyboardVerticalOffset={Platform.select({ ios: 100, android: 500 })}>
                      <History messageList={messageList} />
                      <View style={styles.inputContainer}>
                          <TextInput
                              style={styles.textInput}
                              placeholder="Type a message..."
                              value={chat}
                              keyboardType="default"
                              onChangeText={setChat}
                          />

                          <TouchableOpacity onPress={sendMessage} style={styles.sendButton}>
                              <Text style={styles.sendButtonText}>Send</Text>
                          </TouchableOpacity>
                      </View>
                  </KeyboardAvoidingView>
              </SafeAreaView>
          </View>
        </KeyboardProvider>
    )
}

export default Chat
