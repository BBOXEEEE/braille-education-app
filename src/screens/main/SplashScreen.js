import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';

const SplashScreen = ({ navigation }) => {
  useEffect(() => {
    // 2초 후에 'Main' 스크린으로 이동
    setTimeout(() => {
      navigation.replace('Main');
    }, 2000);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Text style={styles.logoText}>T&T</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff', // 배경 색상은 원하는 대로 조정
  },
  logoText: {
    fontSize: 40, // 로고 텍스트 크기는 원하는 대로 조정
    fontWeight: 'bold',
    // 여기에 더 많은 스타일을 추가할 수 있습니다.
  },
});

export default SplashScreen;
