import { createReducer } from "@reduxjs/toolkit";
import { setUser, removeUser } from "../actions/user";
import {IUserInfo} from "@/types/user";


const initialState: {
    userInfo:IUserInfo|null,
    isLogin:Boolean
} = {
    userInfo: null,
    isLogin:false
};

export const userReducer = createReducer(initialState, (builder) => {
    builder
    .addCase(setUser, (state, action) => {
        return state = {
            ...state,
            userInfo: action.payload,
            isLogin: true,
        }
    })
    .addCase(removeUser, (state) => {
        return state = {
            ...state,
            userInfo: null,
            isLogin: false,
        }
    });
});
