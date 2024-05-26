import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import GestureRecognizer from 'react-native-swipe-gestures';
import { useTTS } from '../../../components/TTSContext';

// 메뉴 버튼
const buttons = ['튜토리얼', '자음', '모음', '받침', '약어 1단계', '약어 2단계', '약어 3단계', '숫자', '영어(알파벳)'];

const WriteMenu = ({ navigation }) => {
  const { speech } = useTTS();
  const [previousTouchTime, setPreviousTouchTime] = useState(null);
  const previousTouchTimeRef = useRef(null);
  const index = useRef(1);

  useEffect(() => {
    const message = '쓰기 메뉴입니다. 9개의 메뉴가 있습니다.';
    speech(message);
  }, []);

  useEffect(() => {
    previousTouchTimeRef.current = previousTouchTime;
  }, [previousTouchTime]);

  // Swipe Gesture 로 탐색할 목록
  const menuList = [
    { name: '뒤로가기', speech: () => speech('뒤로가기'), action: () => navigation.goBack() },
    { name: '점자랑', speech: () => speech('점자랑'), action : () => speech('점자랑') },
    { name: '튜토리얼', speech: () => speech('튜토리얼'), action: () => navigation.navigate('WriteTutorialMenu') },
    { name: '자음', speech: () => speech('자음'), action: () => navigation.navigate('WriteInitialConsonant') },
    { name: '모음', speech: () => speech('모음'), action: () => navigation.navigate('WriteVowel') },
    { name: '받침', speech: () => speech('받침'), action: () => navigation.navigate('WriteFinalConsonant') },
    { name: '약어 1단계', speech: () => speech('약어 1단계'), action: () => navigation.navigate('WriteAbbreviation1') },
    { name: '약어 2단계', speech: () => speech('약어 2단계'), action: () => navigation.navigate('WriteAbbreviation2') },
    { name: '약어 3단계', speech: () => speech('약어 3단계'), action: () => navigation.navigate('WriteAbbreviation3') },
    { name: '숫자', speech: () => speech('숫자'), action: () => navigation.navigate('WriteNumber') },
    { name: '영어(알파벳)', speech: () => speech('영어(알파벳)'), action: () => navigation.navigate('WriteAlphabet') },
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
        directionalOffsetThreshold: 80,
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
          <View style={styles.menuPlaceholder} />
        </View>
        <TouchableOpacity style={styles.content} onPress={handleDoubleTouch} activeOpacity={1}>
          {buttons.map((button, index) => (
            <View key={index} style={styles.button}>
              <TouchableOpacity onPress={() => handlePressButton(button)}>
                <Text style={styles.buttonText}>{button}</Text>
              </TouchableOpacity>
            </View>
          ))}
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
    height: '8%',
    marginTop: 15,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
});

export default WriteMenu;
