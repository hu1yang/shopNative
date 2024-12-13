import {StackNavigationProp} from "@react-navigation/stack";

export type MainTabParamList = {
    Home: undefined;
    Cart:undefined;
    Message: undefined;
    My:undefined;

};
export type RootStackParamList = {
    Good: { id: number }; // 商品详情页面参数
    Chat: { roomId: number }; // 聊天页面参数
    Cart: undefined; // 购物车页面无参数
    Login: undefined; // 登录页面无参数
    Tabbar: { screen: string }; // Tabbar 初始页面
};
export type RootStackNavigation = StackNavigationProp<RootStackParamList>;
