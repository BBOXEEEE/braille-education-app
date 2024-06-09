import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import GestureRecognizer from 'react-native-swipe-gestures';
import { useTTS } from '../../components/TTSContext';
import { loadData } from '../../components/BrailleStorage';

const VocabularyModule = ({ navigation }) => {
    const { speech } = useTTS();
    const [data, setData] = useState([]);
    const [previousTouchTime, setPreviousTouchTime] = useState(null);
    const previousTouchTimeRef = useRef(null);
    const [currentPage, setCurrentPage] = useState(0); // 현재 페이지 인덱스
    const itemsPerPage = 5; // 페이지당 항목 수
    const index = useRef(1);

    // 단어 불러오기
    useEffect(() => {
        const load = async () => {
            const loadedData = await loadData();
            setData(loadedData);

            // 저장된 단어 목록이 없을 경우 TTS 출력
            if (loadedData.length === 0) {
                const message = "저장된 단어 목록이 없습니다.";
                speech(message);
            }

            // 저장된 단어의 개수 TTS 출력
            const wordCount = loadedData.length;
            const message = `${wordCount}개의 단어가 저장되어 있습니다.`;
            speech(message);
        };
        load();
    }, []);

    useEffect(() => {
        previousTouchTimeRef.current = previousTouchTime;
    }, [previousTouchTime]);

    // 현재 페이지의 항목
    const currentItems = data.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage);

    // 다음 페이지 이동
    const nextPage = () => {
        if ((currentPage + 1) * itemsPerPage < data.length) {
            setCurrentPage(currentPage + 1);
        }
        index.current = 1;
    };
  
    // 이전 페이지 이동
    const prevPage = () => {
        if (currentPage > 0) {
            setCurrentPage(currentPage - 1);
        }
        index.current = 1;
    };

    // Swipe Gesture 로 탐색할 목록
    const menuList = [
        { name: '뒤로가기', speech: () => speech('뒤로가기'), action: () => navigation.goBack() },
        { name: '점자랑', speech: () => speech('점자랑'), action: () => speech('점자랑') },
        ...currentItems.map((item) => ({
            name: item.word,
            speech: () => speech(item.word),
            action: () => navigation.navigate('SelectMode', { item: item })
        })),
        ...(currentPage > 0 ? [{ name: '이전', speech: () => speech('이전 페이지'), action: () => prevPage() }] : []),
        ...((currentPage + 1) * itemsPerPage < data.length ? [{ name: '다음', speech: () => speech('다음 페이지'), action: () => nextPage() }] : [])
    ];

    // 터치 이벤트 처리
    const handlePressButton = (item) => {
        const touchedIndex = menuList.findIndex((menu) => menu.name === item);
        index.current = touchedIndex;
        menuList[index.current].speech();
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
            style={{ flex: 1 }}>
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
                    {data.length === 0 ? (
                        <Text style={{ textAlign: 'center' }}>No saved word list.</Text>
                    ) : (
                        currentItems.map((item, index) => (
                            <View key={index} style={styles.button}>
                                <TouchableOpacity onPress={() => handlePressButton(item.word)}>
                                    <Text style={styles.buttonText}>{item.word}</Text>
                                </TouchableOpacity>
                            </View>
                        ))
                    )}
                </TouchableOpacity>
                <TouchableOpacity style={styles.footer} onPress={handleDoubleTouch} activeOpacity={1}>
                    {currentPage > 0 && (
                        <TouchableOpacity onPress={() => handlePressButton('이전')} style={styles.navButton}>
                            <Text style={styles.navText}>이전</Text>
                        </TouchableOpacity>
                    )}
                    {(currentPage + 1) * itemsPerPage < data.length && (
                        <TouchableOpacity onPress={() => handlePressButton('다음')} style={styles.navButton}>
                            <Text style={styles.navText}>다음</Text>
                        </TouchableOpacity>
                    )}
                </TouchableOpacity>
            </SafeAreaView>
        </GestureRecognizer>
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
        marginBottom: 23,
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
        fontSize: 24,
        fontWeight: 'bold',
        color: '#000',
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    navButton: {
        padding: 17,
        backgroundColor: 'black',
        borderRadius: 5,
    },
    navText: {
        fontSize: 20,
        color: 'white',
        fontWeight: 'bold',
    }
});

export default VocabularyModule;