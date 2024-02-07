import React from 'react';
import { View , Text ,Button } from "react-native";


const Home = ({navigation}) => {
    return (
        <View>
            <Text>Home111</Text>
            <Text>Home111</Text>
            <Text>Home111</Text>
            <Text>Home111</Text>
            <Button
                title="Go to Details"
                onPress={() => navigation.navigate('Good')}
            />
        </View>
    )
}
export default Home
