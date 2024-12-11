import React , { useMemo , useState } from "react";
import {
    View,
    SafeAreaView,
    Text,
    StyleSheet,
    Image,
    ScrollView,
    NativeSyntheticEvent,
    NativeScrollEvent,
    TouchableOpacity
} from 'react-native'
import {RootStackNavigation} from "@/router/NestingNavigators";
import Swiper from 'react-native-swiper'
import { useWindowDimensions } from 'react-native';
import Icon from "react-native-vector-icons/SimpleLineIcons";
import defaultStyled from "@/assets/defaultStyled";
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Price from "@/component/price";
import LinearGradient from "react-native-linear-gradient";
import GoodTips from "@/component/goodTips";
import { Button , AirbnbRating , Tab } from "@rneui/themed";
import HTML from 'react-native-render-html';
import Recommend from "@/component/recommend";



const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#f2f2f2',
        overflow:'scroll'
    },
    goodPicture:{
        height:375,
        width:'100%'
    },
    swiperWrapper:{
    },
    navBar:{
        position:'relative',
        top: 0,
        left:0,
        right:0,
        zIndex:1,
    },
    firstBar:{
        width:'100%',
        padding:10,
        // position:'absolute',
        // bottom:0,
        // left:0
    },
    tabsTitle:{
        color: '#000', fontSize: 12, fontWeight: '400',
        padding:0
    },
    circleFunc:{
        width:28,
        height:28,
        borderRadius:28,
        backgroundColor:'rgba(148,147,147,.6)'
    },
    circleFuncOpactiy:{
      backgroundColor:'transparent'
    },
    circleFuncIcon:{
        color:'#fff',
        fontSize:18,
        fontWeight:'bold'
    },
    circleFuncIconColor:{
       color:'#333',
    },
    content:{
    },
    priceLadderBox:{
        width:'100%',
        height:56,
        backgroundColor:'rgba(247, 17, 17, .08)',
        paddingHorizontal:24,
    },
    priceLadder:{
        width:'33%',
        textAlign:'center',
    },
    tonnage:{
        fontWeight:'400',
        fontSize:12,
        color: '#666666',
        marginTop:9
    },
    goodDetailName:{
        paddingHorizontal:15,
        paddingVertical:22,
        backgroundColor:'#fff'
    },
    goodInformation:{

    },
    distribution:{
        width:'100%',
        height:40,
        borderRadius:3,
        overflow:'hidden',
    },
    promotion:{
        marginVertical:5,
        backgroundColor:'#fff',
        paddingHorizontal:15,
        paddingVertical:19
    },
    evaluateBox:{
        marginVertical:5,
        backgroundColor:'#fff',
        paddingHorizontal:15,
    },
    evaluate:{
        paddingVertical:19,
        borderBottomColor:'#E5E5E5',
        borderBottomWidth:.5
    },
    consulting:{
        paddingVertical:19,

    },
    consultingList:{
        marginLeft:15
    },
    shopBox:{
        paddingHorizontal:14,
        paddingVertical:12,
        backgroundColor:'#fff'
    },
    shopDetail:{

    },
    shopNames:{

    },
    shopLogo:{
        width:33,
        height:33,
        borderRadius:33,
        overflow:"hidden",
        padding:4,
        borderColor:'#E5E5E5',
        borderWidth:1,
    },
    routingBox:{
        width:65,
        height:13,
        backgroundColor:'#F2F2F2',
        borderRadius:20,
    },
    shopfnc:{
        paddingHorizontal:15,
        marginTop:16
    },
    goodDetail:{
        backgroundColor:'#fff',
        marginVertical:5,
        paddingHorizontal:10,
        paddingVertical:18
    },
    recommend:{
        paddingHorizontal:10,
        paddingVertical: 16
    }
})

const htmlContent = `<p style="text-align: center;"><img src="https://cdn.toodudu.com/2020/10/26/5rfNTc31IXdz8715LOI69kHBQCge6cP3z9i6B1Kc.png"></p><p style="text-align: center;"><img src="https://cdn.toodudu.com/2020/10/26/MGfeF5UvCzXnLvjFe1p8USrwPKdVCvcLXg0mxCNe.png"></p><p style="text-align: center;"><img src="https://cdn.toodudu.com/2020/10/26/TNIdK3b2gQUxTChi81G8A7YZuu2N79HnndAytRVR.png"></p><p style="text-align: center;"><img src="https://cdn.toodudu.com/2020/10/26/tvrRylqLpDGNYZZSI5Gj70a8fv8fh2tOlVDWnO7T.png"></p><p style="text-align: center;"><img src="https://cdn.toodudu.com/2020/10/26/ZNCJChoHwjwtsEcfHzxupBJJEteq0OeoweWKj9oc.png"></p><p style="text-align: center;"><img src="https://cdn.toodudu.com/2020/10/26/JSPjkMdXkJYOnvrJdBUympLhj1K4OdUFb36PelI4.png"></p>`;

const Good = ({navigation}:{navigation:RootStackNavigation}) => {
    const insets = useSafeAreaInsets();
    const windowWidth = useWindowDimensions().width;
    const goodsArr = useMemo(() => (
        [
            {
                name:'钛海THR-218钛白粉 金红石型二氧化钛 高白度易分散通用型钛白粉',
                picture:'https://cdn.toodudu.com/2023/07/19/Fo6B3WrT90kmkEgygD6Hk01FIIIt65XVNs11iVwf.jpg',
                price:'20.01'
            },
            {
                name:'工厂整车（20-32吨）汽运直发全国包邮，工厂整车（54吨）铁路直发至站点，工厂整柜（27吨）海运直发沿海区域，其他仓库运费另计',
                picture:'https://cdn.toodudu.com/2021/05/10/4Op4H3X5PkMp6ZnADltF86NpRhVAAdRhzuuTOFfg.jpeg',
                price:'50.01'
            },
            {
                name:'工厂整车（20-32吨）汽运直发全国包邮，工厂整车（54吨）铁路直发至站点，工厂整柜（27吨）海运直发沿海区域，其他仓库运费另计',
                picture:'https://cdn.toodudu.com/2019/11/26/4bniUERisINvutrYbmCVND9CC8s2ywSCag07i2Mr.jpeg',
                price:'30.01'
            },
            {
                name:'南钛NR-950金红石型钛白粉 通用型二氧化钛 高遮盖高白度高耐候性钛白粉 南京生产',
                picture:'https://cdn.toodudu.com/2021/05/11/QRR0kUQs3y7oPqqKpIURHQHPqR9zPFb30hBwBM3Q.jpeg',
                price:'10.01'
            },
        ]
    ), []);
    const [opacity, setOpacity] = useState<number>(0);
    const handleScroll = (event:NativeSyntheticEvent<NativeScrollEvent>) => {
        const {contentOffset} =  event.nativeEvent
        if(contentOffset.y < 20){
            setOpacity(0)
        }else if(contentOffset.y < 400){
            setOpacity(prevState => {
                return contentOffset.y/400
            })
        }else{
            setOpacity(1)
        }
    }

    return (
        <View style={[styles.container]}>
            <SafeAreaView style={{backgroundColor: `rgba(255, 255, 255, ${opacity})`,position:'absolute',top:0,left:0,right:0,zIndex:9}}>
                <View style={[defaultStyled.flex,defaultStyled.jc_ct,defaultStyled.fd_row,styles.firstBar]}>
                    <View style={[{width:166}]}>
                        <Tab value={0} dense buttonStyle={{padding:0}} containerStyle={{padding:0}}>
                            <Tab.Item titleStyle={styles.tabsTitle} containerStyle={{padding:0}}>商量</Tab.Item>
                            <Tab.Item titleStyle={styles.tabsTitle}>评价</Tab.Item>
                            <Tab.Item titleStyle={styles.tabsTitle}>详情</Tab.Item>
                            <Tab.Item titleStyle={styles.tabsTitle}>推荐</Tab.Item>
                        </Tab>
                    </View>

                    {/*<View>*/}
                    {/*    <TouchableOpacity onPress={navigation.goBack}>*/}
                    {/*        <View style={[styles.circleFunc,defaultStyled.flex,defaultStyled.jc_ct,defaultStyled.ai_ct,opacity && styles.circleFuncOpactiy ]} onpr>*/}
                    {/*            <Icon name='arrow-left' size={17} style={[styles.circleFuncIcon,opacity && styles.circleFuncIconColor]} />*/}
                    {/*        </View>*/}
                    {/*    </TouchableOpacity>*/}
                    {/*</View>*/}
                    {/*    */}
                    {/*<View style={[defaultStyled.flex,defaultStyled.fd_row]}>*/}
                    {/*    <View style={[styles.circleFunc,defaultStyled.flex,defaultStyled.jc_ct,defaultStyled.ai_ct,{marginRight:7.5},opacity && styles.circleFuncOpactiy]}>*/}
                    {/*        <Icon name='share-alt' size={17} style={[styles.circleFuncIcon,opacity && styles.circleFuncIconColor]} />*/}
                    {/*    </View>*/}
                    {/*    <View style={[styles.circleFunc,defaultStyled.flex,defaultStyled.jc_ct,defaultStyled.ai_ct,opacity && styles.circleFuncOpactiy]}>*/}
                    {/*        <Icon name='options' size={17} style={[styles.circleFuncIcon,opacity && styles.circleFuncIconColor]} />*/}
                    {/*    </View>*/}
                    {/*</View>*/}
                </View>
            </SafeAreaView>
            <ScrollView onScroll={handleScroll} scrollEventThrottle={120}>
                <View style={styles.goodPicture}>
                    <Swiper dot={
                        <View style={{
                            height: 3,
                            width: 5,
                            backgroundColor: 'rgba(0, 0, 0, .2)',
                            borderRadius: 1.5,
                            marginHorizontal: 2.5
                        }}></View>
                    } activeDot={
                        <View style={{
                            height: 3,
                            width: 15,
                            backgroundColor: 'rgba(0, 0, 0, .6)',
                            borderRadius: 1.5,
                            marginHorizontal: 2.5
                        }}></View>
                    } style={styles.swiperWrapper} showsButtons={false} horizontal={true} loop={true} autoplay={true}
                            autoplayTimeout={2}>
                        <View style={{flex: 1}}>
                            <Image resizeMode="stretch" style={{flex: 1}}
                                   source={{uri: 'https://cdn.toodudu.com/2021/05/10/UMVfS4wCOR5bZjtneaTjFVbscxAtXV8nfBadiCt3.jpeg'}}></Image>
                        </View>
                        <View style={{flex: 1}}>
                            <Image resizeMode="stretch" style={{flex: 1}}
                                   source={{uri: 'https://cdn.toodudu.com/2021/12/03/0QzlQ0W76CEPJHprWje7DrUYXpKnmkwbmSKHnwTZ.jpg'}}></Image>
                        </View>
                    </Swiper>
                </View>

                <View style={[styles.content,{marginBottom:insets.bottom}]}>
                    <View style={[styles.priceLadderBox,defaultStyled.flex,defaultStyled.fd_row,defaultStyled.jc_bt,defaultStyled.ai_ct]}>
                        <View style={styles.priceLadder}>
                            <Price defaultn={20000} floatn='01' />
                            <Text style={styles.tonnage}>1~9吨</Text>
                        </View>
                        <View style={styles.priceLadder}>
                            <Price defaultn={18000} floatn='01' />
                            <Text style={styles.tonnage}>10~19吨</Text>
                        </View>
                        <View style={styles.priceLadder}>
                            <Price defaultn={16000} floatn='01' />
                            <Text style={styles.tonnage}>20~以上</Text>
                        </View>
                    </View>
                    <View style={styles.goodDetailName}>
                        <View style={styles.goodInformation}>
                            <View style={[defaultStyled.flex,defaultStyled.fd_row]}>
                                <GoodTips name='多多超市' style={{marginRight:5}} colors={['rgba(250, 95, 95, 1)', 'rgba(247, 17, 17, 1)']} width={50} />
                                <GoodTips name='商家直营' style={{marginRight:5}} colors={['rgba(115, 92, 255, 1)', 'rgba(84, 54, 213, 1)']} width={50} />
                                <GoodTips name='现货' style={{marginRight:5}} colors={['rgba(255, 140, 17, 1)', 'rgba(255, 140, 17, 1)']} width={30} />
                            </View>
                            <View>

                            </View>
                        </View>
                        <View style={{marginVertical: 10}}>
                            <Text style={{fontSize:14,fontWeight:'400',color:'#333',marginBottom:10}} numberOfLines={2} ellipsizeMode="tail">商品名称商品名称商品名称商品商品名称商品名称商名品名称商品名称商品名称商品商品名称商品商品名称商商品名称商品名称商品名称商品商品名称商品名称商名品名称商品名称商品名称商品商品名称商品商品名称商</Text>
                            <Text style={{fontSize:14,fontWeight:'400',color:'rgba(247, 17, 17, 1)',marginBottom:10}} numberOfLines={2} ellipsizeMode="tail">商品二级标题！商品二级标题！商品二级标题！商品二级标题！商 品二级标题！</Text>
                        </View>
                        <View style={styles.distribution}>
                            <LinearGradient
                                colors={['rgba(32, 32, 32, 1)','rgba(77, 79, 83, 1)']}
                                start={{ x: 1, y: 0 }}
                                end={{x: 0, y: 0}}
                                style={[defaultStyled.flex,defaultStyled.fd_row,defaultStyled.ai_ct,defaultStyled.jc_bt,{flex:1,paddingHorizontal:10}]}>
                                <Text style={{fontWeight:'400',fontSize:12,color: '#E7BB83'}}>现在升级成为分销客，下单省¥000.00/吨</Text>
                                <Button
                                    ViewComponent={LinearGradient} // Don't forget this!
                                    buttonStyle={{width:77,borderRadius:20}}
                                    linearGradientProps={{
                                        colors: ["rgba(202, 152, 81, 1)", "rgba(246, 214, 175, 1)"],
                                        start: { x: 0, y: 0.5 },
                                        end: { x: 1, y: 0.5 },
                                    }}
                                >
                                    <Text style={{fontSize:12,fontWeight:'400',color: '#8B5918'}}>立即申请</Text>
                                </Button>
                            </LinearGradient>
                        </View>
                    </View>
                    <View style={[defaultStyled.flex,defaultStyled.fd_row,defaultStyled.ai_ct,styles.promotion]}>
                        <Text style={{fontWeight:'bold',fontSize:12,color:'#333',marginRight:10}}>促销</Text>
                        <View style={{borderColor:'rgba(247, 17, 17, 1)',borderWidth:.5,paddingHorizontal:5,paddingVertical:2,borderRadius:4}}>
                            <Text style={{fontSize:10,fontWeight:'400',color: '#F71111'}}>满减</Text>
                        </View>
                        <Text style={{fontWeight:'400',fontSize:10,color:'#666',marginLeft:10}}>满100吨，每吨减20000元，总优惠金额以结算价为准</Text>
                    </View>
                    <View style={styles.evaluateBox}>
                        <View style={[styles.evaluate]}>
                            <View style={[defaultStyled.flex,defaultStyled.fd_row,defaultStyled.jc_bt,defaultStyled.ai_ct]}>
                                <View style={[defaultStyled.flex,defaultStyled.fd_row,defaultStyled.ai_ct]}>
                                    <LinearGradient
                                        colors={['rgba(247, 17, 17, 1)','rgba(255, 255, 255, 1)']}
                                        start={{ x: 0, y: 0 }}
                                        end={{x: 0, y: 1}}
                                        style={[defaultStyled.flex,defaultStyled.ai_ct,defaultStyled.jc_ct,{width:3,height:12}]}>
                                    </LinearGradient>
                                    <Text style={{fontSize:12,color:'rgba(51, 51, 51, 1)',fontWeight:'bold',marginLeft:10}}>商品评价</Text>
                                    <Text style={{fontSize:12,color:'rgba(153, 153, 153, 1)',}}>(10000)</Text>
                                </View>
                                <View style={[defaultStyled.flex,defaultStyled.fd_row,defaultStyled.ai_ct]}>
                                    <Text style={{fontWeight:'400',fontSize:12,color:'#999'}}>全部</Text>
                                    <Icon name='right' size={17} style={{fontWeight:'400',fontSize:12,color:'#333',marginLeft:10}} />
                                </View>
                            </View>
                        </View>
                        <View style={styles.consulting}>
                            <View style={[defaultStyled.flex,defaultStyled.fd_row,defaultStyled.jc_bt,defaultStyled.ai_ct]}>
                                <View style={[defaultStyled.flex,defaultStyled.fd_row,defaultStyled.ai_ct]}>
                                    <LinearGradient
                                        colors={['rgba(247, 17, 17, 1)','rgba(255, 255, 255, 1)']}
                                        start={{ x: 0, y: 0 }}
                                        end={{x: 0, y: 1}}
                                        style={[defaultStyled.flex,defaultStyled.ai_ct,defaultStyled.jc_ct,{width:3,height:12}]}>
                                    </LinearGradient>
                                    <Text style={{fontSize:12,color:'rgba(51, 51, 51, 1)',fontWeight:'bold',marginLeft:10}}>购买咨询</Text>
                                </View>
                                <View style={[defaultStyled.flex,defaultStyled.fd_row,defaultStyled.ai_ct]}>
                                    <Icon name='right' size={17} style={{fontWeight:'400',fontSize:12,color:'#333',marginLeft:10}} />
                                </View>
                            </View>
                            <View style={styles.consultingList}>
                                <View style={[defaultStyled.flex,defaultStyled.fd_row,defaultStyled.ai_ct,{marginTop:11}]}>
                                    <LinearGradient
                                        colors={['#2a6bf0','#76acfb']}
                                        start={{ x: 1, y: 0 }}
                                        end={{x: 0, y: 0}}
                                        style={[defaultStyled.flex,defaultStyled.ai_ct,defaultStyled.jc_ct,{width:14,height:14}]}>
                                        <Text style={{fontSize:10,fontWeight:'400',color: '#fff'}}>问</Text>
                                    </LinearGradient>
                                    <Text style={{fontSize:11,fontWeight:'400',color:'#333',marginLeft:5}}>这款涂料好使吗</Text>
                                </View>
                                <View style={[defaultStyled.flex,defaultStyled.fd_row,defaultStyled.ai_ct,{marginTop:11}]}>
                                    <LinearGradient
                                        colors={['#2a6bf0','#76acfb']}
                                        start={{ x: 1, y: 0 }}
                                        end={{x: 0, y: 0}}
                                        style={[defaultStyled.flex,defaultStyled.ai_ct,defaultStyled.jc_ct,{width:14,height:14}]}>
                                        <Text style={{fontSize:10,fontWeight:'400',color: '#fff'}}>问</Text>
                                    </LinearGradient>
                                    <Text style={{fontSize:11,fontWeight:'400',color:'#333',marginLeft:5}}>这款涂料好使吗</Text>
                                </View>
                            </View>

                        </View>
                    </View>
                    <View style={styles.shopBox}>
                        <View style={[defaultStyled.flex,defaultStyled.jc_bt,defaultStyled.fd_row,defaultStyled.ai_ct,styles.shopDetail]}>
                            <View style={[defaultStyled.flex,defaultStyled.fd_row,styles.shopNames]}>
                                <View style={styles.shopLogo}>
                                    <Image resizeMode='stretch' style={{flex:1,overflow:'hidden',borderRadius:25}} source={{uri:'https://cdn.toodudu.com/2021/09/07/mt6ch6S1sEC9NZyW9FUYClwrjWIct33P70nMzaxy.jpeg'}}></Image>
                                </View>
                                <View style={[defaultStyled.flex,defaultStyled.fd_column,defaultStyled.jc_bt,{marginLeft:5}]}>
                                    <Text style={{fontWeight:'400',fontSize:12,color:'#333'}}>涂多多商城</Text>
                                    <View style={[defaultStyled.flex,defaultStyled.fd_row,defaultStyled.jc_ct,styles.routingBox]}>
                                        <AirbnbRating selectedColor={'red'} size={6} isDisabled={true} showRating={false} defaultRating={3} count={5} />
                                    </View>
                                </View>
                            </View>
                            <Icon name='right' size={17} style={{fontWeight:'400',fontSize:12,color:'#333',marginLeft:10}} />
                        </View>
                        <View style={[defaultStyled.flex,defaultStyled.fd_row,defaultStyled.jc_en,styles.shopfnc]}>
                            <View style={[defaultStyled.flex,defaultStyled.ai_ct,defaultStyled.jc_ct]}>
                                <Text style={{color:'#333',fontSize:12,marginBottom:10}}>1000</Text>
                                <Text style={{color:'#333',fontSize:12,marginBottom:10}}>关注人数</Text>
                                <Button type="outline" buttonStyle={{width:110,borderRadius:110,height:31,borderColor: '#ccc'}}>
                                    <Image resizeMode='stretch' style={{width:14,height:14,marginRight:7}} source={{uri:'https://cdn.toodudu.com/uploads/2023/10/23/good-service.png'}}></Image>
                                    <Text style={{fontSize:12,fontWeight:'400',color: '#333'}}>联系客服</Text>
                                </Button>
                            </View>
                            <View style={{width:.5,height:31,borderLeftColor: '#ccc',borderLeftWidth:1}}></View>
                            <View style={[defaultStyled.flex,defaultStyled.ai_ct,defaultStyled.jc_ct]}>
                                <Text style={{color:'#333',fontSize:12,marginBottom:10}}>1000</Text>
                                <Text style={{color:'#333',fontSize:12,marginBottom:10}}>全部商品</Text>
                                <Button type="outline" buttonStyle={{width:110,borderRadius:110,height:31,borderColor: '#ccc'}}>
                                    <Image resizeMode='stretch' style={{width:14,height:14,marginRight:7}} source={{uri:'https://cdn.toodudu.com/uploads/2023/10/23/shop.png'}}></Image>
                                    <Text style={{fontSize:12,fontWeight:'400',color: '#333'}}>进店逛逛</Text>
                                </Button>
                            </View>
                        </View>
                    </View>
                    <View style={styles.goodDetail}>
                        <View>
                            <View style={[defaultStyled.flex,defaultStyled.fd_row,defaultStyled.ai_ct]}>
                                <LinearGradient
                                    colors={['rgba(247, 17, 17, 1)','rgba(255, 255, 255, 1)']}
                                    start={{ x: 0, y: 0 }}
                                    end={{x: 0, y: 1}}
                                    style={[defaultStyled.flex,defaultStyled.ai_ct,defaultStyled.jc_ct,{width:3,height:12}]}>
                                </LinearGradient>
                                <Text style={{fontSize:14,color:'#333',fontWeight:'bold',marginLeft:10}}>详情</Text>
                            </View>
                            <HTML contentWidth={windowWidth} source={{html:htmlContent}}></HTML>
                        </View>
                        <View>
                            <View style={[defaultStyled.flex,defaultStyled.fd_row,defaultStyled.ai_ct]}>
                                <LinearGradient
                                    colors={['rgba(247, 17, 17, 1)','rgba(255, 255, 255, 1)']}
                                    start={{ x: 0, y: 0 }}
                                    end={{x: 0, y: 1}}
                                    style={[defaultStyled.flex,defaultStyled.ai_ct,defaultStyled.jc_ct,{width:3,height:12}]}>
                                </LinearGradient>
                                <Text style={{fontSize:14,color:'#333',fontWeight:'bold',marginLeft:10}}>价格说明</Text>
                            </View>
                            <Text style={{color:'#333',fontSize:12,marginTop:10,lineHeight:18}}><Text style={{fontWeight:'600'}}>未划线价格：</Text>指商品的实时标价，不因表述的差异改变性质。具体成交价根据购买的数量不同、商品参加的活动、会员使用优惠券、红包、多多币、积分等发生变化，最终以订单结算页价格为准。</Text>
                            <Text style={{color:'#333',fontSize:12,marginTop:10,lineHeight:18}}>商家详情页（含主图）以图片或文字形式标注的秒杀价、活动价、优惠价、促销价、评估价等价格可能是使用优惠券、满减或特定优惠活动和时段等情形下的价格，具体请以结算页面的标价、优惠条件或活动规则为准。</Text>
                            <Text style={{color:'#333',fontSize:12,marginTop:10,lineHeight:18}}><Text style={{fontWeight:'600'}}>划线价：</Text>商品展示的划横线价格为参考价，并非原价，该价格可能是市场指导价、正品零售价、厂商指导价、该商品曾经展示过的销售价或其他真实有依据的价格；由于地区、时间的差异性和市场行情波动，市场指导价、厂商指导价等可能会与您购物时展示的不一致，该价格仅供您参考。</Text>
                            <Text style={{color:'#333',fontSize:12,marginTop:10,lineHeight:18}}><Text style={{fontWeight:'600'}}>异常问题：</Text>商品促销信息以商品详情页“促销”栏中的信息为准；商品的具体售价以订单结算页价格为准；如您发现活动商品售价或促销信息有异常，建议购买前先联系销售商咨询。</Text>
                        </View>
                    </View>
                    <View style={styles.recommend}>
                        <Recommend goods={goodsArr} load={false} centerTitle={true} />
                    </View>
                </View>
            </ScrollView>
        </View>
    )
}
export default Good
