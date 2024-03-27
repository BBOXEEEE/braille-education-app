import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Modal, StyleSheet, SafeAreaView } from 'react-native';
import * as Speech from 'expo-speech';

const ttsOptions = [
  { rate: 1, label: "느리게" },
  { rate: 1.15, label: "보통" },
  { rate: 1.4, label: "조금 빠르게" },
  { rate: 1.5, label: "빠르게" },
];

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
            onPress={() => onOptionSelected(option.rate)}>
            <Text style={styles.buttonText}>{option.label}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  </Modal>
);

const Home = ({ navigation }) => {
  const [modalVisible, setModalVisible] = useState(false);

  const tts = (rate) => {
    const option = ttsOptions.find(option => option.rate === rate);
    const text = option ? option.label : "설정 오류";
    const options = {
      voice: 'com.apple.voice.compact.ko-KR.Yuna',
      rate,
    };

    Speech.speak(text, options);
    setModalVisible(false);
  };

  const navigationOptions = [
    { label: '튜토리얼', navigateTo: () => navigation.navigate('TutorialMenu') },
    { label: '읽기', navigateTo: () => navigation.navigate('ReadMenu') },
    { label: '쓰기', navigateTo: () => navigation.navigate('WriteMenu') },
    { label: '촬영하기', navigateTo: () => navigation.navigate('CameraMenu') },
    { label: '단어장', navigateTo: () => navigation.navigate('VocabularyMenu') },
    { label: 'TTS 속도 조절', navigateTo: () => setModalVisible(true) },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <TTSModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onOptionSelected={tts}
      />
      <View style={styles.header}>
        <Text style={styles.headerTitle}>점자랑</Text>
      </View>
      <View style={styles.content}>
        {navigationOptions.map((option, index) => (
          <TouchableOpacity
            key={index}
            style={styles.button}
            onPress={option.navigateTo}>
            <Text style={[styles.buttonText, styles.boldText]}>{option.label}</Text>
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

