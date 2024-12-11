import React , {useState} from 'react'
import {View, Text, StyleSheet, SafeAreaView, ImageBackground, Image, TextInput , Pressable} from "react-native";
import {Link} from "@react-navigation/native";
import Icon from 'react-native-vector-icons/AntDesign';
import defaultStyled from "@/assets/defaultStyled";
import {color} from "@rneui/base";
import {Button} from "@rneui/themed";
import LinearGradient from "react-native-linear-gradient";
import {useSafeAreaInsets} from "react-native-safe-area-context";
import axios from '@/util/axios';
import EncryptedStorageUtil from '@/util/storage';
import {RootStackNavigation} from "@/router/NestingNavigators";
import Toast from 'react-native-toast-message';



const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#fff',
    },
    backImg:{
        width:'100%',
        height:256,
        position:'absolute',
        top:0,
        left:0
    },
    header:{
        width:'100%',
        height:44,
        paddingHorizontal:20,
        justifyContent:'center'
    },
    logo:{
        paddingTop:20,
        paddingBottom:15,
        alignItems: 'center',    // 水平居中
    },
    loginForm:{
        paddingHorizontal:15,
    },
    formItem:{
        backgroundColor:'#f8f8f8',
        paddingVertical:15,
        paddingHorizontal:20,
        borderRadius:50,
        height:50,
        marginBottom:15
    },
    inputStyle:{
        height:'100%',
        marginHorizontal:12.5,
        flex:1
    },
    otherLogin:{
        position: 'absolute',
        left: 0,
        right: 0,
        bottom:38,
    }
})

const Login = ({navigation}:{
    navigation:RootStackNavigation
}) => {
    const insets = useSafeAreaInsets();
    const [username, setUsername] = useState<string>('hujun');
    const [password, setPassword] = useState<string>('Hujun1314151');
    const [isSecure, setIsSecure] = useState<boolean>(true);
    const [isRead, setIsRead] = useState<boolean>(false);

    const loginSubmit = () => {
        if(!username || !password) return
        axios.post('/login',{username,password}).then(async res =>  {
            if(res.code === 200){
                await EncryptedStorageUtil.setItem('userInfo',res?.data);
                setTimeout(() => {
                    navigation.setParams({ refresh: true });
                    navigation.goBack();
                },200)
            }else if(res.code === 400){
                Toast.show({
                    type: 'error',  // 可以选择不同的类型，如 success, error, info
                    position: 'top',  // 默认从顶部显示
                    text1: 'network code:' + res.code,
                    text2: res.msg,
                    visibilityTime: 3000,  // Toast显示时长
                    topOffset: 150, // 控制顶部距离，修改此值调整 Toast 显示的高度
                    textStyle: {
                        fontSize: 16,
                        color: 'white', // 自定义文字颜色
                    },
                });
            }
        })
    }


    return (
        <View style={[styles.container,defaultStyled.flex,defaultStyled.flex_1]}>
            <ImageBackground source={{uri:'https://cdn.toodudu.com/uploads/2022/12/14/bj.png'}} resizeMode="cover" style={styles.backImg}></ImageBackground>
            <SafeAreaView>

                <View style={[defaultStyled.flex,styles.header]}>
                    <Icon name='left' size={20}></Icon>
                </View>
                <View style={[defaultStyled.flex,defaultStyled.ai_ct,defaultStyled.jc_ct,styles.logo]}>
                    <Image source={{uri:'https://cdn.toodudu.com/2024/02/19/V9S2CtkS9e27Cl3WCW61N0hPfWFYzZjKrH8u7EjZ.png'}} resizeMode='cover' style={{width:73,height:75}} />
                    <Text style={{color: '#666', fontSize: 12,lineHeight:30}}>买好货上涂多多</Text>
                </View>
                <View style={styles.loginForm}>
                    <View style={[defaultStyled.flex,defaultStyled.fd_row,defaultStyled.ai_ct,styles.formItem]}>
                        <Icon name='user' size={16} style={{color: '#333',fontWeight:'600'}}></Icon>
                        <TextInput
                            style={styles.inputStyle}
                            onChangeText={setUsername}
                            placeholder="请输入用户名"
                            value={username}
                            keyboardType="default"
                        />
                    </View>
                    <View style={[defaultStyled.flex,defaultStyled.fd_row,defaultStyled.ai_ct,styles.formItem]}>
                        <Icon name='lock1' size={16} style={{color: '#333',fontWeight:600}}></Icon>
                        <TextInput
                            style={styles.inputStyle}
                            onChangeText={setPassword}
                            placeholder="请输入密码"
                            value={password}
                            keyboardType="default"
                            secureTextEntry={isSecure}
                        />
                        <Icon name='eyeo' size={16} style={{color: '#333',fontWeight:600}} onPress={() => setIsSecure(!isSecure)}></Icon>
                    </View>
                    <Pressable onPress={() => setIsRead(!isRead)} style={[defaultStyled.flex,defaultStyled.fd_row,defaultStyled.ai_ct]}>
                        <Icon name='checkcircle' size={16} style={{color: isRead?'#0062EA':'#999' }}></Icon>
                        <Text style={{marginLeft:9.5, fontSize: 12, color:'#333'}}>我已认真阅读、理解并同意<Link to={{ screen: 'Tabbar', params: { screen: 'Message' } }} style={{color:'#668EEA'}}>《用户协议》</Link><Link to={{ screen: 'Tabbar', params: { screen: 'Message' } }} style={{color:'#668EEA'}}>《隐私协议》</Link></Text>
                    </Pressable>
                    <View style={{paddingHorizontal:22.5}}>
                        <Button
                            ViewComponent={LinearGradient} // Don't forget this!
                            buttonStyle={{width:'100%',height:45,borderRadius:22,textAlign:'center',alignSelf:'center',marginTop:42}}
                            linearGradientProps={{
                                colors: ["#FF0000", "#FF7979"],
                                start: { x: 0, y: 0.5 },
                                end: { x: 1, y: 0.5 },
                            }}
                            onPress={loginSubmit}
                        >
                            <Text style={{fontSize:16,fontWeight:600,color: '#FFFFFF'}}>登 录</Text>
                        </Button>

                    </View>
                </View>
                <View style={[defaultStyled.flex,defaultStyled.jc_bt,defaultStyled.fd_row,{paddingHorizontal:59,marginTop:15}]}>
                    <Link to={{ screen: 'Tabbar', params: { screen: 'Message' } }} style={{color:'#333333',fontSize:12}}>新用户注册</Link>
                    <Link to={{ screen: 'Tabbar', params: { screen: 'Message' } }} style={{color:'#333333',fontSize:12}}>短信验证码登录</Link>
                    <Link to={{ screen: 'Tabbar', params: { screen: 'Message' } }} style={{color:'#333333',fontSize:12}}>忘记密码</Link>
                </View>
            </SafeAreaView>
            <View style={[defaultStyled.flex,defaultStyled.fd_column,defaultStyled.ai_ct,defaultStyled.jc_ct,styles.otherLogin,{marginBottom:insets.bottom}]}>
                <Text style={{fontSize:12,color:'#999999'}}>其他登录方式</Text>
                <View style={[defaultStyled.flex,defaultStyled.fd_row,defaultStyled.jc_bt,{marginTop:20,width:117,}]}>
                    <Pressable>
                        <Image source={{uri:'https://cdn.toodudu.com/2024/12/9/微信_1733734947131.png'}} style={{width:30,height:30}}></Image>
                    </Pressable>
                    <Pressable>
                        <Image source={{uri:'https://cdn.toodudu.com/2024/12/9/苹果_1733734947131.png'}} style={{width:30,height:30}}></Image>
                    </Pressable>
                </View>
            </View>
        </View>
    )
}

export default Login
