import io,{Socket} from "socket.io-client";
import {optionMessageProp} from "@/types/message";
import {IUserInfo} from "@/types/user";
import {getData} from "@/util/storage";

export interface IWebSocketParams {
    userId:number;
    roomId:number;
}
class SocketClient {
    private url:string = 'ws://localhost:3003/userchat'
    private socket:Socket|null = null
    private params:IWebSocketParams
    constructor(params:IWebSocketParams) {
        this.params = params
    }

    async connect(): Promise<void> {
        if(this.socket) return
        const { roomId, userId } = this.params;

        const token = await getData<string>('token');
        if(token) {
            this.socket = io(this.url,{
                extraHeaders: {
                    Authorization: token
                },
                query:{
                    roomId,
                    userId,
                },
                reconnection: false
            })

            return new Promise((resolve, reject) => {
                this.socket?.on('connect', () => {
                    console.log('Socket connected');
                    resolve();
                });

                this.socket?.on('connect_error', (err) => {
                    console.error('Socket connection error:', err);
                    reject(err);
                });
            });
        }

    }
    async sendMessage(option:optionMessageProp){
        if(!this.socket) return
        this.socket.emit('message', option)
    }
    onMessage(callback: (data: optionMessageProp) => void){
        if(!this.socket) return
        this.socket.on('message', (data) => {
            callback(data);
        });
    }

    async connected(){
        if(!this.socket) return
        return this.socket.connected
    }
    async disconnect(){
        if(!this.socket) return
        this.socket.disconnect()
    }
}

export default SocketClient
