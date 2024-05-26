import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native';
import GestureRecognizer from 'react-native-swipe-gestures';
import { useTTS } from '../../components/TTSContext';

// 메뉴 버튼
const buttons = ['다시듣기', '넘어가기'];

const TutorialMenu = ({ navigation }) => {
  const { speech } = useTTS();
  const [previousTouchTime, setPreviousTouchTime] = React.useState(null);
  const previousTouchTimeRef = React.useRef(null);
  const index = useRef(1);

  useEffect(() => {
    previousTouchTimeRef.current = previousTouchTime;
  }, [previousTouchTime]);

  const explanation = `버튼은 편리함을 위해 VoiceOver, TalkBack과 같은 동작을 하고 있습니다.
  아래 '넘어가기' 버튼을 눌러주세요. '다시듣기' 버튼은 이 음성을 다시 들을 수 있습니다.`;

  useEffect(() => {
    speech(explanation);
  }, []);

  // Swipe Gesture 로 탐색할 목록
  const menuList = [
    { name: '뒤로가기', speech: () => speech('뒤로가기'), action: () => navigation.goBack() },
    { name: '점자랑', speech: () => speech('점자랑'), action : () => speech('점자랑') },
    { name: '다시듣기', speech: () => speech('다시듣기'), action: () => speech(explanation) },
    { name: '넘어가기', speech: () => speech('넘어가기'), action: () => navigation.navigate('TutorialFunction') },
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
    fontSize: 18,
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

export default TutorialMenu;
