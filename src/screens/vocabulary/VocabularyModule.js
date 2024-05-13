import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import { useTTS } from '../../components/TTSContext';
import { loadData } from '../../components/BrailleStorage';

const VocabularyModule = ({ navigation }) => {
    const { speech } = useTTS();
    const [data, setData] = useState([]);
    const [previousTouchTime, setPreviousTouchTime] = useState(null);
    const previousTouchTimeRef = useRef(null);
    const [currentPage, setCurrentPage] = useState(0); // 현재 페이지 인덱스
    const itemsPerPage = 5; // 페이지당 항목 수

    // 단어 불러오기
    useEffect(() => {
        const load = async () => {
            const loadedData = await loadData();
            setData(loadedData);
        };
        load();
    }, []);

    // 저장된 단어가 없을 경우 TTS 안내
    useEffect(() => {
        if (data.length === 0) {
            const message = "저장된 단어 목록이 없습니다.";
            speech(message);
        }
    }, [data.length]);

    // 현재 페이지의 항목
    const currentItems = data.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage);

    useEffect(() => {
        previousTouchTimeRef.current = previousTouchTime;
    }, [previousTouchTime]);

    const nextPage = () => {
        if ((currentPage + 1) * itemsPerPage < data.length) {
            setCurrentPage(currentPage + 1);
        }
    };
  
    const prevPage = () => {
        if (currentPage > 0) {
            setCurrentPage(currentPage - 1);
        }
    };

    // 터치 이벤트 처리
    const handlePressButton = (item) => {
        const currentTouchTime = Date.now();
        const isDoubleTouched = (previousTouchTimeRef.current) && (currentTouchTime - previousTouchTimeRef.current) < 300;

        if (isDoubleTouched) {
            navigation.navigate('SelectMode', { item: item });
        }
        else {
            const message = `${item.word}`;
            speech(message);
        }
        previousTouchTimeRef.current = currentTouchTime;
        setPreviousTouchTime(previousTouchTimeRef.current);
    };

    // 버튼 이벤트 처리
    const handleDoubleClick = (action, message) => {
        const currentTouchTime = Date.now();
        const isDoubleTouched = (previousTouchTimeRef.current) && (currentTouchTime - previousTouchTimeRef.current) < 300;

        if (isDoubleTouched) {
            action();
        } else {
            speech(message);
        }
        previousTouchTimeRef.current = currentTouchTime;
        setPreviousTouchTime(previousTouchTimeRef.current);
    };


    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => handleDoubleClick(() => navigation.popToTop(), '뒤로 가기')}>
                    <Text style={styles.headerButton}>Back</Text>
                </TouchableOpacity>
                <Text style={styles.headerTitle}>점자랑</Text>
                <View style={styles.menuPlaceHolder}></View>
            </View>
            <View style={styles.content}>
                {data.length === 0 ? (
                    <Text style={{ textAlign: 'center' }}>No saved word list.</Text>
                ) : (
                    currentItems.map((item, index) => (
                        <TouchableOpacity key={index} style={styles.button} onPress={() => handlePressButton(item)}>
                            <Text style={styles.buttonText}>{item.word}</Text>
                        </TouchableOpacity>
                    ))
                )}
            </View>
            <View style={styles.footer}>
            {currentPage > 0 && (
                <TouchableOpacity onPress={() => handleDoubleClick(prevPage, '이전 페이지')} style={styles.navButton}>
                    <Text style={styles.navText}>이전</Text>
                </TouchableOpacity>
            )}
            {(currentPage + 1) * itemsPerPage < data.length && (
                <TouchableOpacity onPress={() => handleDoubleClick(nextPage, '다음 페이지')} style={styles.navButton}>
                    <Text style={styles.navText}>다음</Text>
                </TouchableOpacity>
            )}
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
        fontSize: 20,
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