import React from 'react';
import BrailleScreen from '../../../components/BrailleScreen'; 

const steps = [
  { name: '학습하기', screen: 'AbbreviationReader3' },
  { name: '시험보기', screen: 'AbbreviationRTester3' }
];

const ReadAbbreviation3 = () => {
  return <BrailleScreen steps={steps} />;
};

export default ReadAbbreviation3;
