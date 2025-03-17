import * as CryptoJS from 'crypto-js';
import {optionMessageProp} from "@/types/message";


export const createMessage = (option:optionMessageProp) => {
    const createBy = new Date().getTime()
    const messageToken = CryptoJS.MD5(String(createBy + option.type + option.roomId + option.sendUser)).toString();
    return {
        ...option,
        createBy,
        messageToken
    }
}
