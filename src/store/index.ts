import { configureStore } from '@reduxjs/toolkit';
import { tokenReducer } from "@/store/reducers/user";
import { setToken, removeToken } from "@/store/actions/user";
import { createLogger } from 'redux-logger';

// 通过 configureStore 创建 store
export const store = configureStore({
    reducer: {
        user: tokenReducer, // 使用 tokenReducer 来管理 user 状态
    },
    // 默认中间件中已经包含了一些必要的中间件，我们可以加入 redux-logger
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(createLogger()), // 使用 redux-logger
});

// 导出类型以便在其他地方使用
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// 导出 action
export { setToken, removeToken };
