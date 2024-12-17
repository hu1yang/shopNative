export type optionMessageProp = {
    id?: number,
    message: any,
    type: number,
    roomId: number,
    sendUser: string,
    createBy?: number,
    status?: number,
    messageToken?: string,
}

export type ImessageListData = {
    room_id:number,
    room_name:string,
    status:number,
    created_id:number,
    participants:string,
    created_by:string,
    room_picture?:string,
}
