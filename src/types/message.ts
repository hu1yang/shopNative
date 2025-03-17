import {IUserInfo} from "@/types/user";

export type optionMessageProp = {
    id?: number,
    message: any,
    type: number,
    roomId: number,
    sendInfo :IUserInfo,
    sendUser?: string,
    sendUserId: number,
    createBy?: number,
    status?: number,
    messageToken?: string,
    timestamp: number,
}


export type ImessageListData = {
    room_id:number,
    room_name:string,
    status:number,
    created_id:number,
    participants:string,
    created_by:string,
    room_picture?:string,
    messages?:optionMessageProp[]
}
