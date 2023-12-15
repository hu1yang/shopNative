import React, { useEffect, useRef , useState , useCallback } from "react";
import {
    View,
    Text,
    StyleSheet,
    Image,
    SafeAreaView,
    ScrollView,
    Dimensions,
    NativeModules,
    StatusBar,
    Platform,
    PixelRatio,
    RefreshControl,
    FlatList,
    ActivityIndicator
} from "react-native";

const { StatusBarManager } = NativeModules;

const WINDOW_DIMENSIONS = Dimensions.get('window');
const WINDOW_HEIGHT = WINDOW_DIMENSIONS.height;
const STATUS_BAR_HEIGHT =
    Platform.OS === 'android' ? StatusBar.currentHeight : StatusBarManager.HEIGHT;
const pixelRatio = PixelRatio.get();

const styles = StyleSheet.create({
    container:{
        width: '100%',
        height: '100%',
        overflow: 'hidden',
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
        height: WINDOW_HEIGHT-STATUS_BAR_HEIGHT-44-95-98,
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
        fontWeight: 400,
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
        flexWrap: 0,
        padding: 2
    }
})

const Message = () => {
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
    const [messageListData, setMessageListData] = useState<{
        src:string,
        title:string,
        message:string,
        number:string
    }[]>([]);

    useEffect(() => {
        loadData()
    },[])

    const loadData = () => {
        let data = [
            {
                src:'https://cdn.ibisaas.com/2021/05/17/iHdsD8WEqIenINxCdaSssUzWL7vtQCtc2MghanSc.png',
                title:'涂多多自营旗舰店',
                message:'最后一条聊天内容最后一条聊天内容最后一条聊天内容最后一条聊天内容最后一条聊天内容最后一条聊天内容',
                number:'99+'
            },
            {
                src:'https://cdn.ibisaas.com/2021/05/17/iHdsD8WEqIenINxCdaSssUzWL7vtQCtc2MghanSc.png',
                title:'涂多多自营旗舰店',
                message:'最后一条聊天内容最后一条聊天内容最后一条聊天内容最后一条聊天内容最后一条聊天内容最后一条聊天内容',
                number:'99+'
            },
            {
                src:'https://cdn.ibisaas.com/2021/05/17/iHdsD8WEqIenINxCdaSssUzWL7vtQCtc2MghanSc.png',
                title:'涂多多自营旗舰店',
                message:'最后一条聊天内容最后一条聊天内容最后一条聊天内容最后一条聊天内容最后一条聊天内容最后一条聊天内容',
                number:'99+'
            },
            {
                src:'https://cdn.ibisaas.com/2021/05/17/iHdsD8WEqIenINxCdaSssUzWL7vtQCtc2MghanSc.png',
                title:'涂多多自营旗舰店',
                message:'最后一条聊天内容最后一条聊天内容最后一条聊天内容最后一条聊天内容最后一条聊天内容最后一条聊天内容',
                number:'99+'
            },
            {
                src:'https://cdn.ibisaas.com/2021/05/17/iHdsD8WEqIenINxCdaSssUzWL7vtQCtc2MghanSc.png',
                title:'涂多多自营旗舰店',
                message:'最后一条聊天内容最后一条聊天内容最后一条聊天内容最后一条聊天内容最后一条聊天内容最后一条聊天内容',
                number:'99+'
            },
            {
                src:'https://cdn.ibisaas.com/2021/05/17/iHdsD8WEqIenINxCdaSssUzWL7vtQCtc2MghanSc.png',
                title:'涂多多自营旗舰店',
                message:'最后一条聊天内容最后一条聊天内容最后一条聊天内容最后一条聊天内容最后一条聊天内容最后一条聊天内容',
                number:'99+'
            },
            {
                src:'https://cdn.ibisaas.com/2021/05/17/iHdsD8WEqIenINxCdaSssUzWL7vtQCtc2MghanSc.png',
                title:'涂多多自营旗舰店',
                message:'最后一条聊天内容最后一条聊天内容最后一条聊天内容最后一条聊天内容最后一条聊天内容最后一条聊天内容',
                number:'99+'
            },
            {
                src:'https://cdn.ibisaas.com/2021/05/17/iHdsD8WEqIenINxCdaSssUzWL7vtQCtc2MghanSc.png',
                title:'涂多多自营旗舰店',
                message:'最后一条聊天内容最后一条聊天内容最后一条聊天内容最后一条聊天内容最后一条聊天内容最后一条聊天内容',
                number:'99+'
            },
            {
                src:'https://cdn.ibisaas.com/2021/05/17/iHdsD8WEqIenINxCdaSssUzWL7vtQCtc2MghanSc.png',
                title:'涂多多自营旗舰店',
                message:'最后一条聊天内容最后一条聊天内容最后一条聊天内容最后一条聊天内容最后一条聊天内容最后一条聊天内容',
                number:'99+'
            },
            {
                src:'https://cdn.ibisaas.com/2021/05/17/iHdsD8WEqIenINxCdaSssUzWL7vtQCtc2MghanSc.png',
                title:'涂多多自营旗舰店',
                message:'最后一条聊天内容最后一条聊天内容最后一条聊天内容最后一条聊天内容最后一条聊天内容最后一条聊天内容',
                number:'99+'
            },
        ]
        setMessageListData((prevState) => [
            ...prevState,
            ...data
        ])
        setRefreshing(false);
        setIsLoading(false);
    }
    const onRefresh =  () => {
        setRefreshing(true);
        setIsLoading(true);
        setMessageListData([])
        setTimeout(() => {
            loadData()
        }, 2000); // 假设刷新操作需要2秒完成
    }
    const onEndReachedMessage = () => {
        console.log(isLoading , refreshing);
        if (!isLoading && !refreshing) {
            setIsLoading(true)
            setTimeout(() => {
                loadData()
            },2000)
        }
    }


    return (
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
                                    <Text style={{fontSize: 12,fontWeight: 400,fontSize: 13 ,marginTop: 10}} numberOfLines={1}>{its.name}</Text>
                                </View>
                        )}
                    </View>
                </View>
                <View style={styles.message}>
                    <View style={styles.messageBox}>
                        <FlatList
                            data={messageListData}
                            keyExtractor={(item, index) => index.toString()}
                            onEndReachedThreshold={0.1}
                            onEndReached={onEndReachedMessage}
                            refreshing={refreshing}
                            onRefresh={onRefresh}
                            ListFooterComponent={() => (
                                <View style={{ padding: 20 }}>
                                    {isLoading && <ActivityIndicator />}
                                </View>
                            )}
                            renderItem={({ item }) => (
                                <View style={styles.messageList}>
                                    <View style={styles.messageLogo}>
                                        <Image style={{ width: '100%', height: '100%'}} src={item.src}></Image>
                                    </View>
                                    <View style={styles.messageInfomation}>
                                        <View style={styles.messageInfomationHeader}>
                                            <Text style={styles.messageInfomationTitle} numberOfLines={1}>{item.title}</Text>
                                            <Text style={styles.messageInfomationTime}>08:15</Text>
                                        </View>
                                        <View style={styles.messageInfomationCeek}>
                                            <Text style={{fontSize: 12, fontWeight: 400,color: '#999',flex: 1}} numberOfLines={1}>{item.message}</Text>
                                            <View style={styles.messageInfomationBox}>
                                                <Text style={{fontSize: 10,fontWeight: 400,color: '#fff'}}>{item.number}</Text>
                                            </View>
                                        </View>
                                    </View>
                                </View>
                            )}
                            />
                        {/*<ScrollView contentContainerStyle={styles.scrollBox} refreshControl={*/}
                        {/*    <RefreshControl*/}
                        {/*        refreshing={refreshing}*/}
                        {/*        onRefresh={onRefresh}*/}
                        {/*        title="下拉刷新"*/}
                        {/*        colors={['#0087d1']} // 刷新指示器的颜色（Android）*/}
                        {/*        tintColor="#0087d1" // 刷新指示器的颜色（iOS）*/}
                        {/*        titleColor="#0087d1" // 刷新指示器标题的颜色（iOS）*/}
                        {/*    />*/}
                        {/*}>*/}
                        {/*    {*/}
                        {/*        messageListData.map((its,ids) => (*/}
                        {/*            <View style={styles.messageList} key={`message${ids}`}>*/}
                        {/*                <View style={styles.messageLogo}>*/}
                        {/*                    <Image style={{ width: '100%', height: '100%'}} src={its.src}></Image>*/}
                        {/*                </View>*/}
                        {/*                <View style={styles.messageInfomation}>*/}
                        {/*                    <View style={styles.messageInfomationHeader}>*/}
                        {/*                        <Text style={styles.messageInfomationTitle} numberOfLines={1}>{its.title}</Text>*/}
                        {/*                        <Text style={styles.messageInfomationTime}>08:15</Text>*/}
                        {/*                    </View>*/}
                        {/*                    <View style={styles.messageInfomationCeek}>*/}
                        {/*                        <Text style={{fontSize: 12, fontWeight: 400,color: '#999',flex: 1}} numberOfLines={1}>{its.message}</Text>*/}
                        {/*                        <View style={styles.messageInfomationBox}>*/}
                        {/*                            <Text style={{fontSize: 10,fontWeight: 400,color: '#fff'}}>{its.number}</Text>*/}
                        {/*                        </View>*/}
                        {/*                    </View>*/}
                        {/*                </View>*/}
                        {/*            </View>*/}
                        {/*        ))*/}
                        {/*    }*/}
                        {/*</ScrollView>*/}
                    </View>
                </View>
            </View>
    </SafeAreaView>
    )
}
export default Message
