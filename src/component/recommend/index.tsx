import {View, Text, StyleSheet} from "react-native";
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

const Recommend = ({goods}) => {
    return (
        <View style={styled.recommand}>
            <View style={[defaultStyled.flex,defaultStyled.fd_row]}>
                <View style={{width:3,height:15,backgroundColor:'rgba(247, 17, 17, 1)',borderRadius:20}}></View>
                <View style={{marginLeft:7}}><Text style={{fontSize:16,fontWeight:'500',color:'#333'}}>为您推荐</Text></View>
            </View>
            <View style={[styled.goodsBox,defaultStyled.flex,defaultStyled.flex_wrap,defaultStyled.fd_row,defaultStyled.jc_bt]}>
                {
                    goods.map((item,index) => (
                        <Good key={index} good={item} style={{ marginBottom: 10 }} />
                    ))
                }
            </View>
        </View>
    )
}

export default Recommend
