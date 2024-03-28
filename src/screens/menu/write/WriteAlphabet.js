import React from "react";
import BrailleScreen from '../../../components/BrailleScreen'; 

const steps = [
  { name: "학습하기", screen: "AlphabetWritter" },
  { name: "시험보기", screen: "AlphabetWTester" },
];

const WriteAlphabet = () => {
  return <BrailleScreen steps={steps} />;
};

export default WriteAlphabet;
