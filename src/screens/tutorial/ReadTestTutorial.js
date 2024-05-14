import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import { useTTS } from '../../components/TTSContext';

// 튜토리얼 안내 텍스트
const explanation = `시험보기는 무작위로 선택된 점자를 읽고 맞춰야합니다.\n
화면에 있는 점자를 읽고 해당하는 점자를 맞춰보세요.\n
상단 중앙에 위치한 정답보기 버튼을 통해 정답을 확인할 수 있습니다.\n
읽기와 마찬가지로 6개 이상의 점은 다음 버튼을 터치해 읽을 수 있습니다.\n
연습하기 버튼을 눌러 학습하기에서 읽은 점자가 무엇인지 맞춰보세요.`;

// 튜토리얼에 사용될 점자 리스트
const category = '';
const symbols = ['자음 ㅁ', '약어 그래서'];
const brailleList = [
    [1, 0, 0, 0, 1, 0],
    [1, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0],
]

// 버튼 목록
const buttons = [
    { name: '다시듣기' },
    { name: '연습하기' },
];

const ReadTestTutorial = ({ navigation }) => {
    const { speech } = useTTS();
    const previousTouchTimeRef = useRef(null);

    // 최초 1회 TTS 안내
    useEffect(() => {
        speech(explanation);
    }, []);
    
    const handleBackButton = () => {
        const currentTouchTime = Date.now();
        const isDoubleTouched = (previousTouchTimeRef.current) && (currentTouchTime - previousTouchTimeRef.current) < 300;

        if (isDoubleTouched) {
            navigation.goBack();
        }
        else {
            const message = "뒤로가기";
            speech(message);
        }
        previousTouchTimeRef.current = currentTouchTime;
    };

    const handlePressButton = (name) => {
        const currentTouchTime = Date.now();
        const isDoubleTouched = (previousTouchTimeRef.current) && (currentTouchTime - previousTouchTimeRef.current) < 300;

        if (isDoubleTouched) {
            if (name === '다시듣기') {
                speech(explanation);
            }
            else {
                navigation.navigate('ReadTestPractice', { category: category, brailleSymbols: symbols, brailleList: brailleList });
            }
        }
        else {
            const message = `${name}`;
            speech(message);
        }
        previousTouchTimeRef.current = currentTouchTime;
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={handleBackButton}>
                    <Text style={styles.headerButton}>Back</Text>
                </TouchableOpacity>
                <Text style={styles.headerTitle}>점자랑</Text>
                <View style={styles.menuPlaceholder} />
            </View>
            <View style={styles.content}>
                {buttons.map((button, index) => (
                    <TouchableOpacity key={index} style={styles.button} onPress={() => handlePressButton(button.name)}>
                        <Text style={styles.buttonText}>{button.name}</Text>
                    </TouchableOpacity>
                ))}
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
    menuPlaceholder: {
        width: 38,
    },
    content: {
        flex: 1,
        justifyContent: 'center',
    },
    button: {
        backgroundColor: '#fff',
        width: '100%',
        height: '15%',
        marginTop: 30,
        marginBottom: 30,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 1,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 3,
    },
    buttonText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#000',
      },
});

export default ReadTestTutorial;