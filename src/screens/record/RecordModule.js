import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import GestureRecognizer from 'react-native-swipe-gestures';
import axios from 'axios';
import { useTTS } from '../../components/TTSContext';
import { Audio } from 'expo-av';
import { Ionicons } from '@expo/vector-icons';
import * as FileSystem from 'expo-file-system';

const RecordModule = ({ navigation }) => {
    const { speech } = useTTS();
    const [recording, setRecording] = useState(null);
    const [isListening, setIsListening] = useState(false);
    const previousTouchTimeRef = useRef(null);
    const index = useRef(1);

    useEffect(() => {
        return () => {
            resetAudioMode();
        };
    }, []);

    // 녹음 시작
    const startRecording = async () => {
        try {
            const permission = await Audio.requestPermissionsAsync();
            if (permission.status === 'granted') {
                await Audio.setAudioModeAsync({
                    allowsRecordingIOS: true,
                    playsInSilentModeIOS: true,
                    shouldDuckAndroid: true,
                    playThroughEarpieceAndroid: false,
                });
                const recording = new Audio.Recording();
                await recording.prepareToRecordAsync(Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY);
                await recording.startAsync();
                setRecording(recording);
                setIsListening(true);
            } else {
                console.log('Permission Denied');
            }
        } catch (error) {
            console.log('Error: ', error);
        }
    };

    // 녹음 종료
    const stopRecording = async () => {
        try {
            await recording.stopAndUnloadAsync();
            const uri = recording.getURI();
            setRecording(null);
            setIsListening(false);
            await resetAudioMode();
            await requestToServer(uri);
            await FileSystem.deleteAsync(uri);
        } 
        catch (error) {
            console.log('Error: ', error);
            if (recording) {
                const uri = recording.getURI();
                await FileSystem.deleteAsync(uri);
            }
            await resetAudioMode();
        }
    };

    // 오디오 설정 초기화
    const resetAudioMode = async () => {
        try {
            await Audio.setAudioModeAsync({
                allowsRecordingIOS: false,
                playsInSilentModeIOS: false,
                shouldDuckAndroid: false,
                playThroughEarpieceAndroid: false,
            });
        } catch (error) {
            console.error(error);
        }
    };

    // 서버로 전송
    const requestToServer = async (uri) => {
        try {
            const url = 'http://218.150.182.161:15555/stt/';
            let body = new FormData();
            const data = {
                uri: uri,
                type: 'audio/m4a',
                name: 'audio.m4a',
            };
            body.append('file', data);

            const response = await axios.post(url, body, {
                headers: { 'Content-Type': 'multipart/form-data', },
            });

            if (response.status === 200) {
                navigation.navigate('ObjectList', { data: response.data });
            }
        }
        catch (error) {
            console.error(error);
            const message = '인식에 실패했습니다.';
            speech(message);
            navigation.navigate('Home');
        }
    };

    // Swipe Gesture 로 탐색할 목록
    const menuList = [
        { name: '뒤로가기', speech: () => speech('뒤로가기'), action: () => navigation.goBack() },
        { name: '점자랑', speech: () => speech('점자랑'), action: () => speech('점자랑') },
        { name: '녹음하기', speech: () => speech('녹음하기'), action: () => recording? stopRecording() : startRecording()},
    ];

    // 터치 이벤트 처리
    const handlePressButton = (name) => {
        const touchedIndex = menuList.findIndex((item) => item.name === name);
        index.current = touchedIndex;
        menuList[touchedIndex].speech();
    };

    // 더블 터치 이벤트 처리
    const handleDoubleTouch = () => {
        const currentTouchTime = Date.now();
        const isDoubleTouched = previousTouchTimeRef.current && currentTouchTime - previousTouchTimeRef.current < 500;

        if (isDoubleTouched) {          
            menuList[index.current].action();
        }

        previousTouchTimeRef.current = currentTouchTime;
    }

    // Left Swipe 이벤트 처리
	const onSwipeLeft = () => {
		index.current = (index.current - 1 + menuList.length) % menuList.length;
		menuList[index.current].speech();
	};

	// Right Swipe 이벤트 처리
	const onSwipeRight = () => {
		index.current = (index.current + 1) % menuList.length;
		menuList[index.current].speech();
	};

    return (
        <GestureRecognizer
            onSwipeLeft={onSwipeLeft}
            onSwipeRight={onSwipeRight}
            config={{
                velocityThreshold: 0.1,
                directionalOffsetThreshold: 80
            }}
            style={{ flex: 1}}>
            <SafeAreaView style={styles.container}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => handlePressButton('뒤로가기')}>
                        <Text style={styles.headerButton}>Back</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => handlePressButton('점자랑')}>
                        <Text style={styles.headerTitle}>점자랑</Text>
                    </TouchableOpacity>
                    <View style={styles.menuPlaceHolder}></View>
                </View>
                <TouchableOpacity style={styles.content} onPress={handleDoubleTouch} activeOpacity={1}>
                    <TouchableOpacity onPress={() => handlePressButton('녹음하기')}>
                        <Ionicons name="mic" size={250} color={isListening ? 'red' : 'black'} />
                    </TouchableOpacity>
                </TouchableOpacity>
            </SafeAreaView>
        </GestureRecognizer>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    header: {
        flexDirection: 'row',
    	justifyContent: 'space-between',
    	alignItems: 'center',
    	backgroundColor: '#000',
    	paddingHorizontal: 15,
    	paddingVertical: 15,
    },
    headerButton: {
        color: '#fff',
        fontSize: 18,
    },
    headerTitle: {
        color: '#fff',
        fontSize: 26,
        fontWeight: 'bold',
    },
    menuPlaceHolder: {
        width: 38,
    },
    content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default RecordModule;