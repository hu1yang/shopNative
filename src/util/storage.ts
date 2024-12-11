import EncryptedStorage from 'react-native-encrypted-storage';

export default class EncryptedStorageUtil {
    /**
     * 保存数据到 EncryptedStorage
     * @param name 存储的键名
     * @param data 要存储的数据，可以是对象或字符串
     * @returns Promise<void>
     */
    static async setItem<T>(name: string, data: T): Promise<void> {
        try {
            const value = typeof data === 'string' ? data : JSON.stringify(data);
            await EncryptedStorage.setItem(name, value);
        } catch (error) {
            console.error(`[EncryptedStorage] Failed to store data for key "${name}":`, error);
            throw error;
        }
    }

    /**
     * 获取数据
     * @param name 存储的键名
     * @returns Promise<T | null>
     */
    static async getItem<T>(name: string): Promise<T | null> {
        try {
            const value = await EncryptedStorage.getItem(name);
            if (value) {
                return JSON.parse(value) as T;
            } else {
                return null;
            }
        } catch (error) {
            console.error(`[EncryptedStorage] Failed to retrieve data for key "${name}":`, error);
            throw error;
        }
    }

    /**
     * 删除数据
     * @param name 存储的键名
     * @returns Promise<void>
     */
    static async removeItem(name: string): Promise<void> {
        try {
            await EncryptedStorage.removeItem(name);
        } catch (error) {
            console.error(`[EncryptedStorage] Failed to remove data for key "${name}":`, error);
            throw error;
        }
    }

    /**
     * 清除所有数据
     * @returns Promise<void>
     */
    static async clearAll(): Promise<void> {
        try {
            await EncryptedStorage.clear();
        } catch (error) {
            console.error(`[EncryptedStorage] Failed to clear all data:`, error);
            throw error;
        }
    }
}
