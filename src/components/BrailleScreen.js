import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import GestureRecognizer from 'react-native-swipe-gestures';
import { useTTS } from './TTSContext';

const BrailleScreen = ({ buttons, menuList }) => {
  const { speech } = useTTS();
  const [previousTouchTime, setPreviousTouchTime] = useState(null);
  const previousTouchTimeRef = useRef(null);
  const index = useRef(1);

  useEffect(() => {
    const message = '학습하기와 시험보기를 통해 점자를 학습해보세요';
    speech(message);
  }, []);

  useEffect(() => {
    previousTouchTimeRef.current = previousTouchTime;
  }, [previousTouchTime]);

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
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
  },
});

export default BrailleScreen;
