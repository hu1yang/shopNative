import React from 'react';
import { View , Text ,Button } from "react-native";
import {RootStackNavigation} from "@/router/NestingNavigators";


const Home = ({navigation}:{
    navigation:RootStackNavigation
}) => {
    return (
        <View>
            <Text>Home111</Text>
            <Text>Home111</Text>
            <Text>Home111</Text>
            <Text>Home111</Text>
            <Button
                title="Go to Details"
                onPress={() => navigation.navigate('Good',{
                    id:1
                })}
            />
        </View>
    )
}
export default Home
