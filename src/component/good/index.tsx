import {StyleSheet, View , Image , Text} from 'react-native'
import defaultStyled from "@/assets/defaultStyled";
import Price from "@/component/price";
import GoodTips from "@/component/goodTips";
import React from "react";

let styled = StyleSheet.create({
    good:{
        width:'49%',
        // width:175,
        height:259,
        borderRadius:10,
        overflow:'hidden',
        backgroundColor:'#fff'
    },
    goodPicture:{
        width:'100%',
        height:175
    },
    goodDetail:{
        padding:10,
        flex:1
    },
    goodMame:{

    },
    goodBottom:{

    },
    goodType:{
        paddingVertical:2.5,
        paddingHorizontal:5,
        backgroundColor:'rgba(255,195,0,0.12)',
        borderRadius:2
    }
})
const Good = ({good,style}:any) => {
    return (
        <View style={[style,styled.good]}>
            <View style={styled.goodPicture}>
                <Image resizeMode='stretch' style={{flex:1}} source={{uri:good.picture}} />
            </View>
            <View style={[defaultStyled.flex,defaultStyled.fd_column,defaultStyled.jc_bt,styled.goodDetail]}>
                <View style={[styled.goodMame]}>
                    <Text  numberOfLines={2} ellipsizeMode="tail" style={{fontSize:13,fontWeight:'400',color:'rgba(51, 51, 51, 1)'}}>
                        <GoodTips name='多多超市' colors={['rgba(250, 95, 95, 1)', 'rgba(247, 17, 17, 1)']} width={50} />
                        {good.name}
                    </Text>
                </View>
                <View style={[defaultStyled.flex,defaultStyled.fd_row,defaultStyled.jc_bt,defaultStyled.ai_ct,styled.goodBottom]}>
                    <View style={[defaultStyled.flex,defaultStyled.fd_row,defaultStyled.ai_bl]}>
                        <Price defaultn={1000} floatn='03' />
                        <Text style={{fontSize:12,fontWeight:'400',color:'rgba(51, 51, 51, 1)'}}>/吨</Text>
                    </View>
                    <View style={styled.goodType}>
                        <Text style={{fontSize:10,fontWeight:'400',color:'#FF8F1F'}}>期货</Text>
                    </View>
                </View>
            </View>
        </View>
    )
}

export default Good
