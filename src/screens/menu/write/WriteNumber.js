import React from "react";
import BrailleScreen from '../../../components/BrailleScreen'; 

const steps = [
  { name: "학습하기", screen: "NumberWritter" },
  { name: "시험보기", screen: "" },
];

const WriteNumber = () => {
  return <BrailleScreen steps={steps} />;
};

export default WriteNumber;
