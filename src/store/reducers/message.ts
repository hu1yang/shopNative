import { createReducer } from "@reduxjs/toolkit";
import { setRoom } from "../actions/message";
import {ImessageListData} from "@/types/message";


const initialState: {
    roomList: ImessageListData[],
} = {
    roomList:[]
};

export const messageReducer = createReducer(initialState, (builder) => {
    builder
    .addCase(setRoom, (state, action) => {
        return state = {
            ...state,
            roomList: action.payload,
        }
    })
});
