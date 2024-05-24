import React from 'react';
import BrailleScreen from '../../../components/BrailleScreen'; 
import { useTTS } from '../../../components/TTSContext';

const ReadAbbreviation2 = ({ navigation }) => {
  const { speech } = useTTS();

  // 메뉴 버튼
  const buttons = ['학습하기', '시험보기'];

  // Swipe Gesture 로 탐색할 목록
  const menuList = [
    { 'name': '뒤로가기', speech: () => speech('뒤로가기'), action: () => navigation.goBack() },
    { 'name': '점자랑', speech: () => speech('점자랑'), action: () => speech('점자랑') },
    { 'name': '학습하기', speech: () => speech('학습하기'), action: () => navigation.navigate('AbbreviationReader2') },
    { 'name': '시험보기', speech: () => speech('시험보기'), action: () => navigation.navigate('AbbreviationRTester2') }
  ];

  return <BrailleScreen buttons={buttons} menuList={menuList} />;
};

export default ReadAbbreviation2;
