import React, { useState, useEffect, useRef } from 'react';
import { View, PanResponder, Dimensions, StyleSheet, Text, SafeAreaView, TouchableOpacity } from 'react-native';
import GestureRecognizer from 'react-native-swipe-gestures';
import * as Haptics from 'expo-haptics';
import { useTTS } from './TTSContext';
import { useNavigation } from '@react-navigation/native';
import { getPronunciation } from './Pronunciation';
import getRandomBrailleIndex from './RandomBrailleGenerator';

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

// 랜덤 점자 인덱스
let randomIndex = [];

const getComponentBraille = (braille) => {
    let result = "";

    braille.forEach((dot, index) => {
        if (index != 0 && index % 6 === 0) {
            result += "점 ";
        }
        if (dot === 1) {
            result += `${(index % 6) + 1} `;
        }
    });
    result += "점";

    return result;
};

const BrailleRTester = ({ category, brailleSymbols, brailleList }) => {
    const { speech } = useTTS();
    const [currentBraille, setCurrentBraille] = useState(0);
    const [touchIndex, setTouchIndex] = useState(-1);
    const [previousTouchTime, setPreviousTouchTime] = useState(null);
    const currentBrailleRef = useRef(currentBraille);
    const currentSpace = useRef(0);
    const touchIndexRef = useRef(touchIndex);
    const previousTouchTimeRef = useRef(null);
    const navigation = useNavigation();
    index = useRef(3);

    // 랜덤 점자 인덱스 초기화
    useEffect(() => {
        randomIndex = getRandomBrailleIndex(brailleList);
    }, []);

    useEffect(() => {
        const message = `점자 읽기 시험입니다.`;
        speech(message);
    }, []);

    useEffect(() => {
        currentBrailleRef.current = currentBraille;
        touchIndexRef.current = touchIndex;
        previousTouchTimeRef.current = previousTouchTime;
    }, [currentBraille, touchIndex, previousTouchTime]);

    useEffect(() => {
        const message = `다음 ${category} 를 읽고 정답확인을 눌러 정답을 확인하세요!`;
        speech(message);
        currentSpace.current = 0;
    }, [currentBraille]);

    function tts_dot(index) {
        if (index === -1) return;
        const message = `${index+1}점`;
        let pitch = 1;
        if (brailleList[randomIndex[currentBrailleRef.current]][index + (6 * currentSpace.current)] === 1) {
            pitch = 1.5;
        }
        speech(message, null, pitch);
    };

    useEffect(() => {
        tts_dot(touchIndex);

        // 해당 영역의 brailleList 값이 1일 경우 햅틱 피드백
        if (brailleList[randomIndex[currentBrailleRef.current]][touchIndexRef.current + (6 * currentSpace.current)] === 1) {
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
        }
    }, [touchIndex]);

    // Swipe Gesture 로 탐색할 목록
    const menuList = [
        { name: '뒤로가기', speech: () => speech('뒤로가기'), action: () => navigation.goBack() },
        { name: '점자랑', speech: () => speech('점자랑'), action: () => speech('점자랑') },
        { name: '이전', speech: () => currentSpace.current === 0 ? speech('이전') : speech('이전 칸'), action: () => handlePrevButton() },
        { name: '정답확인', speech: () => speech('정답확인'), action: () => handleCheckButton() },
        { name: '다음', speech: () => currentSpace.current === brailleList[randomIndex[currentBrailleRef.current]].length / 6 - 1 ? speech('다음') : speech('다음 칸'), action: () => handleNextButton() },
    ];

    // 터치 이벤트 처리
    const handlePressButton = (name) => {
        const touchedIndex = menuList.findIndex((menu) => menu.name === name);
        index.current = touchedIndex;
        menuList[touchedIndex].speech();
    };

    // 더블 터치 이벤트 처리
    const handleDoubleTouch = () => {
        const currentTouchTime = Date.now();
        const isDoubleTouched = (previousTouchTimeRef.current) && (currentTouchTime - previousTouchTimeRef.current) < 500;

        if (isDoubleTouched) {
            menuList[index.current].action();
        }

        previousTouchTimeRef.current = currentTouchTime;
        setPreviousTouchTime(previousTouchTimeRef.current);
    };

    // 정답 확인 버튼 이벤트 처리
    const handleCheckButton = () => {
        const component = getComponentBraille(brailleList[randomIndex[currentBrailleRef.current]]);
        const pronunciation = getPronunciation(category, brailleSymbols[randomIndex[currentBrailleRef.current]]);
        const message = `정답은 ${category} ${pronunciation} 입니다. ${pronunciation} 은 ${component} 입니다.`;
        speech(message);
    };

    // 이전 버튼 이벤트 처리
    const handlePrevButton = () => {
        if (currentSpace.current === 0) {
            if (currentBrailleRef.current - 1 >= 0) currentBrailleRef.current -= 1;
            else currentBrailleRef.current = randomIndex.length - 1;
        }
        else {
            const prev = currentSpace.current - 1;
            currentSpace.current = prev;
        }
        index.current = 3;
        setCurrentBraille(currentBrailleRef.current);
    };

    // 다음 버튼 이벤트 처리
    const handleNextButton = () => {
        if (currentSpace.current === brailleList[randomIndex[currentBrailleRef.current]].length / 6 - 1) {
            currentBrailleRef.current = (currentBrailleRef.current + 1) % randomIndex.length;
        }
        else {
            const next = currentSpace.current + 1;
            currentSpace.current = next;
        }
        index.current = 3;
        setCurrentBraille(currentBrailleRef.current);
    };

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

    // PanResponder 초기화
    const panResponder = useRef(
        PanResponder.create({
            onStartShouldSetPanResponder: () => true,
            onMoveShouldSetPanResponder: () => true,
            onPanResponderGrant: (evt) => {
                const touch = evt.nativeEvent.touches;

                touch.forEach((touch) => {
                    touchIndexRef.current = getTouchedAreaIndex(touch.pageX, touch.pageY);
                    setTouchIndex(touchIndexRef.current);
                });
            },
            onPanResponderMove: (evt) => {
                const touches = evt.nativeEvent.touches;
                
                touches.forEach((touch) => {
                    touchIndexRef.current = getTouchedAreaIndex(touch.pageX, touch.pageY);
                    setTouchIndex(touchIndexRef.current);
                });
            },
        })
    ).current;

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => handlePressButton('뒤로가기')}>
                    <Text style={styles.headerButton}>Back</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handlePressButton('점자랑')}>
                    <Text style={styles.headerTitle}>점자랑</Text>
                </TouchableOpacity>
                <View style={styles.menuPlaceholder} />
            </View>
            <View style={styles.content}>
                { /* Top 1/3 */}
                <GestureRecognizer
                    onSwipeLeft={onSwipeLeft}
                    onSwipeRight={onSwipeRight}
                    config={{
                        velocityThreshold: 0.1,
                        directionalOffsetThreshold: 80
                    }}
                    style={{ flex: 1 }}>
                    <TouchableOpacity style={styles.top} onPress={handleDoubleTouch} activeOpacity={1}>
                        <TouchableOpacity onPress={() => handlePressButton('이전')}>
                            <Text style={styles.text}>이전</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => handlePressButton('정답확인')}>
                            <Text style={styles.text}>정답확인</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => handlePressButton('다음')}>
                            <Text style={styles.text}>다음</Text>
                        </TouchableOpacity>
                    </TouchableOpacity>
                </GestureRecognizer>

                { /* Bottom 2/3 */}
                <View {...panResponder.panHandlers} style={styles.bottom} >
                    {points.map((_, index) => (
                        <View key={index} style={styles.dotContainer}>
                            <View style={styles.dot} />
                        </View>
                    ))}
                </View>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f0f0f0',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#000',
        padding: 15,
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
    menuPlaceholder: {
        width: 38,
    },
    content: {
        flex: 1,
    },
    top: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
    },
    text: {
        fontSize: 32,
        fontWeight: 'bold',
        marginTop: '20%',
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

export default BrailleRTester;