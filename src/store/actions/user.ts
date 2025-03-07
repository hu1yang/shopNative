import { createAction } from "@reduxjs/toolkit";
import {IUserInfo} from "@/types/user";

export const setUser = createAction<IUserInfo>('setUser');
export const removeUser = createAction('removeUser');
