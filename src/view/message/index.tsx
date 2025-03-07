import React, { useEffect, useRef , useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    Image,
    FlatList,
    ActivityIndicator,
    RefreshControl,
    TouchableOpacity
} from "react-native";
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import axios, { Pagination} from '@/util/axios';
import {RootStackNavigation} from "@/types/navigation";
import Toast from "react-native-toast-message";
import { ImessageListData } from "@/types/message";
import { useSelector , useDispatch } from "react-redux";
import {RootState} from "@/store";
import {setRoom} from "@/store/actions/message";


const styles = StyleSheet.create({
    container:{
        width: '100%',
        height: '100%',
        overflow: 'hidden',
        display: 'flex',
    },
    headerTabs:{
        backgroundColor: 'rgba(248, 248, 248, 1)'
    },
    header:{
        width: '100%',
        height: 44,
        backgroundColor: 'rgba(255, 255, 255, 1)',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#fff',  //设置阴影色
        shadowOffset:{width:0,height:1},  //设置阴影偏移,该值会设置整个阴影的偏移，width可以看做x,height可以看做y,x向右为正，y向下为正
        shadowOpacity: .3,
        shadowRadius: 1.5,  //设置阴影模糊半径,该值设置整个阴影的半径，默认的效果就是View的四周都有阴影
    },
    headerText:{
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333333',
        marginRight: 20
    },
    tabs:{
        width: '100%',
        height: 95,
        backgroundColor: 'rgba(255, 255, 255, 1)',
        paddingTop: 22.5, paddingRight: 20, paddingBottom: 15, paddingLeft: 20,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between' ,
        borderBottomLeftRadius: 15,
        borderBottomEndRadius: 15,
        overflow: 'hidden'
    },
    tab: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    message: {
        width: '100%',
        height: 0,
        flex:1,
        backgroundColor: 'rgba(248, 248, 248, 1)'
    },
    messageBox:{
        margin: 10,
        backgroundColor: '#fff',
        borderRadius: 10,
        paddingHorizontal: 10,
        paddingVertical: 20,
        // height: '100%',
        flex: 1,
        display: 'flex',
        overflow: "hidden"
    },
    scrollBox: {

    },
    messageList:{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 20,
        borderBottomColor: '#D8D8D8',
        borderBottomWidth: 1,

    },
    messageListLast:{
        borderBottomWidth: 0
    },
    messageLogo: {
        width: 45, height: 45,
        borderColor: "#E5E5E5",
        borderWidth: 1,
        borderRadius: 45,
        overflow: "hidden",
    },
    messageInfomation: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        flex: 1,
        marginLeft: 15,

    },
    messageInfomationHeader: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: "space-between",
        alignItems: 'center'
    },
    messageInfomationTitle: {
        fontSize: 14,
        fontWeight: "bold",
        color: '#333',
        flex: 1
    },
    messageInfomationTime: {
        fontSize: 11,
        fontWeight: '400',
        color: '#ccc'
    },
    messageInfomationCeek: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: "space-between",
        alignItems: 'center'
    },
    messageInfomationBox:{
        width: "auto",
        height: 15,
        borderRadius: 15,
        backgroundColor: 'rgba(249, 76, 76, 1)',
        flexWrap: 'wrap',
        padding: 2
    }
})

const Message = ({navigation}:{
    navigation:RootStackNavigation
}) => {
    const operate = useRef<{
        name:string;
        src:string;
        link:string;
    }[]>([
        {
            name:'交易物流',
            src:'https://cdn.toodudu.com/uploads/2023/10/20/wuliu2.png',
            link:''
        },
        {
            name:'优惠活动',
            src:'https://cdn.toodudu.com/uploads/2023/10/20/图层 3.png',
            link:''
        },
        {
            name:'热点资讯',
            src:'https://cdn.toodudu.com/uploads/2023/10/20/图层 5.png',
            link:''
        },
        {
            name:'官方客服',
            src:'https://cdn.toodudu.com/uploads/2023/10/20/图层 4.png',
            link:''
        },
    ]);

    const [refreshing, setRefreshing] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState(true);
    const [page, setPage] = useState<Pagination>({
        page:1,
        pageSize:15,
        total:null
    });

    const dispatch = useDispatch();
    const isLogin:Boolean = useSelector((state:RootState) => state.user.isLogin)
    const messageListData:ImessageListData[] = useSelector((state:RootState) => state.message.roomList)


    useEffect(() => {
        if(!messageListData.length){
            setRefreshing(false);
            setIsLoading(true);
            getData();
        }
    }, [isLogin]);

    const getData  = () => {
        axios.post<ImessageListData[]>('/message/room/index',{}).then(res => {
            if(res.code === 200){
                if(res.data.length > 0){
                    dispatch(setRoom(res.data))
                }
                if(res.pagination){
                    setPage({
                        page:res.pagination.page,
                        pageSize:res.pagination.pageSize,
                        total:res.pagination.total
                    })
                }
                setRefreshing(false);
                setIsLoading(false);
            }else if(res.code === 403){
                setRefreshing(false);
                setIsLoading(true);
                Toast.show({
                    type: 'error',  // 可以选择不同的类型，如 success, error, info
                    position: 'top',  // 默认从顶部显示
                    text1: 'network code:' + res.code,
                    text2: res.msg,
                    visibilityTime: 3000,  // Toast显示时长
                    topOffset: 150, // 控制顶部距离，修改此值调整 Toast 显示的高度
                    text1Style: {
                        fontSize: 14,
                        color: '#333', // 自定义文字颜色
                    },
                    text2Style:{
                        fontSize: 12,
                        color: '#ccc', // 自定义文字颜色
                    }
                });
                setTimeout(() => {
                    navigation.navigate('Login')
                },200)
            }
        }).catch(() => {
            setRefreshing(false);
            setIsLoading(false);
        })
    }

    const onRefresh =  () => {
        setRefreshing(true);
        setIsLoading(true);
        setPage({
            page:1,
            pageSize:15,
            total:0
        })
        dispatch(setRoom([]))
        getData()
    }
    const onEndReachedMessage = () => {
        if(!page.total) return
        if (!isLoading && !refreshing && (page.page * page.pageSize) < page?.total) {
            setIsLoading(true)
            getData()
        }
    }


    return (
        <SafeAreaProvider>
            <SafeAreaView style={{backgroundColor: 'rgba(255, 255, 255, 1)',flex: 1}}>
                <View style={styles.container}>
                    <View style={styles.headerTabs}>
                        <View style={styles.header}>
                            <Text style={styles.headerText}>消息(99+)</Text>
                            <Image style={{width:15,height: 15}} src='https://cdn.toodudu.com/uploads/2023/10/20/MasterSlicePNG29b9e38357080f0832c06975dd932928.png'></Image>
                        </View>
                        <View style={styles.tabs}>
                            {operate.current.map((its:{
                                    name:string;
                                    src:string;
                                    link:string;
                                },ids:number) => <View style={styles.tab} key={`ref${ids}`}>
                                        <Image style={{width: 35,height: 35}} src={its.src}></Image>
                                        <Text style={{fontSize: 12,fontWeight: '400' ,marginTop: 10}} numberOfLines={1}>{its.name}</Text>
                                    </View>
                            )}
                        </View>
                    </View>
                    <View style={styles.message}>
                        <View style={styles.messageBox}>
                            <FlatList
                                data={messageListData}
                                keyExtractor={(item, index) => item.room_id.toString()}
                                onEndReachedThreshold={0.1}
                                onEndReached={onEndReachedMessage}
                                refreshControl={
                                    <RefreshControl
                                        refreshing={refreshing}
                                        onRefresh={onRefresh}
                                        tintColor="blue" // 下拉刷新指示器颜色
                                        colors={["blue", "red", "green"]} // 安卓刷新动画颜色
                                    />
                                }
                                ListFooterComponent={() => (
                                    <View style={{ padding: 20 }}>
                                        {(isLoading && messageListData) ? <ActivityIndicator /> : null }
                                    </View>
                                )}
                                renderItem={({ item ,index }) => (
                                    <TouchableOpacity onPress={() => {navigation.navigate('Chat', {
                                        roomId: item.room_id
                                    })}}>
                                        <View style={[styles.messageList, messageListData.length - 1 === index && styles.messageListLast ]}>
                                            <View style={styles.messageLogo}>
                                                <Image style={{ width: '100%', height: '100%'}} src={item.room_picture}></Image>
                                            </View>
                                            <View style={styles.messageInfomation}>
                                                <View style={styles.messageInfomationHeader}>
                                                    <Text style={styles.messageInfomationTitle} numberOfLines={1}>{item.room_name}</Text>
                                                    <Text style={styles.messageInfomationTime}>08:15</Text>
                                                </View>
                                                <View style={styles.messageInfomationCeek}>
                                                    <Text style={{fontSize: 12, fontWeight: '400',color: '#999',flex: 1}} numberOfLines={1}>
                                                        { item?.messages ? item.messages[item.messages.length - 1].message : '还没有信息' }
                                                    </Text>
                                                    <View style={styles.messageInfomationBox}>
                                                        <Text style={{fontSize: 10,fontWeight: '400',color: '#fff'}}>12</Text>
                                                    </View>
                                                </View>
                                            </View>
                                        </View>
                                    </TouchableOpacity>
                                )}
                                ListEmptyComponent={
                                    <View><Text style={{fontSize: 16,fontWeight: '400',color: '#999',textAlign:'center',marginTop: 60}}>暂无消息</Text></View>
                                }
                            />
                        </View>
                    </View>
                </View>
            </SafeAreaView>
        </SafeAreaProvider>
    )
}
export default Message
