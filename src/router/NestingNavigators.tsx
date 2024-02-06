import React, { useEffect } from "react";
import { View, Text , TouchableOpacity , SafeAreaView , Image } from "react-native";
import { createStackNavigator, StackScreenProps, StackNavigationProp } from "@react-navigation/stack";
import { NavigationContainer, NavigatorScreenParams, RouteProp } from "@react-navigation/native";
import {BottomTabBarButtonProps, BottomTabBarProps, createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

import Home from '@/view/home'
import Cart from '@/view/cart'
import Message from '@/view/message'
import My from '@/view/my'

export type MainTabParamList = {
    Home: undefined;
    Cart:undefined;
    Message:undefined;
    My:undefined;
};

export type RootStackParamList = {
    Home:NavigatorScreenParams<MainTabParamList>;
    Cart:NavigatorScreenParams<MainTabParamList>;
    Message:NavigatorScreenParams<MainTabParamList>;
    My:NavigatorScreenParams<MainTabParamList>;
    Tabbar: undefined;
    // Profile:undefined;
    // Settings:undefined;
    // NestingNavigators:undefined;
}
export type RootStackNavigation = StackNavigationProp<RootStackParamList>;
export interface MainTabProps {
    navigation: RootStackNavigation;
    route: RouteProp<RootStackParamList,'Tabbar'>;
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

                        if (route.name === 'Home') {
                            iconName = focused
                                ? 'ios-information-circle'
                                : 'ios-information-circle-outline';
                        } else if (route.name === 'Cart') {
                            iconName = focused ? 'ios-list' : 'ios-list-outline';
                        }else{
                            iconName = focused ? 'ios-list' : 'ios-list-outline';
                        }

                        // You can return any component that you like here!
                        return <Ionicons name={iconName} size={size} color={color} />;
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
                <Tab.Screen name="My" {...props} component={My} />
                <Tab.Screen name="Cart" {...props} component={Cart} />
                <Tab.Screen name="Home" {...props} component={Home} />
                <Tab.Screen name="Message" {...props} component={Message} />
            </Tab.Navigator>
        </View>
    )

}

const NestingNavigators = ():JSX.Element => {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="Tabbar" options={{ title: "", headerMode:false }} component={Tabbar} />
                {/*<Stack.Screen name="Cart" options={{ title: "购物车" }} component={Cart} />*/}
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default NestingNavigators;
