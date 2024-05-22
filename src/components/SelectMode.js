import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import { useTTS } from './TTSContext';

const modes = [
    { name: "읽기"},
    { name: "쓰기"},
];

const SelectMode = ({ route, navigation }) => {
    const { item } = route.params;
    const { speech } = useTTS();
    const [previousTouchTime, setPreviousTouchTime] = useState(null);
    const previousTouchTimeRef = useRef(null);

    useEffect(() => {
        previousTouchTimeRef.current = previousTouchTime;
    }, [previousTouchTime]);

    // 터치 이벤트 처리
    const handlePressButton = (mode, item) => {
        const currentTouchTime = Date.now();
        const isDoubleTouched = (previousTouchTimeRef.current) && (currentTouchTime - previousTouchTimeRef.current) < 300;

        if (isDoubleTouched) {
            if (mode === "읽기") {
                navigation.navigate('WordReader', { item: item });
            }
            else {
                navigation.navigate('WordWritter', { item: item });
            }
        }
        else {
            const message = `${mode}`;
            speech(message);
        }
        previousTouchTimeRef.current = currentTouchTime;
        setPreviousTouchTime(previousTouchTimeRef.current);
    };

    // 뒤로가기 버튼 이벤트 처리
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
        setPreviousTouchTime(previousTouchTimeRef.current);
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={handleBackButton}>
                    <Text style={styles.headerButton}>Back</Text>
                </TouchableOpacity>
                <Text style={styles.headerTitle}>점자랑</Text>
                <View style={styles.menuPlaceHolder}></View>
            </View>
            <View style={styles.content}>
                {modes.map((mode, index) => (
                    <TouchableOpacity key={index} style={styles.button} onPress={() => handlePressButton(mode.name, item)}>
                        <Text style={styles.buttonText}>{mode.name}</Text>
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
    menuPlaceHolder: {
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

export default SelectMode;