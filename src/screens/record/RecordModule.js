import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, ActivityIndicator } from 'react-native';
import GestureRecognizer from 'react-native-swipe-gestures';
import axios from 'axios';
import { useTTS } from '../../components/TTSContext';
import { Audio, InterruptionModeIOS } from 'expo-av';
import { Ionicons } from '@expo/vector-icons';
import * as FileSystem from 'expo-file-system';
import AsyncStorage from '@react-native-async-storage/async-storage';

const RecordModule = ({ navigation }) => {
    const { speech } = useTTS();
    const [recording, setRecording] = useState(null);
    const [isListening, setIsListening] = useState(false);
    const previousTouchTimeRef = useRef(null);
    const index = useRef(1);
    const useCount = useRef(0);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadUsage();
        const message = '녹음하기 버튼을 두번 터치하면 녹음을 시작합니다. 원하는 단어를 점자로 변환해보세요.';
        speech(message);
        return () => {
            Audio.setAudioModeAsync({
                allowsRecordingIOS: false,
                playsInSilentModeIOS: false,
                shouldDuckAndroid: false,
                playThroughEarpieceAndroid: false,
            });
        };
    }, []);

    // 사용량 불러오기
    const loadUsage = async () => {
        try {
            const usage = await AsyncStorage.getItem('usage');
            if (usage) {
                useCount.current = parseInt(usage);
            }
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    // 사용량 저장
    const saveUsage = async () => {
        try {
            useCount.current += 1;
            await AsyncStorage.setItem('usage', useCount.current.toString());
        } catch (error) {
            console.error(error);
        }
    };

    // 녹음 시작
    const startRecording = async () => {
        try {
            if (useCount.current < 10) {
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
            }
            else {
                const message = '무료사용가능 횟수를 초과했습니다. 다음 달에 초기화됩니다.';
                speech(message);
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
            await Audio.setAudioModeAsync({
                allowsRecordingIOS: false,
                playsInSilentModeIOS: false,
                shouldDuckAndroid: false,
                playThroughEarpieceAndroid: false,
            });

            requestToServer(uri);
        } 
        catch (error) {
            console.log('Error: ', error);
        }
    };

    // 서버로 전송
    const requestToServer = async (uri) => {
        try {
            // 오디오 초기화를 위한 의미없는 소리 재생
            const soundObject = new Audio.Sound();
            await soundObject.loadAsync(require('../../assets/sounds/ping.mp3'));
            await soundObject.setVolumeAsync(0);
            await soundObject.playAsync();
            
            const message = '인식 중입니다. 잠시만 기다려주세요.';
            speech(message);

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
                await saveUsage();
                navigation.navigate('ObjectList', { data: response.data });
            }
            if (response.status === 202 && response.data === "EMPTY") {
                const message = '인식된 결과가 없습니다. 다시 시도해주세요.';
                speech(message);
            }
            if (response.status === 202 && response.data === "EN") {
                const message = '현재는 영어를 지원하지 않습니다. 다시 시도해주세요.';
                speech(message);
            }
        }
        catch (error) {
            console.error(error);
            const message = '인식에 실패했습니다.';
            speech(message);
            navigation.navigate('Home');
        }
        finally {
            await FileSystem.deleteAsync(uri);
        }
    };

    // Swipe Gesture 로 탐색할 목록
    const menuList = [
        { name: '뒤로가기', speech: () => speech('뒤로가기'), action: () => navigation.goBack() },
        { name: '점자랑', speech: () => speech('점자랑'), action: () => speech('점자랑') },
        { name: '녹음하기', speech: () => speech('녹음하기'), action: () => recording? stopRecording() : startRecording()},
        { name: '사용량', speech: () => speech(`무료사용가능 횟수는 ${10-useCount.current}회입니다.`), action: () => speech(`무료사용가능 횟수는 ${10-useCount.current}회입니다.`) }
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
                    {loading ? (
                        <ActivityIndicator size="large" color="#0000ff" />
                    ) : (
                        <TouchableOpacity onPress={() => handlePressButton('사용량')}>
                            <Text style={styles.usage}>무료 사용 가능 횟수: {10-useCount.current}회</Text>
                        </TouchableOpacity>
                    )}
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
    usage: {
        fontSize: 16,
        color: 'gray',
        marginTop: 40,
        textDecorationLine: 'underline',
    }
});

export default RecordModule;