import { createAction } from "@reduxjs/toolkit";
import {ImessageListData} from "@/types/message";

export const setRoom = createAction<ImessageListData>('setRoom');
