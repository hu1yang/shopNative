import * as CryptoJS from 'crypto-js';

type optionMessageProp = {
    id?: number,
    message: any,
    type: number,
    roomId: number,
    sendUser: string,
    receiveUser: string,
    createBy?: number,
    status?: number,
    messageToken?: string,
}

export const createMessage = (option:optionMessageProp) => {
    const createBy = new Date().getTime()
    const messageToken = CryptoJS.MD5(String(createBy + option.type + option.roomId + option.sendUser + option.receiveUser)).toString();
    return {
        ...option,
        createBy,
        messageToken
    }
}
