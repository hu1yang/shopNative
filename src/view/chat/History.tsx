import React, { useState } from 'react';
import { View, TextInput, Button, FlatList, Text, TouchableOpacity, StyleSheet, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import {optionMessageProp} from "@/types/message";

// 假设这是聊天数据的初始状态
const initialMessages = [
    { id: '1', text: 'Hello!', sender: 'User' },
    { id: '2', text: 'Hi there!', sender: 'Friend' },
    { id: '3', text: 'How are you?', sender: 'User' },
    { id: '4', text: 'I\'m good, thanks!', sender: 'Friend' },
];

const History = ({messageList}:{messageList:optionMessageProp}) => {

    return (
        <>
            <FlatList
                data={messageList}
                contentContainerStyle={styles.container}
                renderItem={({ item }) => (
                    <View key={item.createBy} style={[styles.messageContainer, item.sendInfo.id === 1 ? styles.userMessage : styles.friendMessage]}>
                        <Text style={styles.messageText}>{item.message}</Text>
                    </View>
                )}
                keyExtractor={(item) => item.id}
                inverted // 反向显示消息（最新消息在底部）
            />
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        justifyContent: 'flex-end',
    },
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

export default History;
