import React, { useRef, useState, useEffect } from "react";
import { StyleSheet, View, PanResponder, Text } from "react-native";
import * as Speech from "expo-speech";
import { Dimensions } from "react-native";
import getRandomBrailleIndex from './RandomBrailleGenerator';

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

const nextButton = { x: window.width * 2 / 3, y: window.height / 3 };
const prevButton = { x: window.width / 3 , y: window.height / 3 };
let randomIndex = [];
const speakMessages = ["4점", "5점", "6점", "1점", "2점", "3점"];
var speakIndex = [false, false, false, false, false, false];

const BrailleWTester = ({ category, brailleSymbols, brailleList }) => {
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

  useEffect(() => {
    Speech.speak(
      "점자 쓰기 시험입니다. 1점부터 6점까지 터치하여 점자를 입력하세요.    ",
      {
        rate: 1.5,
      }
    );
    randomIndex = getRandomBrailleIndex(brailleList);
    inputBraille = new Array(brailleList[randomIndex[brailleIndex]].length).fill(0);
    Speech.speak(
      ` ${category}, ${brailleSymbols[randomIndex[brailleIndex]]} 입니다. `,
      {
        rate: 1.5,
      }
    );
  }, []);

  useEffect(() => {
    brailleIndexRef.current = brailleIndex;
    const currentBrailleLength = brailleList[randomIndex[brailleIndex]].length;
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

  const handleDoubleTap = (index) => {
    const currentBrailleIndex = brailleIndexRef.current;
    var pageIndex = index + currentPageRef.current * 6;
    console.log(`Double tap on index: ${pageIndex}, index ${index}`);
    if (index >= 3 && index <= 5) {
      pageIndex -= 3;
    } else {
      pageIndex += 3;
    }
    console.log(pageIndex);
    inputBraille[pageIndex] = 1;

    const brailleOne = brailleOneNum(currentBrailleIndex);
    touchNum++;
    console.log(inputBraille, brailleList[randomIndex[currentBrailleIndex]]);

    if (brailleOne == touchNum) {
      if (!isCorrect(inputBraille, brailleList[randomIndex[currentBrailleIndex]])) {
        Speech.speak("잘못된 입력 입니다. 다시 입력하세요.", {
          rate: 1.5,
        });
        inputBraille = new Array(brailleList[randomIndex[currentBrailleIndex]].length).fill(
          0
        );
        touchNum = 0;
      } else {
        Speech.speak("정답 입니다! ", {
          rate: 1.5,
        });
        touchNum = 0;
      }
    }
  };

  const brailleOneNum = (currentBrailleIndex) => {
    var num = 0;
    for (var i = 0; i < brailleList[randomIndex[currentBrailleIndex]].length; i++) {
      if (brailleList[randomIndex[currentBrailleIndex]][i] == 1) num += 1;
    }
    return num;
  };

  const isCorrect = (input, result) => {
    for (var i = 0; i < input.length; i++) {
      if (input[i] != result[i]) return false;
    }
    return true;
  };

  const brailleCheck = (currentIndex) => {
    const select = whatDot(brailleList[randomIndex[currentIndex.current]]);
    console.log(` ${category}, ${brailleSymbols[randomIndex[currentIndex.current]]}은 ${select} 입니다. `);
    Speech.speak(` ${category} ${brailleSymbols[randomIndex[currentIndex.current]]}은 ${select} 입니다. `, {
      rate: 1.5,
    });
  };

  const whatDot = (braille) => {
    var str = "";
    for (var i = 0; i < braille.length; i++) {
      if (i != 0 && i % 6 == 0) {
        str += " 점, ";
      }
      if (braille[i] == 1) {
        if (i <= 5) {
          str += `${i + 1} `;
        } 
        else {
          str += `${i - 5} `;
        }
      }
    }
    str += " 점, ";
    return str;
  };

  // 페이지 이동 함수
  const handleNextPage = () => {
    setCurrentPage((prevPage) => {
      const nextPage = Math.min(prevPage + 1, maxPageRef.current);
      Speech.speak("다음 칸 입니다. ", {
        rate: 1.5,
      });
      return nextPage;
    });
  };

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => {
      const prevPageCalculated = Math.max(prevPage - 1, 0);
      Speech.speak("이전 칸 입니다. ", {
        rate: 1.5,
      });
      return prevPageCalculated;
    });
  };

  // 자음 인덱스 이동 함수
  const goToNextBraille = () => {
    setBrailleIndex((prevIndex) => {
      const newIndex = (prevIndex + 1) % randomIndex.length;
      Speech.speak(`다음 ${category} 은 `, {
        rate: 1.5,
      });
      Speech.speak(` ${brailleSymbols[randomIndex[newIndex]]} 입니다. `, {
        rate: 1.5,
      });
      inputBraille = new Array(brailleList[randomIndex[newIndex]].length).fill(0);
      return newIndex;
    });
  };

  const goToPrevBraille = () => {
    setBrailleIndex((prevIndex) => {
      let newIndex = prevIndex - 1;
      if (newIndex < 0) newIndex = randomIndex.length - 1;
      Speech.speak(`이전 ${category} 은 `, {
        rate: 1.5,
      });
      Speech.speak(` ${brailleSymbols[randomIndex[newIndex]]} 입니다. `, {
        rate: 1.5,
      });
      inputBraille = new Array(brailleList[randomIndex[newIndex]].length).fill(0);
      return newIndex;
    });
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
          if (touch.pageX >= nextButton.x && touch.pageY <= nextButton.y) {
            if (currentPageRef.current >= maxPageRef.current) {
              console.log("다음");
              if (now - lastTapRef.current < 300) {
                goToNextBraille();
              }
              else {
                Speech.speak("다음", { rate: 1.5 });
              }
            } 
            else {
              if (now - lastTapRef.current < 300) {
                handleNextPage();
              }
              else {
                Speech.speak("다음", { rate: 1.5 });
              }
            }
          } 
          else if ( touch.pageX <= prevButton.x && touch.pageY <= prevButton.y) {
            if (currentPageRef.current === 0) {
              console.log("이전");
              if (now - lastTapRef.current < 300) {
                goToPrevBraille();
              }
              else {
                Speech.speak("이전", { rate: 1.5 });
              }
            } 
            else {
              if (now - lastTapRef.current < 300) {
                handlePrevPage();
              }
              else {
                Speech.speak("이전", { rate: 1.5 });
              }
            }
          } 
          else if (touch.pageX <= nextButton.x && touch.pageX >= prevButton.x && touch.pageY <= prevButton.y) {
            console.log("정답확인");
            if (now - lastTapRef.current < 300) {
              brailleCheck(brailleIndexRef);
            }
            else {
              Speech.speak("정답확인", { rate: 1.5 });  
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
          console.log(
            `Touched area index: ${index}, X : ${touch.pageX}, Y : ${touch.pageY}`
          );
          if (index !== -1 && !speakIndex[index]) {
            Speech.speak(speakMessages[index], {
              rate: 1.5,
            });
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
    <View {...panResponder.panHandlers} style={styles.container}>
    { /* Top 1/3 */}
    <View style={styles.top}>
        <Text style={styles.text}>이전</Text>
        <Text style={styles.text}>정답확인</Text>
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
  );
};

const styles = StyleSheet.create({
  container: {
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
      marginTop: 150,
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

export default BrailleWTester;
