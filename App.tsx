/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from "react";
import {
    SafeAreaView,
    ScrollView,
    StatusBar,
    useColorScheme,
    Text,
} from "react-native";

import {
    Colors
} from "react-native/Libraries/NewAppScreen";
import NestingNavigators from "@/router/NestingNavigators";




function App(): React.JSX.Element {
    const isDarkMode = useColorScheme() === "dark";

    const backgroundStyle = {
        backgroundColor: isDarkMode ? Colors.darker : Colors.lighter
    };

    return (
        <NestingNavigators />
    );
}


export default App;
