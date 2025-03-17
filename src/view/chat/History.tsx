import React, { useState } from 'react';
import { View, TextInput, Button, FlatList, Text, TouchableOpacity, StyleSheet, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import {optionMessageProp} from "@/types/message";


const Item = ({item}:{item:optionMessageProp}) => {
    return (
        <View key={item.createBy} style={[styles.messageContainer, item.sendInfo.id === 1 ? styles.userMessage : styles.friendMessage]}>
            <Text style={styles.messageText}>{item.message}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    messageContainer: {
        maxWidth: '80%',
        padding: 10,
        borderRadius: 10,
        marginBottom: 10,
    },
    userMessage: {
        backgroundColor: '#DCF8C6',
        alignSelf: 'flex-end',
    },
    friendMessage: {
        backgroundColor: '#E5E5E5',
        alignSelf: 'flex-start',
    },
    messageText: {
        fontSize: 16,
        color: '#333',
    },

});

export default Item;
