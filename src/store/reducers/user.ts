import { createReducer } from "@reduxjs/toolkit";
import { setToken, removeToken } from "../actions/user";
import {IUserInfo} from "@/types/user";
import { createAction } from "@reduxjs/toolkit";


const initialState: IUserInfo|null = { token: '111' };

export const tokenReducer = createReducer(initialState, (builder) => {
    builder
    .addCase(setToken, (state, action) => {
        state.token = action.payload;
    })
    .addCase(removeToken, (state) => {
        state.token = null;
    });
});
