import {memo} from 'react'
import {View, StyleSheet, Text, TextInput} from 'react-native';
import {Button} from '@rneui/themed';

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputContainer: {
        width: 33,
        height: 17,
        borderRadius:2,
        fontSize:10,
        backgroundColor: '#F7F7F7',
        textAlign:'center'
    },
    button: {
    },
});
type IProp = {
    quantity:number;
    changeQuantity:({value,filed}:{
        value: number;
        filed: string;
    }) => void
}

export default memo(({quantity,changeQuantity}:IProp) => {
    console.log('add')
    return (
        <View style={styles.container}>
            <Button
                title="-"
                type="clear"
                onPress={() => changeQuantity({value:quantity -1, filed:'unit'})}
                buttonStyle={styles.button}
            />
            <TextInput
                value={quantity.toString()}
                keyboardType="numeric"
                style={styles.inputContainer}
                onChangeText={(value) => changeQuantity({value:Number(value),filed:'unit'})}
            />
            <Button
                title="+"
                type="clear"
                onPress={() => changeQuantity({value:quantity + 1,filed:'unit'})}
                buttonStyle={styles.button}
            />
        </View>
    )
})
