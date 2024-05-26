import AsyncStorage from '@react-native-async-storage/async-storage';

export const saveData = async (data) => {
    try {
        for (let i = 0; i < data.length; i++) {
            const keys = await AsyncStorage.getAllKeys();
            if (!keys.includes(data[i].word)) {
                await AsyncStorage.setItem(data[i].word, JSON.stringify(data[i].braille));
            }
        }
    }
    catch (error) {
        console.error(error);
    }
};

export const loadData = async () => {
    try {
        const keys = await AsyncStorage.getAllKeys();
        const values = await AsyncStorage.multiGet(keys);

        let data = [];
        for (let i = 0; i < keys.length; i++) {
            if (keys[i] === "rate" || keys[i] === "usage") continue;
            const word = keys[i];
            const brailleList = JSON.parse(values[i][1]);
            data.push({ word: word, braille: brailleList });
        }
        data.sort((a, b) => a.word.localeCompare(b.word));
        return data;
    }
    catch (error) {
        console.error(error);
    }
};