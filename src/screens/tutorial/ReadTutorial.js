import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import { useTTS } from '../../components/TTSContext';

// 튜토리얼 안내 텍스트
const explanation = `점자는 좌우로 3개의 점을 세로로 배열한 것입니다.\n
읽을 때는 왼쪽 위부터 1, 2, 3점을 차례로 읽습니다.\n
각 점을 터치하면 음성으로 점의 위치를 안내합니다.\n
볼록한 점은 진동이 느껴집니다.\n
기본적으로 6개의 점을 읽을 수 있지만, 그 이상의 점은 다음 버튼을 터치해 읽을 수 있습니다.\n
상단 중앙을 터치하면 현재 읽고 있는 점자를 다시 들을 수 있습니다.\n
연습하기 버튼을 눌러 점자를 직접 읽어보세요.`;

// 튜토리얼에 사용될 점자 리스트
const category = '점자';
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

const ReadTutorial = ({ navigation }) => {
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
                navigation.navigate('ReadPractice', { category: category, brailleSymbols: symbols, brailleList: brailleList });
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

export default ReadTutorial;