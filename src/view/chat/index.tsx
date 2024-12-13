import React , {useState , useEffect , useRef} from "react";
import { View, Text , TextInput , StyleSheet , Button , Alert } from "react-native";
import { MainTabProps } from "@/router/NestingNavigators";
import {createMessage} from "@/util/message";
import axios from "@/util/axios";
import Toast from "react-native-toast-message";
import WebSocketClient , { IWebSocketParams } from "@/util/socket";
import {optionMessageProp} from "@/types/message";
import EncryptedStorageUtil from "@/util/storage";
import {IUserInfo} from "@/types/user";
import defaultStyled from "@/assets/defaultStyled";

const styles = StyleSheet.create({
    inputStyle:{
        width:'100%',
        height:50,
        borderWidth:1,
        borderStyle:'solid',
        borderColor:'#ccc'
    }
})
const Chat = (props:MainTabProps<'Chat'>) => {
    const [chat, setChat] = useState<string>('');
    const [roomId, setRoomId] = useState<number|null>(null);
    const [messageList, setMessageList] = useState<optionMessageProp[]>([]);
    const socketRef = useRef<WebSocketClient|null>(null)
    const userInfo = useRef<IUserInfo|null>(null);

    useEffect( () => {
        const fetchUserInfo = async () => {
            userInfo.current = await EncryptedStorageUtil.getItem<IUserInfo>('userInfo');
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
        // const userInfo = await EncryptedStorageUtil.getItem<IUserInfo>('userInfo');
        if(!room_id || !userInfo.current) return

        const params:IWebSocketParams = {
            roomId:room_id,
            userId:userInfo.current.id
        }
        // 如果已存在连接，则直接返回
        if (socketRef.current) {
            console.log('Socket already initialized.');
            return;
        }
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
            sendUser:String(userInfo.current?.username),
        })
        socketRef.current?.sendMessage(option as optionMessageProp);
        setChat('');
    }
    return (
        <View>
            {
                messageList.map((item,index) => {
                    return (
                        <View key={index+'---'+item.message} style={defaultStyled.flex,defaultStyled.ai_ct,defaultStyled.fd_row}>
                            <Text>{item.sendUser}：</Text>
                            <Text>{item.message}</Text>
                        </View>
                    )
                })
            }
            <TextInput
                style={styles.inputStyle}
                onChangeText={setChat}
                value={chat}
                placeholder="useless placeholder"
                keyboardType="default"
            />
            <Button
                title='发送'
                disabled={!socketRef.current?.connected}
                onPress={sendMessage}
            />
        </View>
    )
}

export default Chat
