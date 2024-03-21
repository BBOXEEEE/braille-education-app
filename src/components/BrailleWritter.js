import React, { useRef, useState, useEffect } from "react";
import { StyleSheet, View, PanResponder, Text } from "react-native";
import * as Speech from "expo-speech";
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

const nextButton = { x: window.width / 2 + 50, y: window.height / 3 };
const prevButton = { x: window.width / 2 - 50, y: window.height / 3 };

const speakMessages = ["4점", "5점", "6점", "1점", "2점", "3점"];
var speakIndex = [false, false, false, false, false, false];

const BrailleWritter = ({ category, brailleSymbols, brailleList }) => {
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
      "점자 쓰기입니다. 1점부터 6점까지 터치하여 점자를 입력하세요.",
      {
        rate: 1.5,
      }
    );
    const select = whatDot(brailleList[brailleIndex]);
    inputBraille = new Array(brailleList[brailleIndex].length).fill(0);
    Speech.speak(
      ` ${category}, ${brailleSymbols[brailleIndex]} 입니다. ${select} 입니다. `,
      {
        rate: 1.5,
      }
    );
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
    console.log(inputBraille, brailleList[currentBrailleIndex]);

    if (brailleOne == touchNum) {
      if (!isCorrect(inputBraille, brailleList[currentBrailleIndex])) {
        Speech.speak("잘못된 입력 입니다. 다시 입력하세요.", {
          rate: 1.5,
        });
        inputBraille = new Array(brailleList[currentBrailleIndex].length).fill(
          0
        );
        touchNum = 0;
      } else {
        Speech.speak("올바른 입력 입니다.", {
          rate: 1.5,
        });
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
      if (braille[i] == 1) {
        if (i + 1 <= 6) {
          str += `${i + 1} 점, `;
        } else {
          str += `${Math.floor(i / 6) + 1} 번째 ${i - 5} 점, `;
        }
      }
    }
    return str;
  };

  // 페이지 이동 함수
  const handleNextPage = () => {
    setCurrentPage((prevPage) => {
      const nextPage = Math.min(prevPage + 1, maxPageRef.current);
      Speech.speak("다음 페이지입니다. ", {
        rate: 1.5,
      });
      return nextPage;
    });
  };

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => {
      const prevPageCalculated = Math.max(prevPage - 1, 0);
      console.log("왜 말을 안하냐 맞으래? ");
      Speech.speak("이전 페이지입니다. ", {
        rate: 1.5,
      });
      return prevPageCalculated;
    });
  };

  // 자음 인덱스 이동 함수
  const goToNextBraille = () => {
    setBrailleIndex((prevIndex) => {
      const newIndex = (prevIndex + 1) % brailleSymbols.length;
      Speech.speak(`다음 ${category} 은 `, {
        rate: 1.5,
      });
      const select = whatDot(brailleList[newIndex]);
      Speech.speak(` ${brailleSymbols[newIndex]} 입니다. ${select} 입니다. `, {
        rate: 1.5,
      });
      inputBraille = new Array(brailleList[newIndex].length).fill(0);
      return newIndex;
    });
  };

  const goToPrevBraille = () => {
    setBrailleIndex((prevIndex) => {
      let newIndex = prevIndex - 1;
      if (newIndex < 0) newIndex = brailleSymbols.length - 1;
      Speech.speak(`이전 ${category} 은 `, {
        rate: 1.5,
      });
      const select = whatDot(brailleList[newIndex]);
      Speech.speak(` ${brailleSymbols[newIndex]} 입니다. ${select} 입니다. `, {
        rate: 1.5,
      });
      inputBraille = new Array(brailleList[newIndex].length).fill(0);
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
          if (touch.pageX >= nextButton.x + 50 && touch.pageY <= nextButton.y) {
            // 현재 페이지가 마지막 페이지이면, 다음 자음으로 이동
            console.log(currentPageRef.current, maxPageRef.current);
            if (currentPageRef.current >= maxPageRef.current) {
              goToNextBraille();
            } else {
              handleNextPage(); // 다음 페이지로
            }
          } else if (
            touch.pageX < prevButton.x &&
            touch.pageY <= prevButton.y
          ) {
            // 현재 페이지가 첫 페이지이면, 이전 자음으로 이동
            console.log(currentPageRef.current, maxPageRef.current);
            if (currentPageRef.current === 0) {
              goToPrevBraille();
            } else {
              handlePrevPage(); // 이전 페이지로
            }
          } else if (lastTapRef.current && now - lastTapRef.current < 300) {
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
    <View style={styles.container} {...panResponder.panHandlers}>
      {points.map((point, index) => (
        <View
          key={index}
          style={[
            styles.point,
            {
              left: point.x + point.width / 2 - 30,
              top: point.y + point.height / 2 - 30,
            },
          ]}
        />
      ))}
      {/* 첫 번째 영역의 중간 지점에 Text 컴포넌트를 추가하여 brailleSimbols[0] 값을 표시 */}
      <Text style={styles.buttonText}>{brailleSymbols[brailleIndex]}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  point: {
    position: "absolute",
    width: 60,
    height: 60,
    backgroundColor: "black",
    borderRadius: 30,
  },
  buttonText: {
    position: "absolute",
    left: window.width / 2 - 20,
    top: window.height / 3 / 2,
    color: "black",
    fontSize: 50,
  },
});

export default BrailleWritter;
