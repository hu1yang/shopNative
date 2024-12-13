import React, { useEffect } from "react";
import { View, Text , TouchableOpacity , SafeAreaView , Image } from "react-native";
import { createStackNavigator, StackScreenProps, StackNavigationProp } from "@react-navigation/stack";
import { NavigationContainer, NavigatorScreenParams, RouteProp } from "@react-navigation/native";
import { BottomTabBarProps, createBottomTabNavigator , BottomTabNavigationProp , BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import Toast from 'react-native-toast-message';
import Icon from 'react-native-vector-icons/AntDesign'
import IconE from 'react-native-vector-icons/Entypo'
import {MainTabParamList , RootStackParamList , RootStackNavigation} from '@/types/navigation'


import Home from '@/view/home'
import Cart from '@/view/cart'
import Message from '@/view/message'
import My from '@/view/my'
import Good from "@/view/good";
import Chat from '@/view/chat'
import Login from "@/view/login/login";

export interface MainTabProps<T extends keyof RootStackParamList = keyof RootStackParamList> {
    navigation: BottomTabNavigationProp<RootStackParamList, T>;
    route: RouteProp<RootStackParamList, T>;
}


const Stack = createStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<MainTabParamList>();


const Tabbar: React.FC<StackScreenProps<RootStackParamList, 'Tabbar'>> = ({ navigation, route }):JSX.Element => (
    <Tab.Navigator screenOptions={({ route }: { route: RouteProp<MainTabParamList, keyof MainTabParamList> }) => ({
        tabBarIcon: ({ focused, color, size }: { focused: boolean; color: string; size: number }) => {
            let iconName: string | undefined;
            let activeIconName: string | undefined;

            switch (route.name) {
                case "Home":
                    iconName = "home";
                    activeIconName = "home";
                    break;
                case "Cart":
                    iconName = "shoppingcart";
                    activeIconName = "shopping-cart";
                    break;
                case "Message":
                    iconName = "message1";
                    activeIconName = "message";
                    break;
                case "My":
                    iconName = "user";
                    activeIconName = "users";
                    break;
            }

            return focused ? (
                <IconE name={activeIconName} size={size} color={color} />
            ) : (
                <Icon name={iconName} size={size} color={color} />
            );
        },
        tabBarLabel: route.name,
        headerShown: false,
        tabBarActiveTintColor: "tomato",
        tabBarInactiveTintColor: "gray",
        tabBarStyle: {
            height: 98,
            backgroundColor: "#fff",
        },
    })}>
        <Tab.Screen name="Message" component={Message} />
        <Tab.Screen name="Home" component={Home} />
        <Tab.Screen name="Cart" component={Cart} />
        <Tab.Screen name="My" component={My} />
    </Tab.Navigator>
)

const NestingNavigators = ():JSX.Element => (
    <>
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="Tabbar" options={{ title: "" , headerShown:false}} component={Tabbar} />
                <Stack.Screen name="Login" options={{ title: 'login' , headerShown:false , headerMode:'float', headerTitleAlign:'left' }} component={Login} />
                <Stack.Screen name="Cart" options={{ title: "购物车" }} component={Cart} />
                <Stack.Screen name="Chat" options={{ title: 'chat' , }} component={Chat} />
                <Stack.Screen name="Good" options={{ title: "good", headerShown:false, headerMode:'float', headerTitleAlign:'left' }} component={Good} />
            </Stack.Navigator>
            <Toast />
        </NavigationContainer>
    </>
);

export default NestingNavigators;
