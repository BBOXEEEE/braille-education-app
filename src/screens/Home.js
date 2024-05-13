import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, Modal, StyleSheet, SafeAreaView } from 'react-native';
import { useTTS } from '../components/TTSContext';

// 말하기 속도 조절
const ttsOptions = [
  { rate: 1, label: "느리게" },
  { rate: 1.15, label: "보통" },
  { rate: 1.4, label: "조금 빠르게" },
  { rate: 1.5, label: "빠르게" },
];

const Home = ({ navigation }) => {
  // TTS 말하기 속도 조절 Modal
  const { updateRate, speech } = useTTS();

  const [previousTouchTime, setPreviousTouchTime] = useState(null);
  const previousTouchTimeRef = useRef(null);
  useEffect(() => {
    previousTouchTimeRef.current = previousTouchTime;
  }, [previousTouchTime]);
  const [modalVisible, setModalVisible] = useState(false);

  const steps = [
    { name: '튜토리얼', navigateTo: () => navigation.navigate('TutorialMenu') },
    { name: '읽기', navigateTo: () => navigation.navigate('ReadMenu') },
    { name: '쓰기', navigateTo: () => navigation.navigate('WriteMenu') },
    { name: '촬영하기', navigateTo: () => navigation.navigate('CameraModule') },
    { name: '단어장', navigateTo: () => navigation.navigate('VocabularyModule') },
    { name: '말하기 속도 조절', navigateTo: () => setModalVisible(true) },
  ];

  // 터치 이벤트 처리
  const handlePressButton = (name, screen) => {
    const currentTouchTime = Date.now();
    const isDoubleTouched = (previousTouchTimeRef.current) && (currentTouchTime - previousTouchTimeRef.current) < 300;

    if (isDoubleTouched) {
      screen();
    }
    else {
      const message = `${name}`;
      speech(message);
    }
    previousTouchTimeRef.current = currentTouchTime;
    setPreviousTouchTime(previousTouchTimeRef.current);
  };

  // 말하기 속도 조절 터치 이벤트 처리
  const handlePressTTSButton = (label, rate) => {
    const currentTouchTime = Date.now();
    const isDoubleTouched = (previousTouchTimeRef.current) && (currentTouchTime - previousTouchTimeRef.current) < 300;

    if (isDoubleTouched) {
      updateRate({ value: rate });
      setModalVisible(false);
    }
    else {
      const message = `${label}`;
      speech(message, rate);
    }
    previousTouchTimeRef.current = currentTouchTime;
    setPreviousTouchTime(previousTouchTimeRef.current);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>점자랑</Text>
      </View>
      <View style={styles.content}>
        {steps.map((step, index) => (
          <TouchableOpacity
            key={index}
            style={styles.button}
            onPress={() => handlePressButton(step.name, step.navigateTo)}>
            <Text style={[styles.buttonText, styles.boldText]}>{step.name}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <TTSModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onOptionSelected={handlePressTTSButton}
      />
    </SafeAreaView>
  );
};

const TTSModal = ({ visible, onClose, onOptionSelected }) => (
  <Modal
    animationType="slide"
    transparent={true}
    visible={visible}
    onRequestClose={onClose}>
    <View style={styles.centeredView}>
      <View style={styles.modalView}>
        {ttsOptions.map((option) => (
          <TouchableOpacity
            key={option.rate}
            style={styles.squareButton}
            onPress={() => onOptionSelected(option.label, option.rate)}>
            <Text style={styles.buttonText}>{option.label}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  </Modal>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    height: 80,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  headerTitle: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#fff',
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

export default Home;

