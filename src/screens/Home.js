import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, Modal, StyleSheet, SafeAreaView } from 'react-native';
import GestureRecognizer from 'react-native-swipe-gestures';
import { useTTS } from '../components/TTSContext';
import { useCameraPermissions } from 'expo-camera';

// 메뉴 버튼
const buttons = ['튜토리얼', '읽기', '쓰기', '촬영하기', '단어장', '말하기 속도 조절'];

// 말하기 속도 조절
const ttsOptions = [
  { rate: 1, label: "느리게" },
  { rate: 1.15, label: "보통" },
  { rate: 1.4, label: "조금 빠르게" },
  { rate: 1.5, label: "빠르게" },
];

const Home = ({ navigation }) => {
  const { updateRate, speech } = useTTS();
  const [previousTouchTime, setPreviousTouchTime] = useState(null);
  const previousTouchTimeRef = useRef(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [permission, requestPermission]  = useCameraPermissions();
  const index = useRef(0);
  const modalIndex = useRef(0);

  useEffect(() => {
    previousTouchTimeRef.current = previousTouchTime;
  }, [previousTouchTime]);

  // 앱 최초 실행 시 안내 TTS
  useEffect(() => {
    const checkPermissions = async () => {
      const grantMessage = "이 앱은 카메라와 마이크 권한이 필요합니다. Allow 버튼을 눌러 권한을 허용해주세요.";
      speech(grantMessage, 1.3);
      const { status } = await requestPermission();
      if (status === 'granted') {
        const message = '원활한 사용을 위해 Voice Over 혹은 TalkBack을 비활성화 해주세요. 버튼을 두번 터치하면 해당 화면으로 이동합니다.';
        speech(message, 1.3);
      }
      else {
        const message = '카메라와 마이크 권한 설정을 위해 설정에서 권한을 허용해주세요.';
        speech(message, 1.3);
      }
    };

    checkPermissions();
  }, []);

  // Swipe Gesture 로 탐색할 목록
  const menuList = [
    { name: '점자랑', speech: () => speech('점자랑'), action : () => speech('점자랑') },
    { name: '튜토리얼', speech: () => speech('튜토리얼'), action: () => navigation.navigate('TutorialMenu') },
    { name: '읽기', speech: () => speech('읽기'), action: () => navigation.navigate('ReadMenu') },
    { name: '쓰기', speech: () => speech('쓰기'), action: () => navigation.navigate('WriteMenu') },
    { name: '촬영하기', speech: () => speech('촬영하기'), action: () => navigation.navigate('CameraModule') },
    { name: '단어장', speech: () => speech('단어장'), action: () => navigation.navigate('VocabularyModule') },
    { name: '말하기 속도 조절', speech: () => speech('말하기 속도 조절'), action: () => setModalVisible(true) },    
  ];

  // 터치 이벤트 처리
  const handlePressButton = (name) => {
    if (!modalVisible) {
      const touchedIndex = menuList.findIndex((menu) => menu.name === name);
      index.current = touchedIndex;
      menuList[touchedIndex].speech();
    }
    else {
      const touchedIndex = ttsOptions.findIndex((option) => option.label === name);
      modalIndex.current = touchedIndex;
      const message = `${ttsOptions[modalIndex.current].label}`;
      const rate = ttsOptions[modalIndex.current].rate;
      speech(message, rate);
    }
  };

  // 더블 터치 이벤트 처리
  const handleDoubleTouch = () => {
    const currentTouchTime = Date.now();
    const isDoubleTouched = (previousTouchTimeRef.current) && (currentTouchTime - previousTouchTimeRef.current) < 500;

    if (isDoubleTouched) {
      if (!modalVisible) {
        menuList[index.current].action();
      }
      else {
        updateRate({ value: ttsOptions[modalIndex.current].rate });
        setModalVisible(false);
      }
    }

    previousTouchTimeRef.current = currentTouchTime;
    setPreviousTouchTime(previousTouchTimeRef.current);
  };

  // Left Swipe 이벤트 처리
  const onSwipeLeft = () => {
    if (!modalVisible) {
      index.current = (index.current - 1 + menuList.length) % menuList.length;
      menuList[index.current].speech();
    }
    else {
      modalIndex.current = (modalIndex.current - 1 + ttsOptions.length) % ttsOptions.length;
      const message = `${ttsOptions[modalIndex.current].label}`;
      speech(message);
    }
  };

  // Right Swipe 이벤트 처리
  const onSwipeRight = () => {
    if (!modalVisible) {
      index.current = (index.current + 1) % menuList.length;
      menuList[index.current].speech();
    }
    else {
      modalIndex.current = (modalIndex.current + 1) % ttsOptions.length;
      const message = `${ttsOptions[modalIndex.current].label}`;
      const rate = ttsOptions[modalIndex.current].rate;
      speech(message, rate);
    }
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
          <TouchableOpacity onPress={() => handlePressButton('점자랑')}>
            <Text style={styles.headerTitle}>점자랑</Text>
          </TouchableOpacity>
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
        <TTSModal
          visible={modalVisible}
          onClose={() => setModalVisible(false)}
          onOptionTouched={handlePressButton}
          onDoubleTap={handleDoubleTouch}
        />
      </SafeAreaView>
    </GestureRecognizer>
  );
};

const TTSModal = ({ visible, onClose, onOptionTouched, onDoubleTap }) => (
  <Modal
    animationType="slide"
    transparent={true}
    visible={visible}
    onRequestClose={onClose}>
    <TouchableOpacity style={styles.centeredView} onPress={onDoubleTap} activeOpacity={1}>
      <TouchableOpacity style={styles.modalView} activeOpacity={1}>
        {ttsOptions.map((option) => (
          <View key={option.rate} style={styles.squareButton}>
            <TouchableOpacity onPress={() => onOptionTouched(option.label)}>
              <Text style={styles.buttonText}>{option.label}</Text>
            </TouchableOpacity>
          </View>
        ))}
      </TouchableOpacity>
    </TouchableOpacity>
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

