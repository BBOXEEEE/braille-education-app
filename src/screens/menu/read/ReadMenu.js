import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import { useTTS } from '../../../components/TTSContext';

const steps = [
  { name: '튜토리얼', screen: 'ReadTutorial' },
  { name: '자음', screen: 'ReadInitialConsonant' },
  { name: '모음', screen: 'ReadVowel' },
  { name: '받침', screen: 'ReadFinalConsonant' },
  { name: '약어 1단계', screen: 'ReadAbbreviation1' },
  { name: '약어 2단계', screen: 'ReadAbbreviation2' },
  { name: '약어 3단계', screen: 'ReadAbbreviation3' },
  { name: '숫자', screen: 'ReadNumber' },
  { name: '영어(알파벳)', screen: 'ReadAlphabet' }
];

const ReadMenu = ({ navigation }) => {
  const { speech } = useTTS();
  const [previousTouchTime, setPreviousTouchTime] = useState(null);
  const previousTouchTimeRef = useRef(null);
  useEffect(() => {
    previousTouchTimeRef.current = previousTouchTime;
  }, [previousTouchTime]);

  // 터치 이벤트 처리
  const handlePressButton = (name, screen) => {
    const currentTouchTime = Date.now();
    const isDoubleTouched = (previousTouchTimeRef.current) && (currentTouchTime - previousTouchTimeRef.current) < 300;

    if (isDoubleTouched) {
      navigation.navigate(screen);
    }
    else {
      const message = `${name}`;
      speech(message);
    }
    previousTouchTimeRef.current = currentTouchTime;
    setPreviousTouchTime(previousTouchTimeRef.current);
  };

  const handleBackButton = () => {
    const currentTouchTime = Date.now();
    const isDoubleTouched = (previousTouchTimeRef.current) && (currentTouchTime - previousTouchTimeRef.current) < 300;

    if (isDoubleTouched) {
      navigation.goBack();
    }
    else {
      const message = "뒤로가기";
      speech(message);
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
            onPress={() => handlePressButton(step.name, step.screen)}>
            <Text style={styles.buttonText}>{step.name}</Text>
          </TouchableOpacity>
        ))}
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

export default ReadMenu;
