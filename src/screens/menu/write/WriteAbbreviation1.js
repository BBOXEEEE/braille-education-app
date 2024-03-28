import React from "react";
import BrailleScreen from '../../../components/BrailleScreen'; 

const steps = [
  { name: "학습하기", screen: "AbbreviationWritter1" },
  { name: "시험보기", screen: "AbbreviationWTester1" },
];

const WriteAbbreviation1 = () => {
  return <BrailleScreen steps={steps} />;
};

export default WriteAbbreviation1;
