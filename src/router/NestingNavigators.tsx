import React, { useEffect , forwardRef } from "react";
import { View, Text , TouchableOpacity , SafeAreaView , Image } from "react-native";
import { createStackNavigator, StackScreenProps, StackNavigationProp } from "@react-navigation/stack";
import { NavigationContainer, NavigatorScreenParams, RouteProp  } from "@react-navigation/native";
import {BottomTabBarButtonProps, BottomTabBarProps, createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Toast from 'react-native-toast-message';
import Icon from 'react-native-vector-icons/AntDesign'
import IconE from 'react-native-vector-icons/Entypo'


import Home from '@/view/home'
import Cart from '@/view/cart'
import Message from '@/view/message'
import My from '@/view/my'
import Good from "@/view/good";
import Chat from '@/view/chat'
import Login from "@/view/login/login";

export type MainTabParamList = {
    Home: undefined;
    Cart:undefined;
    Message: undefined;
    My:undefined;

};

export type RootStackParamList = {
    Good:{
        id:number
    };
    Chat: {
    };
    Cart:null;
    Login:null;
    Tabbar: {
        screen:string
    };
}
export type RootStackNavigation = StackNavigationProp<RootStackParamList>;
export interface MainTabProps {
    navigation: RootStackNavigation;
    route: RouteProp<RootStackParamList,keyof RootStackParamList>;
}


const Stack = createStackNavigator<RootStackParamList>();


const Tab = createBottomTabNavigator<MainTabParamList>();
const Tabbar = (props:MainTabProps):JSX.Element => {

    return (
        <View style={{ flex: 1 }}>
            <Tab.Navigator
                screenOptions={({ route }) => ({
                    tabBarIcon: ({ focused, color, size }) => {
                        let iconName;
                        let activeiconName;
                        switch (route.name){
                            case "Home":
                                iconName = 'home'
                                activeiconName = 'home'
                                break;
                            case "Cart":
                                iconName = 'shoppingcart'
                                activeiconName = 'shopping-cart'
                                break;
                            case "Message":
                                iconName = 'message1'
                                activeiconName = 'message'
                                break;
                            case "My":
                                iconName = 'user'
                                activeiconName = 'users'
                                break;
                        }
                        return focused?<IconE name={activeiconName} size={size} color={color} />:<Icon name={iconName} size={size} color={color} />;
                    },
                    title:route.name==='Home'?'这是首页':'这是购物车',
                    tabBarLabel:route.name,
                    headerShown: false,
                    tabBarActiveTintColor: 'tomato',
                    tabBarInactiveTintColor: 'gray',
                    tabBarStyle:{
                        height: 98,
                        backgroundColor: '#fff'
                    }
                })}
            >
                <Tab.Screen name="Message" {...props} component={Message} />
                <Tab.Screen name="Home" {...props} component={Home} />
                <Tab.Screen name="Cart" {...props} component={Cart} />
                <Tab.Screen name="My" {...props} component={My} />
            </Tab.Navigator>
        </View>
    )

}

const Toasts = forwardRef((props, ref) => {
    // 在此处处理 Toast 的渲染逻辑
    return <Toast />;
});
const NestingNavigators = ():JSX.Element => {
    return (
        <>
            <NavigationContainer>
                <Stack.Navigator>
                    <Stack.Screen name="Tabbar" options={{ title: "" , headerShown:false}} component={Tabbar} />
                    <Stack.Screen name="Login" options={{ title: 'login' , headerShown:false , headerMode:'float', headerTitleAlign:'left' }} component={Login} />
                    <Stack.Screen name="Cart" options={{ title: "购物车" }} component={Cart} />
                    <Stack.Screen name="Chat" options={{ title: 'chat' , }} component={Chat} />
                    <Stack.Screen name="Good" options={{ title: "good", headerShown:false, headerMode:'float', headerTitleAlign:'left' }} component={Good} />
                </Stack.Navigator>
                <Toasts ref={(ref) => Toast.setRef(ref)}  />
            </NavigationContainer>
        </>
    );
};

export default NestingNavigators;
