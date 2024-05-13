import React from 'react';
import BrailleScreen from '../../../components/BrailleScreen'; 

const steps = [
  { name: '학습하기', screen: '' },
  { name: '시험보기', screen: '' }
];

const ReadTutorial = () => {
  return <BrailleScreen steps={steps} />;
};

export default ReadTutorial;
