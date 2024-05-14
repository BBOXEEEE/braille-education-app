import React, { useEffect} from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native';
import { useTTS } from '../../components/TTSContext';

const TutorialMenu = ({ navigation }) => {
  const { speech } = useTTS();
  const [previousTouchTime, setPreviousTouchTime] = React.useState(null);
  const previousTouchTimeRef = React.useRef(null);

  const explanation = `버튼을 클릭하는 방법에 대해 먼저 알려드리겠습니다.
  버튼을 한번 누르게 되면 해당 버튼의 기능을 음성으로 안내하고 두번 누르게 되면 기능이 실행됩니다.
  아래 '넘어가기' 버튼을 눌러주세요. '다시듣기' 버튼은 이 음성을 다시 들을 수 있습니다. 전 화면으로 돌아가고 싶다면 왼쪽 상단에 '뒤로가기' 버튼을 눌러주세요.`;

  useEffect(() => {
    previousTouchTimeRef.current = previousTouchTime;
  }, [previousTouchTime]);

  useEffect(() => {
    speech(explanation);
  }, []);

  const buttons = [
    { name: '다시듣기'},
    { name: '넘어가기'},
  ];

  const handlePressButton = (name) => {
    const currentTouchTime = Date.now();
    const isDoubleTouched = (previousTouchTimeRef.current) && (currentTouchTime - previousTouchTimeRef.current) < 300;
  
    if (isDoubleTouched) {
      if (name === '다시듣기') {
        speech(explanation);
      } else {
        navigation.navigate('TutorialFunction');
      }    
    } else {
      const word=`${name}`;
      speech(word);
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
        {buttons.map((button, index) => (
          <TouchableOpacity key={index} style={styles.button} onPress={() => handlePressButton(button.name)}>
            <Text style={styles.buttonText}>{button.name}</Text>
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

export default TutorialMenu;
