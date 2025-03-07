/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useEffect , useState} from "react";
import { Provider , useDispatch } from 'react-redux';
import NestingNavigators from "@/router/NestingNavigators";
import {store , AppDispatch} from "@/store";
import {getData} from "@/util/storage";
import {IUserInfo} from "@/types/user";
import {setUser} from "@/store/actions/user";
import { ActivityIndicator, View, Text } from 'react-native';  // 引入 ActivityIndicator
import { KeyboardProvider } from "react-native-keyboard-controller";



const App = (): React.JSX.Element => {
    const dispatch: AppDispatch = store.dispatch;
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const loadCachedData = async () => {
            try {
                const cachedData = await getData<IUserInfo>('userInfo');
                if (cachedData) {
                    dispatch(setUser(cachedData));
                }
            } catch (e) {
                console.error('Failed to load cached data:', e);
            } finally {
                setLoading(false)
            }
        };

        loadCachedData();

    },[dispatch])

    // 在加载状态为 true 时显示加载指示器
    if (loading) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" />
                <Text>Loading...</Text>
            </View>
        );
    }
    return (
        <KeyboardProvider>
            <Provider store={store}>
                <NestingNavigators />
            </Provider>
        </KeyboardProvider>

    );
}


export default App;
