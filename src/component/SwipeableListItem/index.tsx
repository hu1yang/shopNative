import React,{useCallback , memo , useRef} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, TouchableWithoutFeedback} from 'react-native';
import { ListItem , Avatar } from '@rneui/themed';
import LinearGradient from 'react-native-linear-gradient';
import { Swipeable } from 'react-native-gesture-handler';
import Icon from "react-native-vector-icons/AntDesign";
import defaultStyled from "@/assets/defaultStyled";
import Price from "@/component/price";
import AddAndSubtract from "@/component/addAndSubtract";


type goodInfor = {
    id:number;
    picture:string;
    name:string;
    price:string;
    unit:number;
    checked:boolean;
}
interface IProps{
    goodInformation:goodInfor;
    onPress?:() => void;
    onDelete?:() => void;
    changeStatus:({value, id,shopId,filed}:{
        value:number|boolean;
        id:number;
        shopId:number;
        filed:string;
    }) => void;
    shopId:number;
}
const SwipeableListItem = memo(({ goodInformation , shopId , onPress, onDelete , changeStatus }:IProps) => {
    const renderRightActions = () => (
        <View style={styles.rightActions}>
            <TouchableOpacity onPress={onPress} style={styles.button}>
                <LinearGradient
                    style={[{height: '100%'},defaultStyled.flex,defaultStyled.jc_ct,defaultStyled.ai_ct]}
                    colors={['rgba(252, 176, 17, 1)', 'rgba(253, 201, 94, 1)']}
                    start={{ x: 1, y: 0 }}
                    end={{x: 0, y: 0}}>
                    <Text style={styles.actionText}>移入关注</Text>
                </LinearGradient>
            </TouchableOpacity>
            <TouchableOpacity onPress={onDelete} style={styles.button}>
                <LinearGradient
                    style={[{height: '100%'},defaultStyled.flex,defaultStyled.jc_ct,defaultStyled.ai_ct]}
                    colors={['rgba(250, 95, 95, 1)', 'rgba(247, 17, 17, 1)']}
                    start={{ x: 1, y: 0 }}
                    end={{x: 0, y: 0}}>
                    <Text style={styles.actionText}>删除</Text>
                </LinearGradient>
            </TouchableOpacity>
        </View>
    );

    const onChangePrice = useCallback(({value,filed}:{
        value: number;
        filed: string;
    }) => {
        changeStatus({value, id:goodInformation.id,shopId,filed})
    },[goodInformation.unit])

    const toggleGood = () => {
        changeStatus({value:!goodInformation.checked, id:goodInformation.id,shopId,filed:'checked'})
    }

    return (
        <ListItem.Swipeable
            rightWidth={116}
            rightContent={renderRightActions}
            leftWidth={0}
        >
            <ListItem.CheckBox
                checked={goodInformation.checked}
                uncheckedIcon={
                    <View style={{
                        width: 17,
                        height: 17,
                        borderRadius: 17,
                        borderColor: '#898989',
                        borderWidth: 1.5,
                        backgroundColor: '#fff',
                    }}></View>
                }
                onPress={toggleGood}
                checkedIcon={
                    <View style={{
                        width: 17,
                        height: 17,
                        borderRadius: 17,
                        backgroundColor: '#F71111',
                    }}>
                        <Icon name="check" size={15}
                              style={{color: '#fff', textAlign: 'center', lineHeight: 17}}></Icon>
                    </View>
                }/>
            <Avatar
                containerStyle={{
                    shadowColor: '#e9e9e9',
                    shadowOffset: {
                        width: 0,
                        height: 0,
                    },
                    shadowOpacity: 0.55,
                    shadowRadius: 21,
                    borderRadius:15
                }}
                rounded={false}
                size={91}
                source={{uri: "https://cdn.toodudu.com/tdd/images/201502/thumb_img/285_thumb_G_1423526684655.jpg"}}
            />
            <ListItem.Content style={[defaultStyled.flex,defaultStyled.fd_column,defaultStyled.jc_bt,{height:91}]}>
                <ListItem.Title numberOfLines={2} style={{fontWeight: '400',fontSize: 11,color: '#333333'}}>{goodInformation.name}</ListItem.Title>
                <View style={[defaultStyled.flex,defaultStyled.fd_row,defaultStyled.jc_bt,defaultStyled.ai_ct,{width:'100%'}]}>
                    <View style={[defaultStyled.flex,defaultStyled.fd_row,defaultStyled.ai_bl]}>
                        <View style={[defaultStyled.flex,defaultStyled.fd_row,defaultStyled.ai_bl]}>
                            <Price defaultn={1000} floatn='03'></Price>
                            <Text style={{fontSize:12,fontWeight:'400',color:'rgba(51, 51, 51, 1)'}}>/吨</Text>
                        </View>
                        {/*<View style={{backgroundColor:'#F71111',width:20,height:13,marginLeft:5}}>*/}
                        {/*    <Text style={{fontSize:10,fontWeight:'bold',color:'#fff',textAlign:'center'}}>VIP</Text>*/}
                        {/*</View>*/}
                    </View>
                    <View>
                        <AddAndSubtract quantity={goodInformation.unit} changeQuantity={onChangePrice}></AddAndSubtract>
                    </View>
                </View>
            </ListItem.Content>
            {/*<ListItem.Chevron />*/}
        </ListItem.Swipeable>
    );
})

const styles = StyleSheet.create({
    rightActions: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        height: '100%',
    },
    actionText: {
        padding:12,
        color: 'white',
        fontSize: 16,
    },
    button:{
        width:58,
        height:'100%'
    },
});

export default SwipeableListItem;
