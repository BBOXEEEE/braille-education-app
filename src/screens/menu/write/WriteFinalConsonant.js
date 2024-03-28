import React from "react";
import BrailleScreen from '../../../components/BrailleScreen'; 

const steps = [
  { name: "학습하기", screen: "FinalConsonantWritter" },
  { name: "시험보기", screen: "FinalConsonantWTester" },
];

const WriteFinalConsonant = () => {
  return <BrailleScreen steps={steps} />;
};

export default WriteFinalConsonant;
