import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import GestureRecognizer from 'react-native-swipe-gestures';
import { useTTS } from '../../components/TTSContext';
import { Audio } from 'expo-av';
import { Ionicons } from '@expo/vector-icons';

const RecordModule = ({ navigation }) => {
    const { speech } = useTTS();
    const [recording, setRecording] = useState(null);
    const [isListening, setIsListening] = useState(false);
    const previousTouchTimeRef = useRef(null);
    const index = useRef(1);

    useEffect(() => {
        return () => {
            Audio.setAudioModeAsync({
                allowsRecordingIOS: false,
                playsInSilentModeIOS: false,
                shouldDuckAndroid: false,
                playThroughEarpieceAndroid: false,
            });
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
            console.log('Recording URI: ', uri);
            setRecording(null);
            setIsListening(false);
            await Audio.setAudioModeAsync({
                allowsRecordingIOS: false,
                playsInSilentModeIOS: false,
                shouldDuckAndroid: false,
                playThroughEarpieceAndroid: false,
            });

            playAudio(uri);
        } catch (error) {
            console.log('Error: ', error);
        }
    };

    // uri를 통해 재생을 하고싶다면 사용
    const playAudio = async (uri) => {
        try {
            const { sound } = await Audio.Sound.createAsync({ uri });
            await sound.playAsync();
            console.log('Playing Sound');
        } catch (error) {
            console.log('Error: ', error);
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