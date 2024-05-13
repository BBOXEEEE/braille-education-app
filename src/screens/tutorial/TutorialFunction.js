import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, Modal, StyleSheet, SafeAreaView } from 'react-native';
import { useTTS } from '../../components/TTSContext';

const TutorialFunction = ({ navigation }) => {
  // TTS 말하기 속도 조절 Modal
  const { speech } = useTTS();

  const [previousTouchTime, setPreviousTouchTime] = useState(null);
  const previousTouchTimeRef = useRef(null);
  useEffect(() => {
    previousTouchTimeRef.current = previousTouchTime;
  }, [previousTouchTime]);

  const explanation = "다음은 앱 기능에 대한 설명입니다. 각 버튼을 눌러 기능 설명을 들으세요.";

  useEffect(() => {
    speech(explanation);
  }, []);

  const steps = [
    { name: '읽기', message:'점자를 단계별로 읽는 것을 학습하고, 시험 볼 수 있습니다. 더 자세한 내용은 읽기 메뉴에 튜토리얼을 참고해주세요.'},
    { name: '쓰기', message:'점자를 단계별로 써보고 쓰는것을 학습하고, 시험볼 수  있습니다. 더 자세한 내용은 쓰기 메뉴에 튜토리얼을 참고해주세요.'},
    { name: '촬영하기',  message:'촬영한 주변 사물의 이름를 점자로 읽고 써 볼 수 있습니다.'},
    { name: '단어장',message:'촬영하고 인지된 사물의 이름들을 저장해놓고 다시 학습할 수 있습니다.' },
    { name: '말하기 속도 조절', message:'TTS 속도를 조절할 수 있습니다.' },
  ];

  // 터치 이벤트 처리
  const handlePressButton = (name, message) => {
    const currentTouchTime = Date.now();
    const isDoubleTouched = (previousTouchTimeRef.current) && (currentTouchTime - previousTouchTimeRef.current) < 300;

    if (isDoubleTouched) {
      speech(message);
    }
    else {
      speech(name);
    }
    previousTouchTimeRef.current = currentTouchTime;
    setPreviousTouchTime(previousTouchTimeRef.current);
  };

  const handleBackButton = () => {
    const currentTouchTime = Date.now();
    if (previousTouchTimeRef.current && (currentTouchTime - previousTouchTimeRef.current) < 300) {
      navigation.goBack();
    } else {
      speech("뒤로가기");
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
        <View style={styles.menuPlaceholder} />
      </View>
      <View style={styles.content}>
        {steps.map((step, index) => (
          <TouchableOpacity
            key={index}
            style={styles.button}
            onPress={() => handlePressButton(step.name, step.message)}>
            <Text style={[styles.buttonText, styles.boldText]}>{step.name}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </SafeAreaView>
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

export default TutorialFunction;
