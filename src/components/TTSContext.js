import React, { createContext, useContext, useState, useEffect } from 'react';
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
            voice: "com.apple.voice.compact.ko-KR.Yuna",
            rate: customRate || rate.value,
            pitch: pitch,
        };
        Speech.speak(message, options);
    }

    return (
        <TTSContext.Provider value={{ rate, updateRate, speech }}>
            {children}
        </TTSContext.Provider>
    );
};