import React, {useState, useMemo, useCallback} from 'react';
import {View, Text, SafeAreaView, StyleSheet, ScrollView, RefreshControl, Image , TouchableWithoutFeedback} from "react-native";
import Icon from 'react-native-vector-icons/AntDesign';
import { ListItem , Button , CheckBox } from '@rneui/themed';
import SwipeableListItem from '@/component/SwipeableListItem';
import defaultStyled from "@/assets/defaultStyled";


interface IShop{
    id:number;
    shopName:string;
    isCheck:boolean;
    goods:IGood[];
}
interface IGood{
    id:number;
    picture:string;
    name:string;
    price:string;
    unit:number;
    checked:boolean;
}

const styles = StyleSheet.create({
    navBar:{
        height:23,
        width: '100%',
        paddingHorizontal:13.5
    },
    content:{
        flex:1,
        padding:10,
    },
    shopBox:{
        width:'100%',
        backgroundColor:'#FFFFFF',
        borderRadius:10,
        paddingVertical:19,
        paddingHorizontal:10,
        marginBottom:10
    },
    shopHeader:{

    },
    shopHeaderLeft:{

    },
    shopHeaderRight:{},
    coupon:{
        width:50,
        height:23,
        backgroundColor:'rgba(247, 17, 17, .1)',
        borderRadius:11.5
    },
    goodsList:{
        // paddingBottom:17.5
    },
    goodBox:{
        paddingVertical:15,
        borderBottomWidth:.5,
        borderBottomColor:'#F2F2F2'
    },
    goodOper:{

    }
})

const Cart = () => {
    const [isRefreshing, setIsRefreshing] = useState<boolean>(false);
    const [shopList, setShopList] = useState<IShop[]>([{
        id:1,
        shopName:'涂多多商城',
        isCheck:false,
        goods:[
            {
                id:11,
                picture:'https://cdn.toodudu.com/tdd/images/201609/source_img/2969_G_1473328681453.jpg?imageView2/1/w/350/h/350',
                name:'昊龙 锐钛型HLA-300钛白粉',
                price:'11000.00',
                unit:999,
                checked:false
            },
            {
                id:12,
                picture:'https://cdn.toodudu.com/tdd/images/201609/source_img/2969_G_1473328681453.jpg?imageView2/1/w/350/h/350',
                name:'涂多多 溶喷pp专用料 聚丙烯颗用于溶喷粒TDD-PP1500 用于溶喷法聚丙烯法法用于溶喷法聚丙烯法法',
                price:'999.00',
                unit:100,
                checked:false
            }
        ]
    },
        {
            id:2,
            shopName:'涂多多商城',
            isCheck:false,
            goods:[
                {
                    id:21,
                    picture:'https://cdn.toodudu.com/tdd/images/201609/source_img/2969_G_1473328681453.jpg?imageView2/1/w/350/h/350',
                    name:'昊龙 锐钛型HLA-300钛白粉',
                    price:'11000.00',
                    unit:999,
                    checked:false
                },
                {
                    id:22,
                    picture:'https://cdn.toodudu.com/tdd/images/201609/source_img/2969_G_1473328681453.jpg?imageView2/1/w/350/h/350',
                    name:'涂多多 溶喷pp专用料 聚丙烯颗用于溶喷粒TDD-PP1500 用于溶喷法聚丙烯法法用于溶喷法聚丙烯法法',
                    price:'999.00',
                    unit:100,
                    checked:false
                }
            ]
        }]);
    const cartPrice = useMemo(() => ({  title: '121',
        subtitle: '222',
        checked:true,
        price:100 }),[]);

    const handleRefresh = () => {

    }
    const goToShop = () => { // 去店铺
        console.log('去店铺')
    }
    const toggleShop = (id:number) => { // 选中当前商店所有商品
        setShopList(prevData => {
            return prevData.map(item => {
                if(item.id === id){
                    item.isCheck = !item.isCheck
                    item.goods.map(good => {
                        good.checked = item.isCheck
                    })
                }
                return item
            })
        })
    }
    const setChangeGoods = useCallback(({value, id, shopId, filed}:{
        value:number|boolean;
        id:number;
        shopId:number;
        filed:string;
    }) => {
        setShopList(prevData => {
            return prevData.map(item => {
                if(item.id === shopId){
                    item.goods = Array.from(item.goods,a => {
                        if(a.id === id){
                            (a as any)[filed] = value
                        }
                        return a
                    })
                }
                return item
            })
        })
    },[shopList])

    return (
        <SafeAreaView style={{backgroundColor: '#f2f2f2',flex: 1}}>
            <View style={[defaultStyled.flex,defaultStyled.fd_row,defaultStyled.jc_bt,defaultStyled.ai_ct,styles.navBar]}>
                <View style={{width:40}}>
                    {/*<Icon name='left' size={16} style={{color:'#333333',fontWeight:'400',textAlign:'left'}} />*/}
                </View>
                <Text style={{fontSize:16,fontWeight:'400',color:'#333'}}>购物车</Text>
                <TouchableWithoutFeedback>
                    <View style={{width:40}}>
                        <Text style={{fontSize:13,fontWeight:'400',color:'#333',textAlign:'right'}}>编辑</Text>
                    </View>
                </TouchableWithoutFeedback>

            </View>
            <View style={styles.content}>
                <ScrollView
                    refreshControl={
                        <RefreshControl
                            refreshing={isRefreshing}
                            onRefresh={handleRefresh}
                            colors={['#0000ff']}
                            tintColor="#0000ff"
                        />
                    }>
                    {
                        shopList.map(item =>
                            <View style={styles.shopBox} key={item.id}>
                                <View style={[styles.shopHeader,defaultStyled.flex,defaultStyled.fd_row,defaultStyled.jc_bt,defaultStyled.ai_ct]}>
                                    <View style={styles.shopHeaderLeft}>
                                        <CheckBox
                                            containerStyle={{padding: 0,marginLeft:0}}
                                            title={
                                                <TouchableWithoutFeedback onPress={goToShop}>
                                                    <View style={[defaultStyled.flex,defaultStyled.fd_row,defaultStyled.ai_ct]}>
                                                        <Image source={{uri:'https://cdn.toodudu.com/uploads/2023/10/26/shop_attention.png'}} style={{width:16,height:16}} />
                                                        <Text style={{fontSize:12,fontWeight:'400',color:'#333',paddingLeft:8,paddingRight:5}}>{item.shopName}</Text>
                                                        <Icon name='right' size={12} style={{color:'#333333',fontWeight:'400',textAlign:'left'}} />
                                                    </View>
                                                </TouchableWithoutFeedback>
                                            }
                                            checked={item.isCheck}
                                            onPress={() => toggleShop(item.id)}
                                            checkedIcon={
                                                <View style={{width:17,height:17,borderRadius:17,backgroundColor:'#F71111',marginRight:14}}>
                                                    <Icon name='check' size={15} style={{color:'#fff',textAlign:'center',lineHeight:17}}></Icon>
                                                </View>
                                            }
                                            uncheckedIcon={
                                                <View style={{width:17,height:17,borderRadius:17,borderColor:'#898989',borderWidth:1.5,backgroundColor:'#fff',marginRight:14}}></View>
                                            }
                                        />
                                    </View>
                                    <View style={styles.shopHeaderRight}>
                                        <View style={styles.coupon}>
                                            <Text style={{fontSize:11,fontWeight:'400',color:'#F71111',textAlign:'center',lineHeight:23}}>领券</Text>
                                        </View>
                                    </View>
                                </View>
                                {
                                    item.goods.map(good => (
                                        <View style={styles.goodsList} key={good.id}>
                                            <View style={styles.goodBox}>
                                                <View style={styles.goodOper}>
                                                    <SwipeableListItem goodInformation={good} shopId={item.id} changeStatus={setChangeGoods} />
                                                </View>
                                            </View>
                                        </View>
                                    ))
                                }
                            </View>
                        )
                    }
                </ScrollView>
            </View>
        </SafeAreaView>

    )
}
export default Cart
