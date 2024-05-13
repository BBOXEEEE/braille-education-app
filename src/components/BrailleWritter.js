import React, { useRef, useState, useEffect } from "react";
import { useNavigation } from '@react-navigation/native';
import { StyleSheet, View, PanResponder, Text, SafeAreaView, TouchableOpacity } from "react-native";
import { useTTS } from "./TTSContext";
import { Dimensions } from "react-native";

const window = Dimensions.get("window");
const points = [
  {
    x: 0,
    y: window.height / 3,
    width: window.width / 2,
    height: (window.height * 2) / 9,
  },
  {
    x: 0,
    y: (window.height * 5) / 9,
    width: window.width / 2,
    height: (window.height * 2) / 9,
  },
  {
    x: 0,
    y: (window.height * 7) / 9,
    width: window.width / 2,
    height: (window.height * 2) / 9,
  },
  {
    x: window.width / 2,
    y: window.height / 3,
    width: window.width / 2,
    height: (window.height * 2) / 9,
  },
  {
    x: window.width / 2,
    y: (window.height * 5) / 9,
    width: window.width / 2,
    height: (window.height * 2) / 9,
  },
  {
    x: window.width / 2,
    y: (window.height * 7) / 9,
    width: window.width / 2,
    height: (window.height * 2) / 9,
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

const speakMessages = ["4점", "5점", "6점", "1점", "2점", "3점"];
var speakIndex = [false, false, false, false, false, false];

const BrailleWritter = ({ category, brailleSymbols, brailleList }) => {
  const { speech } = useTTS();
  const [brailleIndex, setBrailleIndex] = useState(0);
  const [lastTap, setLastTap] = useState(null);
  const brailleIndexRef = useRef(brailleIndex);
  const lastTapRef = useRef(null);
  var inputBraille;
  var touchNum = 0;
  const [currentPage, setCurrentPage] = useState(0);
  const [maxPage, setMaxPage] = useState(0);
  const maxPageRef = useRef(maxPage);
  const currentPageRef = useRef(currentPage);
  const [previousTouchTime, setPreviousTouchTime] = useState(null);
  const previousTouchTimeRef = useRef(null);
  const navigation = useNavigation();

  useEffect(() => {
    const select = whatDot(brailleList[brailleIndex]);
    inputBraille = new Array(brailleList[brailleIndex].length).fill(0);

    const message = `점자 쓰기입니다. 1점부터 6점까지 터치하여 점자를 입력하세요.
                    ${category}, ${brailleSymbols[brailleIndex]} 입니다. ${select} 입니다.`;
    speech(message);
  }, []);

  useEffect(() => {
    brailleIndexRef.current = brailleIndex;
    const currentBrailleLength = brailleList[brailleIndex].length;
    const calculatedMaxPage = Math.ceil(currentBrailleLength / 6) - 1;
    setMaxPage(calculatedMaxPage);
    setCurrentPage(0);
  }, [brailleIndex]);

  useEffect(() => {
    maxPageRef.current = maxPage;
  }, [maxPage]);

  useEffect(() => {
    currentPageRef.current = currentPage;
  }, [currentPage]);

  useEffect(() => {
    previousTouchTimeRef.current = previousTouchTime;
  }, [previousTouchTimeRef])

  const handleDoubleTap = (index) => {
    const currentBrailleIndex = brailleIndexRef.current;
    var pageIndex = index + currentPageRef.current * 6;
    if (index >= 3 && index <= 5) {
      pageIndex -= 3;
    } else {
      pageIndex += 3;
    }
    inputBraille[pageIndex] = 1;

    const brailleOne = brailleOneNum(currentBrailleIndex);
    touchNum++;

    if (brailleOne == touchNum) {
      if (!isCorrect(inputBraille, brailleList[currentBrailleIndex])) {
        const message = "잘못된 입력 입니다. 다시 입력하세요.";
        speech(message);
        inputBraille = new Array(brailleList[currentBrailleIndex].length).fill(
          0
        );
        touchNum = 0;
      } else {
        const message = "올바른 입력 입니다.";
        speech(message);
        touchNum = 0;
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
      return nextPage;
    });
  };

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => {
      const prevPageCalculated = Math.max(prevPage - 1, 0);
      const message = "이전 칸 입니다.";
      speech(message);
      return prevPageCalculated;
    });
  };

  // 자음 인덱스 이동 함수
  const goToNextBraille = () => {
    setBrailleIndex((prevIndex) => {
      const newIndex = (prevIndex + 1) % brailleSymbols.length;
      const select = whatDot(brailleList[newIndex]);
      const message = `다음 ${category} 은 ${brailleSymbols[newIndex]} 입니다. ${select} 입니다.`;
      speech(message);
      
      inputBraille = new Array(brailleList[newIndex].length).fill(0);
      return newIndex;
    });
  };

  const goToPrevBraille = () => {
    setBrailleIndex((prevIndex) => {
      let newIndex = prevIndex - 1;
      if (newIndex < 0) newIndex = brailleSymbols.length - 1;
      const select = whatDot(brailleList[newIndex]);
      const message = `이전 ${category} 은 ${brailleSymbols[newIndex]} 입니다. ${select} 입니다.`;
      speech(message);

      inputBraille = new Array(brailleList[newIndex].length).fill(0);
      return newIndex;
    });
  };

  const brailleCheck = (currentIndex) => {
    const select = whatDot(brailleList[currentIndex.current]);
    const message = ` 현재 쓰고 있는 점자는 ${category} ${brailleSymbols[currentIndex.current]} 입니다. ${select} 입니다.`;
    speech(message);
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
            if (now - lastTapRef.current < 300) {
              brailleCheck(brailleIndexRef);
            }
            else {
              const message = "정답확인";
              speech(message);
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
      <View {...panResponder.panHandlers} style={styles.content}>
        { /* Top 1/3 */}
        <View style={styles.top}>
          <Text style={styles.text}>이전</Text>
          <Text style={styles.symbol}>{brailleSymbols[brailleIndex]}</Text>
          <Text style={styles.text}>다음</Text>
        </View>
        
        { /* Bottom 2/3 */}
        <View  style={styles.bottom} >
          {points.map((_, index) => (
             <View key={index} style={styles.dotContainer}>
              <View style={styles.dot} />
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
      flexWrap: 'wrap',
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
