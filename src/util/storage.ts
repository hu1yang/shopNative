import AsyncStorage from '@react-native-async-storage/async-storage';
//
// // 存储数据函数
export const storeData = async <T>(key: string, data: T): Promise<void> => {
    try {
        const jsonData = JSON.stringify(data);
        await AsyncStorage.setItem(key, jsonData);
        // console.log(`${key} stored successfully.`);
    } catch (error) {
        console.error(`Failed to store ${key}:`, error);
    }
};
//
// 获取数据函数
export const getData = async <T>(key: string): Promise<T | null> => {

    try {
        const jsonData = await AsyncStorage.getItem(key);
        if (jsonData) {
            return JSON.parse(jsonData) as T;
        } else {
            console.log(`${key} not found.`);
            return null;
        }
    } catch (error) {
        console.error(`Failed to retrieve ${key}:`, error);
        return null;
    }
};

// 删除数据函数
export const removeData = async (key: string): Promise<void> => {
    try {
        await AsyncStorage.removeItem(key);
        console.log(`${key} removed successfully.`);
    } catch (error) {
        console.error(`Failed to remove ${key}:`, error);
    }
};
