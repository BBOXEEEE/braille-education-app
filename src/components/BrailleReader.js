import React, { useState, useEffect, useRef } from 'react';
import { View, PanResponder, Dimensions, StyleSheet, Text, TouchableWithoutFeedback } from 'react-native';
import * as Haptics from 'expo-haptics';
import { Audio } from 'expo-av';
import * as Speech from 'expo-speech';

// 화면 영역 분할
const window = Dimensions.get('window');
const width = window.width;
const top = window.height / 3;
const bottom = window.height * 2 / 3;

// 점자 영역 설정
const points = [
    {
      x: 0,
      y: top,
      width: width / 2,
      height: bottom / 3,
    },
    {
      x: 0,
      y: top + bottom / 3,
      width: width / 2,
      height: bottom / 3,
    },
    {
      x: 0,
      y: top + bottom * 2 / 3,
      width: width / 2,
      height: bottom / 3,
    },
    {
      x: width / 2,
      y: top,
      width: width / 2,
      height: bottom / 3,
    },
    {
      x: width / 2,
      y: top + bottom / 3,
      width: width / 2,
      height: bottom / 3,
    },
    {
      x: width / 2,
      y: top + bottom * 2 / 3,
      width: width / 2,
      height: bottom / 3,
    },
  ];

const getTouchedAreaIndex = (touchX, touchY) => {
    const index = points.findIndex((point) =>
        touchX >= point.x && touchX <= point.x + point.width
        && touchY >= point.y && touchY <= point.y + point.height
    );
    return index;
};

const BrailleReader = ({ category, brailleSymbols, brailleList }) => {
    const [currentBraille, setCurrentBraille] = useState(0);
    const [touchIndex, setTouchIndex] = useState(-1);
    const [previousTouchTime, setPreviousTouchTime] = useState(null);
    const currentBrailleRef = useRef(currentBraille);
    const touchIndexRef = useRef(touchIndex);
    const previousTouchTimeRef = useRef(null);

    useEffect(() => {
        currentBrailleRef.current = currentBraille;
        touchIndexRef.current = touchIndex;
        previousTouchTimeRef.current = previousTouchTime;
    }, [currentBraille, touchIndex, previousTouchTime]);

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

    function tts_dot(index) {
        if (index === -1) return;
        const text = `${index+1}점`;
        const options = {
            voice: "com.apple.voice.compact.ko-KR.Yuna",
            rate: 1.5
        };
        if (brailleList[currentBrailleRef.current][index] === 1) {
            options.pitch = 1.5;
        }
        Speech.speak(text, options);
    };

    useEffect(() => {
        tts_dot(touchIndex);
    }, [touchIndex]);

    // PanResponder 초기화
    const panResponder = useRef(
        PanResponder.create({
            onStartShouldSetPanResponder: () => true,
            onMoveShouldSetPanResponder: () => true,
            onPanResponderGrant: (evt) => {
                const currentTouchTime = Date.now();
                const touch = evt.nativeEvent.touches;
                if (touch[0].pageY < top) {
                    const isDoubleTouched = (previousTouchTimeRef.current) && (currentTouchTime - previousTouchTimeRef.current) < 300;
                    if (isDoubleTouched) {
                        handleDoubleTouch(touch[0].pageX);
                    }
                    else {
                        handleTouch(touch[0].pageX);
                    }
                    previousTouchTimeRef.current = currentTouchTime;
                    setPreviousTouchTime(previousTouchTimeRef.current);
                }
            },
            onPanResponderMove: (evt) => {
                const touches = evt.nativeEvent.touches;
                
                touches.forEach((touch) => {
                    touchIndexRef.current = getTouchedAreaIndex(touch.pageX, touch.pageY);
                    setTouchIndex(touchIndexRef.current);

                    // 해당 영역의 brailleList 값이 1일 경우 햅틱 피드백
                    if (brailleList[currentBrailleRef.current][touchIndexRef.current] === 1) {
                        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
                    }
                });
            },
        })
    ).current;
    
    // 화면 상단 터치 이벤트 처리
    const handleTouch = (touch) => {
        console.log('handleTouch!');
        const threshold = width / 3;

        // 화면 상단 좌측 : 이전 버튼 TTS
        if (touch <= threshold) {
            const text = `이전`;
            const options = {
                voice: "com.apple.voice.compact.ko-KR.Yuna",
                rate: 1.4
            };
            Speech.speak(text, options);
        }
        // 화면 상단 중앙 : 묵자 TTS
        else if (touch > threshold && touch < 2 * threshold) {
            const text = `${brailleSymbols[currentBrailleRef.current]}`;
            const options = {
                voice: "com.apple.voice.compact.ko-KR.Yuna",
                rate: 1.4
            };
            Speech.speak(text, options);
        }
        // 화면 상단 우측 : 다음 버튼 TTS
        else {
            const text = `다음`;
            const options = {
                voice: "com.apple.voice.compact.ko-KR.Yuna",
                rate: 1.4
            };
            Speech.speak(text, options);
        }
    };

    // 화면 상단 더블 터치 이벤트 처리
    const handleDoubleTouch = (touch) => {
        console.log('handleDoubleTouch!');
        const threshold = width / 3;

        // 화면 상단 좌측 : 이전 버튼
        if (touch <= threshold) {
            if (currentBrailleRef.current - 1 >= 0) currentBrailleRef.current -= 1;
            else currentBrailleRef.current = brailleList.length - 1;
        }
        // 화면 상단 중앙 : 묵자
        else if (touch > threshold && touch < 2 * threshold) {
            const text = `현재 읽고있는 점자는 ${category} ${brailleSymbols[currentBrailleRef.current]} 입니다.`;
            const options = {
                voice: "com.apple.voice.compact.ko-KR.Yuna",
                rate: 1.4
            };
            Speech.speak(text, options);
        }
        // 화면 상단 우측 : 다음 버튼
        else {
            currentBrailleRef.current = (currentBrailleRef.current + 1) % brailleList.length;
        }
        setCurrentBraille(currentBrailleRef.current);
    };

    return (
        <View {...panResponder.panHandlers} style={styles.container}>
            { /* Top 1/3 */}
            <View style={styles.top}>
                <Text style={styles.text}>이전</Text>
                <Text style={styles.symbol}>{brailleSymbols[currentBrailleRef.current]}</Text>
                <Text style={styles.text}>다음</Text>
            </View>

            { /* Bottom 2/3 */}
            <View  style={styles.bottom} >
                {points.map((_, index) => (
                    <View key={index} style={styles.dotContainer}>
                        <View style={styles.dot} />
                    </View>
                ))}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    top: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
    },
    text: {
        fontSize: 24,
        fontWeight: 'bold',
        marginTop: 150,
    },
    symbol: {
        fontSize: 36,
        fontWeight: 'bold',
        marginTop: 150,
    },
    bottom: {
        flex: 2,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
    },
    dotContainer: {
        width: '50%',
        height: '33.3%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    dot: {
        width: 80,
        height: 80,
        borderRadius: 50,
        backgroundColor: 'black',
    },
});

export default BrailleReader;