import React, { useState, useEffect, useRef } from 'react';
import { View, PanResponder, Dimensions, StyleSheet, Text, TouchableWithoutFeedback } from 'react-native';
import * as Haptics from 'expo-haptics';
import { Audio } from 'expo-av';
import * as Speech from 'expo-speech';

const BrailleReader = ({ category, brailleSymbols, brailleList }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [currentBraille, setCurrentBraille] = useState(0);
    const [move, setMove] = useState(0);
    const currentIndexRef = useRef(currentIndex);
    const currentBrailleRef = useRef(currentBraille);
    const moveRef = useRef(move);
    const lastTouch = useRef({ x: null, y: null }); // 마지막 터치 좌표
    var isFirst = true;

    useEffect(() => {
        currentIndexRef.current = currentIndex;
        currentBrailleRef.current = currentBraille;
        moveRef.current = move;
    }, [currentIndex, currentBraille, move]);

    const tts_information = () => {
        const text = `현재 읽고있는 점자는 ${category} ${brailleSymbols[currentBrailleRef.current]} 입니다.`;
        const options = {
            voice: "com.apple.voice.compact.ko-KR.Yuna",
            rate: 1.4
        };
        Speech.speak(text, options);
    };

    useEffect(() => {
        tts_information();
    }, [currentBraille]);

    function tts_dot() {
        const text = `${(currentIndexRef.current % 6) + 1}점`;
        const options = {
            voice: "com.apple.voice.compact.ko-KR.Yuna",
            rate: 1.5
        };
        Speech.speak(text, options);
    }

    // PanResponder 초기화
    const panResponder = useRef(
        PanResponder.create({
            onStartShouldSetPanResponder: () => true,
            onMoveShouldSetPanResponder: () => true,
            onPanResponderGrant: (evt) => {
                console.log('Touch granted');
                const { pageX, pageY } = evt.nativeEvent;
                lastTouch.current = { x: pageX, y: pageY }; // 터치 시작 시 이전 좌표를 초기화합니다.
                setMove(0);
                if (brailleList[currentBrailleRef.current][currentIndexRef.current] === 1) {
                    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
                    tts_dot();
                }
                currentIndexRef.current = (currentIndexRef.current + 1) % brailleList[currentBraille].length;
                setCurrentIndex(currentIndexRef.current);
                isFirst = true;
            },
            onPanResponderMove: (evt, gestureState) => {
                const { moveX, moveY } = gestureState;
      
                // 이전 터치 좌표와 현재 터치 좌표 간의 유클리드 거리를 계산합니다.
                const distanceMoved = Math.sqrt(Math.pow(moveX - lastTouch.current.x, 2) + Math.pow(moveY - lastTouch.current.y, 2));
                const MIN_MOVE_DISTANCE = 30; // 최소 이동 거리를 설정합니다.
        
                // 사운드를 재생하는 함수
                async function playSound() {
                    const soundObject = new Audio.Sound();
                    try {
                        await soundObject.loadAsync(require('../assets/sounds/ping.mp3'));
                        await soundObject.playAsync();
                    } catch (error) {
                        console.error(error);
                    }
                }

                async function finishSound() {
                    const soundObject = new Audio.Sound();
                    try {
                        await soundObject.loadAsync(require('../assets/sounds/finish.mp3'));
                        await soundObject.playAsync();
                    } catch (error) {
                        console.error(error);
                    }
                }
                
                // 이동 거리가 MIN_MOVE_DISTANCE보다 클 경우에만 다음 인덱스로 이동하고 햅틱 피드백을 발생시킵니다.
                if (distanceMoved > MIN_MOVE_DISTANCE) {
                    console.log('Touch moved');
                    if(moveRef.current < 2) {
                        moveRef.current = moveRef.current + 1;
                        console.log(`Current Braile: ${currentBrailleRef.current}, Current index: ${currentIndexRef.current}`);
                        if (brailleList[currentBrailleRef.current][currentIndexRef.current] === 1) {
                            Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
                            tts_dot();
                        }
                        const nextIndex = (currentIndexRef.current + 1) % brailleList[currentBrailleRef.current].length;
                        console.log(brailleList[currentBrailleRef.current].length);
                        setCurrentIndex(nextIndex);
                        setMove(moveRef.current);
                        
                        if (currentBrailleRef.current === brailleList.length - 1 && currentIndexRef.current === brailleList[currentBrailleRef.current].length - 1) {
                            finishSound();
                        }
                    } else {
                        if (isFirst) { 
                            playSound();
                            isFirst = false
                        }            
                    }
                    // 현재 터치 좌표를 이전 터치 좌표로 업데이트합니다.
                    lastTouch.current = { x: moveX, y: moveY };
                }
            },
        })
    ).current;

    // 화면 상단 터치 이벤트 처리
    const handleTopTouch = (evt) => {
        const { locationX } = evt.nativeEvent;
        const width = Dimensions.get('window').width;
        console.log(locationX);
        console.log('width/2: ', width/2);

        if (locationX > width / 2) {
            currentBrailleRef.current = (currentBrailleRef.current + 1) % brailleList.length;
        } else {
            if (currentBrailleRef.current - 1 >= 0) {
                currentBrailleRef.current = (currentBrailleRef.current - 1) % brailleList.length;
            }
        }
        setCurrentBraille(currentBrailleRef.current);
        setCurrentIndex(0);
    }

    return (
        <View style={styles.container}>
            { /* Top 1/3 */}
            <TouchableWithoutFeedback onPress={handleTopTouch}>
                <View style={styles.topOneThirds}>
                    <Text style={styles.textStyle}>{brailleSymbols[currentBrailleRef.current]}</Text>
                </View>
            </TouchableWithoutFeedback>

            { /* Bottom 2/3 */}
            <View {...panResponder.panHandlers} style={styles.bottomTwoThirds}>
                {[...Array(6)].map((_, index) => (
                    <View key={index} style={styles.circleContainer}>
                        <View style={styles.circle} />
                    </View>
                ))}
            </View>
        </View>
    );
};

const { height } = Dimensions.get('window');

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    topOneThirds: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    textStyle: {
        fontSize: 36,
        fontWeight: 'bold',
        marginTop: 100,
    },
    bottomTwoThirds: {
        flex: 2,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
    },
    circleContainer: {
        width: '50%',
        height: '33.3%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    circle: {
        width: 80,
        height: 80,
        borderRadius: 50,
        backgroundColor: 'black',
    },
});

export default BrailleReader;