/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from "react";
import { Provider } from 'react-redux';
import {
    SafeAreaView,
    ScrollView,
    StatusBar,
    useColorScheme,
    Text,
    View
} from "react-native";

import {
    Colors
} from "react-native/Libraries/NewAppScreen";
import NestingNavigators from "@/router/NestingNavigators";
import { store } from "@/store";


function App(): React.JSX.Element {
    const isDarkMode = useColorScheme() === "dark";

    const backgroundStyle = {
        backgroundColor: isDarkMode ? Colors.darker : Colors.lighter
    };

    return (
        <Provider store={store}>
            <NestingNavigators />
        </Provider>
    );
}


export default App;
