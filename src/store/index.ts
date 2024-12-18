import { configureStore } from '@reduxjs/toolkit';
import { tokenReducer } from "@/store/reducers/user";
import { setToken, removeToken } from "@/store/actions/user";

// 通过 configureStore 创建 store
export const store = configureStore({
    reducer: {
        user: tokenReducer, // 使用 tokenReducer 来管理 user 状态
    }
});

// 导出类型以便在其他地方使用
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// 导出 action
export { setToken, removeToken };
