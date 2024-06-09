import React, { useRef, useState, useEffect } from "react";
import { useNavigation } from '@react-navigation/native';
import { StyleSheet, View, PanResponder, Dimensions, Text, SafeAreaView, TouchableOpacity } from "react-native";
import { useTTS } from "./TTSContext";
import { getPronunciation } from "./Pronunciation";
import GestureRecognizer from 'react-native-swipe-gestures';
import { Audio } from 'expo-av';

const window = Dimensions.get("window");
const points = [
  // 4점
  {
    x: 0,
    y: window.height / 3,
    width: window.width / 2,
    height: (window.height * 2) / 9,
    index: 3,
  },
  // 1점
  {
    x: 0,
    y: (window.height * 5) / 9,
    width: window.width / 2,
    height: (window.height * 2) / 9,
    index: 0,
  },
  // 5점
  {
    x: 0,
    y: (window.height * 7) / 9,
    width: window.width / 2,
    height: (window.height * 2) / 9,
    index: 4,
  },
  // 2점
  {
    x: window.width / 2,
    y: window.height / 3,
    width: window.width / 2,
    height: (window.height * 2) / 9,
    index: 1,
  },
  // 6점
  {
    x: window.width / 2,
    y: (window.height * 5) / 9,
    width: window.width / 2,
    height: (window.height * 2) / 9,
    index: 5,
  },
  // 3점
  {
    x: window.width / 2,
    y: (window.height * 7) / 9,
    width: window.width / 2,
    height: (window.height * 2) / 9,
    index: 2,
  },
];

const getTouchedAreaIndex = (touchX, touchY) => {
  const index = points.findIndex(
    (point) =>
      touchX >= point.x &&
      touchX <= point.x + point.width &&
      touchY >= point.y &&
      touchY <= point.y + point.height
  );
  return index;
};

const nextButton = { x: window.width / 2 + window.width / 8, y: window.height / 3 };
const prevButton = { x: window.width / 2 - window.width / 8, y: window.height / 3 };

async function playSound() {
  const soundObject = new Audio.Sound();
  try {
      await soundObject.loadAsync(require('../assets/sounds/ping.mp3'));
      await soundObject.playAsync();
  } catch (error) {
      console.error(error);
  }
}
const speakMessages = ["4점", "5점", "6점", "1점", "2점", "3점"];
var speakIndex = [false, false, false, false, false, false];

const BrailleWritter = ({ category, brailleSymbols, brailleList }) => {
  const { speech } = useTTS();
  const [brailleIndex, setBrailleIndex] = useState(0);
  const [lastTap, setLastTap] = useState(null);
  const brailleIndexRef = useRef(brailleIndex);
  const lastTapRef = useRef(null);
  var inputBraille;
  const [touchNum, setTouchNum] = useState(0);
  const touchNumRef = useRef(touchNum);
  const [currentPage, setCurrentPage] = useState(0);
  const [maxPage, setMaxPage] = useState(0);
  const maxPageRef = useRef(maxPage);
  const currentPageRef = useRef(currentPage);
  const [previousTouchTime, setPreviousTouchTime] = useState(null);
  const previousTouchTimeRef = useRef(null);
  const navigation = useNavigation();
  const index = useRef(3);

  useEffect(() => {
    const select = whatDot(brailleList[brailleIndex]);
    inputBraille = new Array(brailleList[brailleIndex].length).fill(0);
    const pronunciation = getPronunciation(category, brailleSymbols[brailleIndex]);
    const message = `점자 쓰기입니다. 1점부터 6점까지 터치하여 점자를 입력하세요.
                    ${category}, ${pronunciation} 입니다. ${select} 입니다.`;
    speech(message);
  }, []);

  useEffect(() => {
    brailleIndexRef.current = brailleIndex;
    const currentBrailleLength = brailleList[brailleIndex].length;
    const calculatedMaxPage = Math.ceil(currentBrailleLength / 6) - 1;
    inputBraille = new Array(brailleList[brailleIndex].length).fill(0);
    setTouchNum(0);
    setMaxPage(calculatedMaxPage);
    currentPageRef.current = 0;
    setCurrentPage(currentPageRef.current);
  }, [brailleIndex]);

  useEffect(() => {
    touchNumRef.current = touchNum;
  }, [touchNum]);

  useEffect(() => {
    maxPageRef.current = maxPage;
  }, [maxPage]);

  useEffect(() => {
    currentPageRef.current = currentPage;
  }, [currentPage]);

  useEffect(() => {
    previousTouchTimeRef.current = previousTouchTime;
  }, [previousTouchTimeRef])

  useEffect(() => {
    currentPageRef.current = currentPage;
  }, [currentPage]);

  const menuList = [
    { name: '뒤로가기', speech: () => speech('뒤로가기'), action: () => navigation.goBack() },
    { name: '점자랑', speech: () => speech('점자랑'), action: () => speech('점자랑') },
    { name: '이전', speech: () => currentPageRef.current === 0 ? speech('이전'): speech('이전 칸'), action: () => handlePrevButton() },
    { name: '묵자', speech: () => speech(getCurrentSymbol()), action: () => speech(getCurrentSymbol()) },
    { name: '다음', speech: () => currentPageRef.current === brailleList[brailleIndexRef.current].length / 6 - 1 ? speech('다음'): speech('다음 칸'), action: () => handleNextButton() },        
  ];

  const handleDoubleTap = (index) => {
    const currentBrailleIndex = brailleIndexRef.current;
    var pageIndex = index + currentPageRef.current * 6;
    if (index >= 3 && index <= 5) {
      pageIndex -= 3;
    } else {
      pageIndex += 3;
    }
    inputBraille[pageIndex] = 1;
    setTouchNum(prevTouchNum => {
      return prevTouchNum + 1;
    });
    playSound();

    const brailleOne = brailleOneNum(currentBrailleIndex);
    if (brailleOne <= touchNumRef.current + 1) {
      if (!isCorrect(inputBraille, brailleList[currentBrailleIndex])) {
        const message = "잘못된 입력 입니다. 다시 입력하세요.";
        speech(message);
        inputBraille = new Array(brailleList[currentBrailleIndex].length).fill(0);
        setTouchNum(0);
        currentPageRef.current = 0;
        setCurrentPage(currentPageRef.current);
      } 
      else {
        const message = "올바른 입력 입니다.";
        speech(message);
        inputBraille = new Array(brailleList[currentBrailleIndex].length).fill(0);
        setTouchNum(0);
      }
    }
  };

  const brailleOneNum = (currentBrailleIndex) => {
    var num = 0;
    for (var i = 0; i < brailleList[currentBrailleIndex].length; i++) {
      if (brailleList[currentBrailleIndex][i] == 1) num += 1;
    }
    return num;
  };

  const isCorrect = (input, result) => {
    for (var i = 0; i < input.length; i++) {
      if (input[i] != result[i]) return false;
    }
    return true;
  };

  const whatDot = (braille) => {
    var str = "";
    for (var i = 0; i < braille.length; i++) {
      if (i != 0 && i % 6 == 0) {
        str += ` 점, `;
      }
      if (braille[i] == 1) {
        str += `${(i % 6) + 1 }, `;
      }
    }
    str += " 점, ";
    return str;
  };

  // 페이지 이동 함수
  const handleNextPage = () => {
    setCurrentPage((prevPage) => {
      const nextPage = Math.min(prevPage + 1, maxPageRef.current);
      const message = "다음 칸 입니다.";
      speech(message);
      currentPageRef.current = nextPage;
      return currentPageRef.current;
    });
  };

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => {
      const prevPageCalculated = Math.max(prevPage - 1, 0);
      const message = "이전 칸 입니다.";
      speech(message);
      currentPageRef.current = prevPageCalculated;
      return currentPageRef.current;
    });
  };

  // 자음 인덱스 이동 함수
  const goToNextBraille = () => {
    setBrailleIndex((prevIndex) => {
      const newIndex = (prevIndex + 1) % brailleSymbols.length;
      const select = whatDot(brailleList[newIndex]);
      const pronunciation = getPronunciation(category, brailleSymbols[newIndex]);
      const message = `다음 ${category} 은 ${pronunciation} 입니다. ${select} 입니다.`;
      speech(message);
      setTouchNum(0);
      inputBraille = new Array(brailleList[newIndex].length).fill(0);
      return newIndex;
    });
  };

  const goToPrevBraille = () => {
    setBrailleIndex((prevIndex) => {
      let newIndex = prevIndex - 1;
      if (newIndex < 0) newIndex = brailleSymbols.length - 1;
      const select = whatDot(brailleList[newIndex]);
      const pronunciation = getPronunciation(category, brailleSymbols[newIndex]);
      const message = `이전 ${category} 은 ${pronunciation} 입니다. ${select} 입니다.`;
      speech(message);
      setTouchNum(0);
      inputBraille = new Array(brailleList[newIndex].length).fill(0);
      return newIndex;
    });
  };

  const brailleCheck = (currentIndex) => {
    const select = whatDot(brailleList[currentIndex.current]);
    const pronunciation = getPronunciation(category, brailleSymbols[currentIndex.current]);
    const message = ` 현재 쓰고 있는 점자는 ${category} ${pronunciation} 입니다. ${select} 입니다.`;
    speech(message);
  };

  const getCurrentSymbol = () => {
    const component = whatDot(brailleList[brailleIndexRef.current]);
    const pronunciation = getPronunciation(category, brailleSymbols[brailleIndexRef.current]);
    const message = `${category} ${pronunciation} 입니다. ${component} 입니다.`;
    return message;
  };

  const handleNextButton = () => {
    if (currentPageRef.current === Math.ceil(brailleList[brailleIndexRef.current].length / 6) - 1) {
      setBrailleIndex((prevIndex) => {
        const newIndex = (prevIndex + 1) % brailleSymbols.length;
        brailleIndexRef.current = newIndex;
        const select = whatDot(brailleList[newIndex]);
        const pronunciation = getPronunciation(category, brailleSymbols[newIndex]);
        const message = `다음 ${category}은 ${pronunciation} 입니다. ${select} 입니다.`;
        speech(message);
        inputBraille = new Array(brailleList[newIndex].length).fill(0);
        setTouchNum(0);
        currentPageRef.current = 0;
        setCurrentPage(currentPageRef.current); // 페이지 초기화
        return newIndex;
      });
    } else {
      handleNextPage();
    }
    index.current = 3;
  };
  
  const handlePrevButton = () => {
    if (currentPageRef.current === 0) {
      setBrailleIndex((prevIndex) => {
        let newIndex = prevIndex - 1;
        if (newIndex < 0) newIndex = brailleSymbols.length - 1;
        brailleIndexRef.current = newIndex;
        const select = whatDot(brailleList[newIndex]);
        const pronunciation = getPronunciation(category, brailleSymbols[newIndex]);
        const message = `이전 ${category}은 ${pronunciation} 입니다. ${select} 입니다.`;
        speech(message);
        setTouchNum(0);
        inputBraille = new Array(brailleList[newIndex].length).fill(0);
        currentPageRef.current = 0;
        setCurrentPage(currentPageRef.current); // 페이지 초기화
        return newIndex;
      });
    } else {
      handlePrevPage();
    }
    index.current = 3;
  };
  

  const onSwipeLeft = () => {
    index.current = (index.current - 1 + menuList.length) % menuList.length;
    menuList[index.current].speech();
  };

  // Right Swipe 이벤트 처리  
  const onSwipeRight = () => {
    index.current = (index.current + 1) % menuList.length;
    menuList[index.current].speech();
  };

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

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderGrant: (evt) => {
        const now = Date.now();
        const touches = evt.nativeEvent.touches;
        if (touches.length === 1) {
          const touch = touches[0];
          const index = getTouchedAreaIndex(touch.pageX, touch.pageY);
          if (touch.pageX >= nextButton.x + 50 && touch.pageY <= nextButton.y) {
            if (currentPageRef.current >= maxPageRef.current) {
              if (now - lastTapRef.current < 300) {
                goToNextBraille();
              }
              else {
                const message = "다음";
                speech(message);
              }
            } 
            else {
              if (now - lastTapRef.current < 300) {
                handleNextPage();
              }
              else {
                const message = "다음";
                speech(message);
              }
            }
          } 
          else if (touch.pageX < prevButton.x && touch.pageY <= prevButton.y ) {
            if (currentPageRef.current === 0) {
              if (now - lastTapRef.current < 300) {
                goToPrevBraille();
              }
              else {
                const message = "이전";
                speech(message);
              }
            } 
            else {
              if (now - lastTapRef.current < 300) {
                handlePrevPage();
              }
              else {
                const message = "이전";
                speech(message);
              }
            }
          }
          else if (touch.pageX <= nextButton.x && touch.pageX >= prevButton.x && touch.pageY <= prevButton.y) {
            if (now - lastTapRef.current < 300) {}
            else {
              brailleCheck(brailleIndexRef);
            }
          } 
          else if (lastTapRef.current && now - lastTapRef.current < 300) {
            handleDoubleTap(index);
          }
          lastTapRef.current = now;
          setLastTap(now);
        }
      },
      onPanResponderMove: (evt) => {
        const touches = evt.nativeEvent.touches;
        touches.forEach((touch) => {
          const index = getTouchedAreaIndex(touch.pageX, touch.pageY);
          // console.log(`Touched area index: ${index}, X : ${touch.pageX}, Y : ${touch.pageY}`);
          if (index !== -1 && !speakIndex[index]) {
            const message = speakMessages[index];
            speech(message);
            for (var i = 0; i < 6; ++i) {
              if (i != index) {
                speakIndex[i] = false;
              }
            }
            speakIndex[index] = true;
          }
        });
      },
    })
  ).current;

return (
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
      <View style={styles.content}>
          { /* Top 1/3 */}
          <GestureRecognizer 
              onSwipeLeft={onSwipeLeft}
              onSwipeRight={onSwipeRight}
              config={{
                  velocityThreshold: 0.1,
                  directionalOffsetThreshold: 80
              }}
              style={{ flex: 1 }}>
              <TouchableOpacity style={styles.top} onPress={handleDoubleTouch} activeOpacity={1}>
                  <TouchableOpacity onPress={() => handlePressButton('이전')}>
                      <Text style={styles.text}>이전</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => handlePressButton('묵자')}>
                      <Text style={styles.symbol}>{brailleSymbols[brailleIndexRef.current]}</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => handlePressButton('다음')}>
                      <Text style={styles.text}>다음</Text>
                  </TouchableOpacity>
              </TouchableOpacity>
          </GestureRecognizer>

          { /* Bottom 2/3 */}
          <View {...panResponder.panHandlers} style={styles.bottom} >
              {points.map((point, _) => (
                  <View key={point.index} style={styles.dotContainer}>
                      <View style={[
                        styles.dot,
                        brailleList[brailleIndexRef.current][point.index + (6 * currentPageRef.current)] === 1 ? { backgroundColor: 'red' } : { backgroundColor: 'black' }
                      ]} />
                  </View>
              ))}
          </View>
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
      padding: 15,
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
  },
  top: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-around',
  },
  text: {
      fontSize: 24,
      fontWeight: 'bold',
      marginTop: '20%',
  },
  symbol: {
      fontSize: 36,
      fontWeight: 'bold',
      marginTop: '20%',
  },
  bottom: {
      flex: 2,
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'space-around',
  },
  dotContainer: {
      width: '50%',
      height: '33.3%',
      alignItems: 'center',
      justifyContent: 'center',
  },
  dot: {
      width: 80,
      height: 80,
      borderRadius: 50,
      backgroundColor: 'black',
  },
});

export default BrailleWritter;