import React, { createContext, useContext, useState, useEffect } from 'react';
import { Platform } from 'react-native';
import * as Speech from 'expo-speech';
import AsyncStorage from '@react-native-async-storage/async-storage';

const TTSContext = createContext();

export const useTTS = () => useContext(TTSContext);

export const TTSProvider = ({ children }) => {
    const [rate, setRate] = useState({
        value: 1.4,
    });

    useEffect(() => {
        const loadRate = async () => {
            const savedRate = await AsyncStorage.getItem('rate');
            if (savedRate) {
                setRate(JSON.parse(savedRate));
            }
        };
        loadRate();
    }, []);

    const updateRate = async (newRate) => {
        setRate(newRate);
        await AsyncStorage.setItem('rate', JSON.stringify(newRate));
    };

    const speech = (message, customRate, pitch) => {
        Speech.stop();
        const options = {
            rate: customRate || rate.value,
            pitch: pitch || 1.0,
        };

        if (Platform.OS === 'ios') {
            options.voice = "com.apple.voice.compact.ko-KR.Yuna";
        }
        if (Platform.OS === 'android') {
            options.language = 'ko-KR';
            options.voice = "ko_kr_standart_b";
        }

        Speech.speak(message, options);
    };

    return (
        <TTSContext.Provider value={{ rate, updateRate, speech }}>
            {children}
        </TTSContext.Provider>
    );
};