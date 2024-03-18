import React from 'react';
import { View, Text, TouchableHighlight, StyleSheet, SafeAreaView } from 'react-native';

const MainScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>T&T</Text>
      </View>
      <View style={styles.content}>
        <TouchableHighlight
          style={styles.button}
          underlayColor="#dcdcdc" 
          //onPress={() => navigation.navigate('ReadingWriting', { type: 'reading' })}>
          onPress={() => navigation.navigate('Reading')}>
          <Text style={[styles.buttonText, styles.boldText]}>읽기</Text>
        </TouchableHighlight>
        <TouchableHighlight
          style={styles.button}
          underlayColor="#dcdcdc"
          onPress={() => navigation.navigate('Writing')}>
          <Text style={[styles.buttonText, styles.boldText]}>쓰기</Text>
        </TouchableHighlight>
        <TouchableHighlight
          style={styles.button}
          underlayColor="#dcdcdc"
          onPress={() => navigation.navigate('Shooting')}>
          <Text style={[styles.buttonText, styles.boldText]}>촬영하기</Text>
        </TouchableHighlight>
        <TouchableHighlight
          style={styles.button}
          underlayColor="#dcdcdc"
          onPress={() => navigation.navigate('Vocabulary')}>
          <Text style={[styles.buttonText, styles.boldText]}>단어장</Text>
        </TouchableHighlight>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5', // Light grey background
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
    //paddingHorizontal: 10,
  },
  button: {
    width: '100%',
    padding:35,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff', 
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    // Android용 그림자 스타일
    elevation: 5,
  },
  buttonText: {
    fontSize: 18,
    color: '#000',
  },
  boldText: {
    fontWeight: 'bold',
  },
});

export default MainScreen;


//폰 크기에 따라 변경 되는 거
/*
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, Dimensions } from 'react-native';

// 디바이스의 너비와 높이를 가져옵니다.
const { width, height } = Dimensions.get('window');

// 기준이 되는 디자인 크기를 설정합니다.
const guidelineBaseWidth = 350;
const guidelineBaseHeight = 680;

const scale = (size) => (width / guidelineBaseWidth) * size;
const verticalScale = (size) => (height / guidelineBaseHeight) * size;
const moderateScale = (size, factor = 0.5) => size + ( scale(size) - size ) * factor;

const MainScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>T&T</Text>
      </View>
      <View style={styles.content}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Reading')}>
          <Text style={styles.buttonText}>읽기</Text>
        </TouchableOpacity>
        <View style={styles.divider} />
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Writing')}>
          <Text style={styles.buttonText}>쓰기</Text>
        </TouchableOpacity>
        <View style={styles.divider} />
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Shooting')}>
          <Text style={styles.buttonText}>촬영하기</Text>
        </TouchableOpacity>
        <View style={styles.divider} />
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Vocabulary')}>
          <Text style={styles.buttonText}>단어장</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    height: verticalScale(80),
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  headerTitle: {
    fontSize: moderateScale(30),
    fontWeight: 'bold',
    color: '#fff',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: scale(16),
  },
  button: {
    width: '100%',
    padding: verticalScale(20),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f7f7f7',
    marginBottom: verticalScale(16),
  },
  buttonText: {
    fontSize: moderateScale(18),
  },
  divider: {
    height: 1,
    width: '100%',
    backgroundColor: '#ccc',
  },
});

export default MainScreen;

*/