import React, {useEffect, useState} from 'react';
import {StyleSheet , View , Text , Image  , SafeAreaView , ImageBackground , ScrollView , TouchableOpacity } from "react-native";
import Icon from 'react-native-vector-icons/AntDesign'
import { Button , Badge , Divider } from '@rneui/base';
import Swiper from 'react-native-swiper';
import Recommend from "@/component/recommend";
import {RootStackNavigation} from "@/types/navigation";



let goodsArr = [
    {
        id:1,
        name:'钛海THR-218钛白粉 金红石型二氧化钛 高白度易分散通用型钛白粉',
        picture:'https://cdn.toodudu.com/2023/07/19/Fo6B3WrT90kmkEgygD6Hk01FIIIt65XVNs11iVwf.jpg',
        price:'20.01'
    },
    {
        id:2,
        name:'工厂整车（20-32吨）汽运直发全国包邮，工厂整车（54吨）铁路直发至站点，工厂整柜（27吨）海运直发沿海区域，其他仓库运费另计',
        picture:'https://cdn.toodudu.com/2021/05/10/4Op4H3X5PkMp6ZnADltF86NpRhVAAdRhzuuTOFfg.jpeg',
        price:'50.01'
    },
    {
        id:3,
        name:'工厂整车（20-32吨）汽运直发全国包邮，工厂整车（54吨）铁路直发至站点，工厂整柜（27吨）海运直发沿海区域，其他仓库运费另计',
        picture:'https://cdn.toodudu.com/2019/11/26/4bniUERisINvutrYbmCVND9CC8s2ywSCag07i2Mr.jpeg',
        price:'30.01'
    },
    {
        id:4,
        name:'南钛NR-950金红石型钛白粉 通用型二氧化钛 高遮盖高白度高耐候性钛白粉 南京生产',
        picture:'https://cdn.toodudu.com/2021/05/11/QRR0kUQs3y7oPqqKpIURHQHPqR9zPFb30hBwBM3Q.jpeg',
        price:'10.01'
    },
]
const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'rgba(248, 248, 248, 1)',
    },
    backImg:{
        width: '100%',
        height:375,
        position:'absolute',
        top:0,
        left:0
    },
    content:{
        // paddingHorizontal:10
    },
    moreFnc:{
        display:"flex",
        flexDirection:'row',
        justifyContent:'flex-end'
    },
    moreFncIcon:{
        marginLeft:20
    },
    userBox:{
        width:'100%',
        marginTop: 19
    },
    user:{
        display:'flex',
        flexDirection:'row',
    },
    headImg:{
        width: 50,
        height: 50,
        overflow: 'hidden',
        borderRadius:50,
    },
    userName:{
        display:'flex',
        justifyContent:'space-between',
        marginLeft: 10
    },
    company:{
        width:'100%',
        height:72,
        marginTop:20,
    },
    companyBox:{
        display:'flex',
        flexDirection:'row',
        justifyContent:'space-between',
        paddingTop:40,
        paddingBottom:15,
        paddingLeft:20,
        paddingRight:20
    },
    follow:{
        display:'flex',
        flexDirection:'row',
        justifyContent: 'space-evenly',
        marginBottom:12
    },
    followView:{
        display:'flex',
        flexDirection:'row'
    },
    myOrder:{
        paddingTop:12
    },
    headerTitle:{
        display:'flex',
        flexDirection:'row',
        justifyContent:'space-between'
    },
    myOrderHeaderFonts:{
        fontSize:13,fontWeight:'400',color:'#666'
    },

    myOrderList:{
        display:'flex',
        alignItems:'center'
    },
    myOrderListImage:{
        width:24,
        height:24,
        marginBottom:10
    },
    dataModel:{
        width:'100%',
        backgroundColor:'#fff',
        borderRadius:10,
        marginTop:15,
        padding:15
    },
    dataModelBox:{
        display:'flex',
        flexDirection:'row',
        justifyContent:'space-between',
        paddingTop:23
    },
})
const My = ({navigation}:{
    navigation:RootStackNavigation
}) => {
    const [orderFnc, setOrderFnc] = useState<{name:string;picture:string;id:number}[]>([{picture:'https://cdn.toodudu.com/2023/11/22/WrKYdVQTgo6aIeaI26QGXYvLOJZHiHR3TOr0oYSd.png',name:'待付款',id:1},{picture:'https://cdn.toodudu.com/2023/11/22/EbvVNZa7mYE8AZSSzNgqOtXEqIKbPRDYzJi2TXFG.png',name:'待发货',id:2},{picture:'https://cdn.toodudu.com/uploads/2023/10/25/组 504@3x.png',name:'待收货',id:3},{picture:'https://cdn.toodudu.com/uploads/2023/10/25/组 505@3x.png',name:'待评价',id:4},{picture:'https://cdn.toodudu.com/uploads/2023/10/25/组 506@3x.png',name:'退款/售后',id:5}]);
    const [dataModel, setDataModel] = useState<{name:string;picture:string;id:number}[]>([
        {picture:'https://cdn.toodudu.com/uploads/2023/09/06/seckill.png',name:'集采订单',id:1},
        {picture:'https://cdn.toodudu.com/uploads/2023/10/25/delivery.png',name:'发货管理',id:2},
        {picture:'https://cdn.toodudu.com/uploads/2023/10/26/现货交割单@2x.png',name:'现货交割订单',id:3},
        {picture:'https://cdn.toodudu.com/uploads/2023/10/26/我的竞拍@2x.png',name:'我的竞拍',id:4},
        {picture:'https://cdn.toodudu.com/uploads/2023/10/26/服务商入驻@2x.png',name:'服务商入驻',id:5},
        {picture:'https://cdn.toodudu.com/uploads/2023/10/26/归集订单@2x.png',name:'归集订单',id:6},
        {picture:'https://cdn.toodudu.com/uploads/2023/10/26/我的求购@2x.png',name:'我的求购',id:7},
    ]);
    const [dataModelIndex, setDataModelIndex] = useState<number>(0);
    const [goods, setGoods] = useState(goodsArr);
    const [recommendLoad, setRecommendLoad] = useState<boolean>(true);

    const getRecommendLoad = () => {
        setTimeout(() => {
            let newGoods = [...goods,...goodsArr]
            setGoods(newGoods)
            setRecommendLoad(true)
        })
    }
    const onScroll = (event:any) => {
        const { layoutMeasurement, contentOffset, contentSize } = event.nativeEvent;
        const isCloseToBottom = layoutMeasurement.height + contentOffset.y >= contentSize.height - 20;
        if (isCloseToBottom && recommendLoad) {
            setRecommendLoad(false)
            getRecommendLoad();
        }
    }
    return (
        <View style={styles.container}>
            <ImageBackground source={{uri:'https://cdn.toodudu.com/uploads/2023/10/26/mine_back.png'}} resizeMode="cover" style={styles.backImg}></ImageBackground>
            <SafeAreaView style={{flex: 1}}>
                <View style={styles.content}>
                    <ScrollView onScroll={onScroll} scrollEventThrottle={16} showsVerticalScrollIndicator={false} alwaysBounceVertical={true} contentContainerStyle={{padding:10}}>
                        <View style={styles.moreFnc}>
                            <Icon name='customerservice' size={17} style={styles.moreFncIcon} />
                            <Icon name='setting' size={17} style={styles.moreFncIcon} />
                            <TouchableOpacity
                                onPress={() => navigation.navigate('Tabbar', { screen: 'Message' })}>
                                <View style={{position:'relative'}}>
                                    <Icon name='message1' size={17} style={styles.moreFncIcon} />
                                    <Badge
                                        status="primary"
                                        value={10}
                                        containerStyle={{ position: 'absolute', top: -10, left: 25 }}
                                    />
                                </View>
                            </TouchableOpacity>

                        </View>
                        <View style={styles.userBox}>
                            <View style={styles.user}>
                                <View style={styles.headImg}>
                                    <Image resizeMode='cover' style={{width:'100%',height:'100%'}} source={{uri:'https://cdn.toodudu.com/2022/04/25/TZKsTBppzFDZAhrLUGGDmhwTWgJKEJH1yHWQD1pf.jpg'}} />
                                </View>
                                <View style={styles.userName}>
                                    <View>
                                        <Text style={{fontSize:18,fontWeight:'500',color:'#333333'}}>胡杨</Text>
                                    </View>
                                    <View>
                                        <Text style={{fontSize:11,fontWeight:'400',color:'#666666'}}>用户名：乌鲁木齐恒城鑫达商贸有限公司</Text>
                                    </View>
                                </View>
                            </View>
                        </View>
                        <View style={styles.company}>
                            <ImageBackground source={{uri:'https://cdn.toodudu.com/uploads/2023/10/26/company_back.png'}} resizeMode='contain' style={{flex:1}}>
                                <View style={styles.companyBox}>
                                    <View>
                                        <Text style={{fontSize:14,fontWeight:'400',color: '#5D3909'}}>上海天衡化工有限公司</Text>
                                    </View>
                                    <View>
                                        <Icon name='rightcircle' style={{color:'#fff'}} size={15} />
                                    </View>
                                </View>
                            </ImageBackground>
                        </View>
                        <View style={styles.dataModel}>
                            <View style={styles.follow}>
                                <View style={styles.followView}>
                                    <Image source={{uri:'https://cdn.toodudu.com/uploads/2023/10/26/good-attention.png'}} style={{width:16,height:16}} />
                                    <Text style={{fontSize:12,color:'#333',fontWeight:'400',marginLeft:20}}>商品关注</Text>
                                </View>
                                <Divider orientation="vertical" />
                                <View style={styles.followView}>
                                    <Image source={{uri:'https://cdn.toodudu.com/uploads/2023/10/26/shop_attention.png'}} style={{width:16,height:16}} />
                                    <Text style={{fontSize:12,color:'#333',fontWeight:'400',marginLeft:20}}>店铺关注</Text>
                                </View>
                            </View>
                            <Divider />
                            <View style={styles.myOrder}>
                                <View style={styles.headerTitle}>
                                    <View><Text style={{fontSize:14,fontWeight:'500',color:'#333'}}>我的订单</Text></View>
                                    <View style={{display:'flex',flexDirection:'row',alignItems:'center'}}><Text style={styles.myOrderHeaderFonts}>全部</Text><Icon name='right' size={13} style={styles.myOrderHeaderFonts}></Icon></View>
                                </View>
                                <View style={styles.dataModelBox}>
                                    {
                                        orderFnc.map((item) => (
                                            <View style={styles.myOrderList} key={item.id}>
                                                <View style={styles.myOrderListImage}>
                                                    <Image source={{uri:item.picture}} style={{flex:1}} resizeMode='contain'></Image>
                                                </View>
                                                <View>
                                                    <Text style={{fontSize:13,fontWeight:'400',color:'#3D3D3D'}}>{item.name}</Text>
                                                </View>
                                            </View>
                                        ))
                                    }
                                </View>
                            </View>
                        </View>
                        <View style={styles.dataModel}>
                            <View style={styles.headerTitle}>
                                <View><Text style={{fontSize:14,fontWeight:'500',color:'#333'}}>我的资产</Text></View>
                                <View style={{display:'flex',flexDirection:'row',alignItems:'center'}}><Text style={styles.myOrderHeaderFonts}>全部</Text><Icon name='right' size={13} style={styles.myOrderHeaderFonts}></Icon></View>
                            </View>
                            <View style={styles.dataModelBox}>
                                <View style={{display:'flex',flexDirection:'column',alignItems:'center'}}>
                                    <View style={{display:'flex',flexDirection:'row',alignItems:'flex-end'}}>
                                        <Text style={{fontSize:20,fontWeight:'700',color:'rgba(61, 61, 61, 1)'}}>2000</Text>
                                        <Text style={{fontSize:13,fontWeight:'400',color:'rgba(61, 61, 61, 1)'}}>张</Text>
                                    </View>
                                    <View style={{marginTop:20}}><Text style={{fontSize:13,fontWeight:'400',color:'#3D3D3D'}}>优惠券</Text></View>
                                </View>
                                <View style={{display:'flex',flexDirection:'column',alignItems:'center'}}>
                                    <View style={{display:'flex',flexDirection:'row',alignItems:'flex-end'}}>
                                        <Text style={{fontSize:20,fontWeight:'700',color:'rgba(61, 61, 61, 1)'}}>1万</Text>
                                        <Text style={{fontSize:13,fontWeight:'400',color:'rgba(61, 61, 61, 1)'}}>张</Text>
                                    </View>
                                    <View style={{marginTop:20}}><Text style={{fontSize:13,fontWeight:'400',color:'#3D3D3D'}}>红包</Text></View>
                                </View>
                                <View style={{display:'flex',flexDirection:'column',alignItems:'center'}}>
                                    <View style={{display:'flex',flexDirection:'row',alignItems:'flex-end'}}>
                                        <Text style={{fontSize:13,fontWeight:'700',color:'rgba(61, 61, 61, 1)'}}>￥</Text>
                                        <Text style={{fontSize:20,fontWeight:'700',color:'rgba(61, 61, 61, 1)'}}>2000.<Text style={{fontSize:14}}>2</Text></Text>
                                    </View>
                                    <View style={{marginTop:20}}><Text style={{fontSize:13,fontWeight:'400',color:'#3D3D3D'}}>多多币可抵</Text></View>
                                </View>
                                <View style={{display:'flex',flexDirection:'column',alignItems:'center'}}>
                                    <View style={{display:'flex',flexDirection:'row',alignItems:'flex-end'}}>
                                        <Text style={{fontSize:20,fontWeight:'700',color:'rgba(61, 61, 61, 1)'}}>2000</Text>
                                    </View>
                                    <View style={{marginTop:20}}><Text style={{fontSize:13,fontWeight:'400',color:'#3D3D3D'}}>积分</Text></View>
                                </View>
                            </View>
                        </View>
                        <View style={styles.dataModel}>
                            <View style={styles.headerTitle}>
                                <View><Text style={{fontSize:14,fontWeight:'500',color:'#333'}}>数据中心</Text></View>
                            </View>
                            <View style={[styles.dataModelBox,{paddingHorizontal:12}]}>
                                <Swiper paginationStyle={{bottom:0}} dot={
                                    <View style={{height:4,width:15,backgroundColor:'#F4F4F4',borderRadius:2.5}}></View>
                                } activeDot={
                                    <View style={{height:4,width:15,backgroundColor:'rgba(247, 17, 17, 1)',borderRadius:2.5}}></View>
                                } height={156} horizontal={true} loop={false} index={dataModelIndex}>
                                    <View style={{display:'flex',flexWrap:'wrap',flexDirection:'row'}}>
                                        {
                                            dataModel.map((item) => (
                                                <View key={item.id} style={{width:'20%',display:'flex',alignItems:'center',marginBottom:20}}>
                                                    <View style={{width:35,height:35}}>
                                                        <Image resizeMode='cover' style={{flex:1}} source={{uri:item.picture}}></Image>
                                                    </View>
                                                    <View style={{marginTop:10}}><Text style={{fontSize:11,color:'#3D3D3D',fontWeight:'400'}}>{item.name}</Text></View>
                                                </View>
                                            ))
                                        }
                                    </View>
                                    <View style={{display:'flex',flexWrap:'wrap',flexDirection:'row'}}>
                                        {
                                            dataModel.map((item) => (
                                                <View key={item.id} style={{width:'20%',display:'flex',alignItems:'center',marginBottom:20}}>
                                                    <View style={{width:35,height:35}}>
                                                        <Image resizeMode='cover' style={{flex:1}} source={{uri:item.picture}}></Image>
                                                    </View>
                                                    <View style={{marginTop:10}}><Text style={{fontSize:11,color:'#3D3D3D',fontWeight:'400'}}>{item.name}</Text></View>
                                                </View>
                                            ))
                                        }
                                    </View>
                                </Swiper>
                            </View>
                        </View>
                        <Recommend goods={goods} load={recommendLoad} />
                    </ScrollView>
                </View>
            </SafeAreaView>
        </View>
    )
}

export default My
