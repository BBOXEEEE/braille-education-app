import React from "react";
import BrailleScreen from '../../../components/BrailleScreen'; 

const steps = [
  { name: "학습하기", screen: "AbbreviationWritter2" },
  { name: "시험보기", screen: "AbbreviationWTester2" },
];

const WriteAbbreviation2 = () => {
  return <BrailleScreen steps={steps} />;
};

export default WriteAbbreviation2;
