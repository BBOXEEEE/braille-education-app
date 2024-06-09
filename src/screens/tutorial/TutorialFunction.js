import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, Modal, StyleSheet, SafeAreaView } from 'react-native';
import GestureRecognizer from 'react-native-swipe-gestures';
import { useTTS } from '../../components/TTSContext';

// 메뉴 버튼
const buttons = ['읽기', '쓰기', '촬영하기', '녹음하기', '단어장', '말하기 속도 조절'];

// 기능 설명
const explanations = [
  "점자를 단계별로 읽는 것을 학습하고, 시험 볼 수 있습니다. 더 자세한 내용은 읽기 메뉴에 튜토리얼을 참고해주세요.",
  "점자를 단계별로 써보고 쓰는것을 학습하고, 시험볼 수  있습니다. 더 자세한 내용은 쓰기 메뉴에 튜토리얼을 참고해주세요.",
  "촬영한 주변 사물의 이름를 점자로 읽고 써 볼 수 있습니다.",
  "원하는 단어를 녹음하면 점자로 읽고 써볼 수 있습니다.",
  "촬영하고 인지된 사물의 이름들을 저장해놓고 다시 학습할 수 있습니다.",
  "TTS 속도를 조절할 수 있습니다.",
]

const TutorialFunction = ({ navigation }) => {
  const { speech } = useTTS();
  const [previousTouchTime, setPreviousTouchTime] = useState(null);
  const previousTouchTimeRef = useRef(null);
  const index = useRef(1);

  useEffect(() => {
    previousTouchTimeRef.current = previousTouchTime;
  }, [previousTouchTime]);

  const explanation = "다음은 앱 기능에 대한 설명입니다. 각 버튼을 눌러 기능 설명을 들으세요.";

  useEffect(() => {
    speech(explanation);
  }, []);

  // Swipe Gesture 로 탐색할 목록
  const menuList = [
    { 'name' : '뒤로가기', speech: () => speech('뒤로가기'), action: () => navigation.goBack() },
    { 'name' : '점자랑', speech: () => speech('점자랑'), action : () => speech('점자랑') },
    { 'name' : '읽기', speech: () => speech('읽기'), action: () => speech(explanations[0]) },
    { 'name' : '쓰기', speech: () => speech('쓰기'), action: () => speech(explanations[1]) },
    { 'name' : '촬영하기', speech: () => speech('촬영하기'), action: () => speech(explanations[2]) },
    { 'name' : '녹음하기', speech: () => speech('녹음하기'), action: () => speech(explanations[3]) },
    { 'name' : '단어장', speech: () => speech('단어장'), action: () => speech(explanations[4]) },
    { 'name' : '말하기 속도 조절', speech: () => speech('말하기 속도 조절'), action: () => speech(explanations[5]) },
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
                <Text style={[styles.buttonText, styles.boldText]}>{button}</Text>
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
    backgroundColor: '#f5f5f5',
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
    alignItems: 'center',
  },
  button: {
    width: '100%',
    height: '13%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    marginTop: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  buttonText: {
    fontSize: 24,
    color: '#000',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    flexDirection: 'column',
    justifyContent: 'space-around',
    width: '60%',
    height: '50%',
    backgroundColor: "#9E9E9E",
    borderRadius: 20,
    padding: '5%',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  },
  squareButton: {
    paddingVertical: '13%', 
    backgroundColor: 'white', 
    borderRadius: 10, 
    shadowColor: "#000", 
    shadowOffset: {
      width: 0, 
      height: 2,
    },
    shadowOpacity: 0.25, 
    shadowRadius: 3.84, 
    elevation: 5, 
  },
});

export default TutorialFunction;
