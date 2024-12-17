import { createAction } from "@reduxjs/toolkit";

export const setToken = createAction<string>('setToken');
export const removeToken = createAction('removeToken');
