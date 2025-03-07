import React from 'react';
import {View, Text, Button, KeyboardAvoidingView, Platform} from "react-native";
import {RootStackNavigation} from "@/types/navigation";
import {Input} from "@rneui/themed";
import { KeyboardProvider } from "react-native-keyboard-controller";


const Home = ({navigation}:{
    navigation:RootStackNavigation
}) => {
    return (
        <KeyboardProvider>
            <View>
                <Text>Home111</Text>
                <Text>Home111</Text>
                <Text>Home111</Text>
                <Text>Home111</Text>
                <Text>Home111</Text>
                <Text>Home111</Text>
                <Text>Home111</Text>
                <Text>Home111</Text>
                <Text>Home111</Text>
                <Text>Home111</Text>
                <Text>Home111</Text>
                <Text>Home111</Text><Text>Home111</Text>
                <Text>Home111</Text>
                <Text>Home111</Text>
                <Text>Home111</Text>
                <Text>Home111</Text>
                <Text>Home111</Text>
                <Text>Home111</Text>
                <Text>Home111</Text>
                <Text>Home111</Text>
                <Text>Home111</Text>
                <Text>Home111</Text>
                <Text>Home111</Text>
                <Text>Home111</Text>
                <Text>Home111</Text>
                <Text>Home111</Text>
                <Text>Home111</Text>
                <Text>Home111</Text>
                <Text>Home111</Text>
                <Text>Home111</Text>
                <Text>Home111</Text>
                <Text>Home111</Text>
                <Text>Home111</Text>
                <Text>Home111</Text>
                <Text>Home111</Text>
                <Text>Home111</Text>
                <Text>Home111</Text>
                <Text>Home111</Text>
                <Text>Home111</Text>
                <Button
                    title="Go to Details"
                    onPress={() => navigation.navigate('Good',{
                        id:1
                    })}
                />
                <KeyboardAvoidingView  style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : 'height'} keyboardVerticalOffset={Platform.select({ ios: 100, android: 500 })}>
                    <Input />
                </KeyboardAvoidingView>
            </View>
        </KeyboardProvider>

    )
}
export default Home
