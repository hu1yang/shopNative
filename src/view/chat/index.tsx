import React , {useState , useEffect , useRef} from "react";
import { View, Text , TextInput , StyleSheet , Button , Alert } from "react-native";
import {RootStackNavigation} from "@/router/NestingNavigators";
import io,{Socket} from "socket.io-client";
import {createMessage} from "@/util/message";

type messageListProps = {
    message:any,
    type:number
}

const styles = StyleSheet.create({
    inputStyle:{
        width:'100%',
        height:50,
        borderWidth:1,
        borderStyle:'solid',
        borderColor:'#ccc'
    }
})
const Chat = ({navigation}:{
  navigation:RootStackNavigation
}) => {
    const [chat, setChat] = useState<string>('');
    const [roomId, setRoomId] = useState<number|null>(null);
    const [messageList, setMessageList] = useState<messageListProps[]>([]);
    const socket = useRef<Socket|null>(null)

    useEffect(() => {
        setRoomId(1)
        !socket.current && clientSocket()
    },[])
    const sendMessage = () => {
        if(!socket.current || !socket.current?.connected || !chat || !roomId) return
        const option = createMessage({
            message:chat,
            type:1,
            roomId,
            sendUser:'胡杨',
            receiveUser:'胡1杨',
        })
        console.log(option)
        socket.current?.emit('message', option);
        setChat('');
    }

    const receiveMessage = () => {
        if(!socket.current) return
        socket.current?.on('message',option => {
            setMessageList((prevList) => [...prevList, { ...option }]);
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
                        navigation.reset({
                            index: 0, // 重置堆栈的索引
                            routes: [{ name: 'Tabbar', params: { screen: 'Home' } }],
                        });
                    }
                },
                {
                    text: '重试',
                    onPress: () => {
                        socket.current = null
                        clientSocket(); // 用户点击重试时重新连接
                    },
                },
            ],
            { cancelable: false }
        );
    };
    const clientSocket = () => {
        const socketConnection:Socket = io('ws://localhost:3003/ws',{
            query: {
                roomId
            },
            // timeout: 5000, // 设置连接超时
            // reconnectionAttempts: 3, // 限制重连次数
            reconnection: false
        })
        socket.current = socketConnection
        socket.current.on('connect_error', (error) => {
            console.error('连接失败:', error);
            showReconnectAlert();
        });

        socket.current.on('disconnect', (reason) => {
            console.warn('连接断开:', reason);
            showReconnectAlert();
        });
        receiveMessage()
    }
    return (
        <View>
            {
                messageList.map((item,index) => {
                    return (
                        <View key={index+'---'+item.message}>
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
                disabled={!socket.current?.connected}
                onPress={sendMessage}
            />
        </View>
    )
}

export default Chat
