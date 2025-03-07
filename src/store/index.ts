import { configureStore } from '@reduxjs/toolkit';
import reactotron from "../../ReactotronConfig";

import { userReducer } from "@/store/reducers/user";
import { messageReducer } from "@/store/reducers/message";


// 通过 configureStore 创建 store
export const store = configureStore({
    reducer: {
        user:userReducer,
        message:messageReducer
    },
    enhancers: (getDefaultEnhancers) =>
        getDefaultEnhancers().concat(__DEV__ ? reactotron.createEnhancer():[]),
});

// 导出类型以便在其他地方使用
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// 导出 action
