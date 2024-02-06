import {View,Text} from "react-native";
import defaultStyled from "@/assets/defaultStyled";

interface Iprops{
    symbol?:string;
    symbolSize?:number;
    symbolColor?:string;
    symbolWeight?:
        | 'normal'
        | 'bold'
        | '100'
        | '200'
        | '300'
        | '400'
        | '500'
        | '600'
        | '700'
        | '800'
        | '900'
        | undefined;
    defaultn:number|string;
    defaultnSize?:number;
    defaultnColor?:string;
    defaultnWeight?:
        | 'normal'
        | 'bold'
        | '100'
        | '200'
        | '300'
        | '400'
        | '500'
        | '600'
        | '700'
        | '800'
        | '900'
        | undefined;
    floatn:number|string;
    floatnSize?:number;
    floatnColor?:string;
    floatnWeight?:
        | 'normal'
        | 'bold'
        | '100'
        | '200'
        | '300'
        | '400'
        | '500'
        | '600'
        | '700'
        | '800'
        | '900'
        | undefined;
}
let props = {

}
const Price = ({
                   symbol = '¥',
                   symbolSize = 11,
                   symbolColor = 'rgba(247, 17, 17, 1)',
                   symbolWeight = '700',
                   defaultn,
                   defaultnSize = 17,
                   defaultnColor = 'rgba(247, 17, 17, 1)',
                   defaultnWeight = '700',
                   floatn,
                   floatnSize = 11,
                   floatnColor = 'rgba(247, 17, 17, 1)',
                   floatnWeight = '700'}:Iprops) => {
    return (
        <View style={[defaultStyled.flex,defaultStyled.fd_row,defaultStyled.ai_bl]}>
            <Text style={{fontSize:symbolSize,fontWeight:symbolWeight,color:symbolColor}}>{symbol}</Text>
            <Text style={{fontSize:defaultnSize,fontWeight:defaultnWeight,color:defaultnColor}}>{defaultn}</Text>
            <Text style={{fontSize:floatnSize,fontWeight:floatnWeight,color:floatnColor}}>.</Text>
            <Text style={{fontSize:floatnSize,fontWeight:floatnWeight,color:floatnColor}}>{floatn}</Text>
        </View>
    )
}

export default Price
