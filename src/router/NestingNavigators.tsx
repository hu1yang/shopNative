import React, { useEffect } from "react";
import { View, Text , TouchableOpacity , SafeAreaView , Image } from "react-native";
import { createStackNavigator, StackScreenProps, StackNavigationProp } from "@react-navigation/stack";
import { NavigationContainer, NavigatorScreenParams, RouteProp } from "@react-navigation/native";
import {BottomTabBarButtonProps, BottomTabBarProps, createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/AntDesign'
import IconE from 'react-native-vector-icons/Entypo'


import Home from '@/view/home'
import Cart from '@/view/cart'
import Message from '@/view/message'
import My from '@/view/my'
import Good from "@/view/good";

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
                <Tab.Screen name="Cart" {...props} component={Cart} />
                <Tab.Screen name="Home" {...props} component={Home} />
                <Tab.Screen name="Message" {...props} component={Message} />
                <Tab.Screen name="My" {...props} component={My} />
            </Tab.Navigator>
        </View>
    )

}

const NestingNavigators = ():JSX.Element => {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="Tabbar" options={{ title: "" , headerShown:false}} component={Tabbar} />
                <Stack.Screen name="Good" options={{ title: "good", headerShown:true, headerMode:'float', headerTitleAlign:'left' }} component={Good} />
                {/*<Stack.Screen name="Cart" options={{ title: "购物车" }} component={Cart} />*/}
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default NestingNavigators;
