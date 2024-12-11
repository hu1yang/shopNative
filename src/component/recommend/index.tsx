import React, {memo} from "react";
import {View, Text, StyleSheet, ActivityIndicator, Image} from "react-native";
import defaultStyled from '@/assets/defaultStyled'
import Good from "@/component/good";


let styled = StyleSheet.create({
    recommand:{
        marginTop:20
    },
    goodsBox:{
        marginTop:20
    }
})
interface Iprops{
    goods:any[];
    load:boolean;
    centerTitle?:boolean|undefined;
}

const Recommend = memo(({goods,load,centerTitle = false}:Iprops) => {
    function LeftTitle(){
        return (
            <View style={[defaultStyled.flex,defaultStyled.fd_row]}>
                <View style={{width:3,height:15,backgroundColor:'rgba(247, 17, 17, 1)',borderRadius:20}}></View>
                <View style={{marginLeft:7}}><Text style={{fontSize:16,fontWeight:'500',color:'#333'}}>为您推荐</Text></View>
            </View>
        )
    }
    function CenterTitle(){
        return (
            <View style={[defaultStyled.flex,defaultStyled.fd_row,defaultStyled.jc_ct,defaultStyled.ai_ct]}>
                <Image resizeMode='stretch' style={{width:18,height:15,marginRight:15}} source={require('@/assets/picture/recommend/left.png')}></Image>
                <View style={{marginLeft:7}}><Text style={{fontSize:16,fontWeight:'500',color:'#333'}}>为您推荐</Text></View>
                <Image resizeMode='stretch' style={{width:18,height:15,marginLeft:15}} source={require('@/assets/picture/recommend/right.png')}></Image>

            </View>
        )
    }
    return (
        <View style={styled.recommand}>
            { centerTitle ? <CenterTitle/> : <LeftTitle/> }
            <View style={[styled.goodsBox,defaultStyled.flex,defaultStyled.flex_wrap,defaultStyled.fd_row,defaultStyled.jc_bt]}>
                {
                    goods.map((item,index) => (
                        <Good key={index} good={item} style={{ marginBottom: 10 }} />
                    ))
                }
            </View>
            {
                load && <ActivityIndicator />
            }

        </View>
    )
})

export default Recommend
