import React from "react";
import BrailleScreen from '../../../components/BrailleScreen'; 

const steps = [
  { name: "학습하기", screen: "AbbreviationWritter3" },
  { name: "시험보기", screen: "" },
];

const WriteAbbreviation3 = () => {
  return <BrailleScreen steps={steps} />;
};

export default WriteAbbreviation3;
