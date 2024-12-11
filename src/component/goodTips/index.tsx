import React, {memo} from "react";
import {StyleProp, Text, View, ViewStyle} from "react-native";
import defaultStyled from "@/assets/defaultStyled";
import LinearGradient from "react-native-linear-gradient";

export default memo(({name,colors,width=50,style}:{
    name:string;
    colors:string[];
    width:number;
    style:StyleProp<ViewStyle> | undefined;
}) => {
    return (
        <LinearGradient
            colors={colors}
            start={{ x: 1, y: 0 }}
            end={{x: 0, y: 0}}
            style={[defaultStyled.flex,defaultStyled.ai_ct,defaultStyled.jc_ct,{width,height:15,borderRadius:3},style]}>
            <View>
                <Text style={{ color: '#fff', fontSize: 10,fontWeight:'400' }}>{name}</Text>
            </View>
        </LinearGradient>
    )
})
