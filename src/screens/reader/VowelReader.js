import React, { useState, useEffect, useRef } from 'react';
import BrailleReader from '../../components/BrailleReader';

const category = '모음';
const brailleSimbols = ['ㅏ', 'ㅑ', 'ㅓ', 'ㅕ', 'ㅗ', 'ㅛ', 'ㅜ', 'ㅠ', 'ㅡ', 'ㅣ', 'ㅐ', 'ㅒ', 'ㅔ', 'ㅖ', 'ㅘ', 'ㅙ', 'ㅚ', 'ㅝ', 'ㅞ', 'ㅟ', 'ㅢ']
const brailleList = [
    [1, 1, 0, 0, 0, 1], // ㅏ
    [0, 0, 1, 1, 1, 0], // ㅑ
    [0, 1, 1, 1, 0, 0], // ㅓ
    [1, 0, 0, 0, 1, 1], // ㅕ
    [1, 0, 1, 0, 0, 1], // ㅗ
    [0, 0, 1, 1, 0, 1], // ㅛ
    [1, 0, 1, 1, 0, 0], // ㅜ
    [1, 0, 0, 1, 0, 1], // ㅠ
    [0, 1, 0, 1, 0, 1], // ㅡ
    [1, 0, 1, 0, 1, 0], // ㅣ
    [1, 1, 1, 0, 1, 0], // ㅐ
    [0, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 0], // ㅒ
    [1, 0, 1, 1, 1, 0], // ㅔ
    [0, 0, 1, 1, 0, 0], // ㅖ
    [1, 1, 1, 0, 0, 1], // ㅘ
    [1, 1, 1, 0, 0, 1, 1, 1, 1, 0, 1, 0], // ㅙ
    [1, 0, 1, 1, 1, 1], // ㅚ
    [1, 1, 1, 1, 0, 0], // ㅝ
    [1, 1, 1, 1, 0, 0, 1, 1, 1, 0, 1, 0], // ㅞ
    [1, 0, 1, 1, 0, 0, 1, 1, 1, 0, 1, 0], // ㅟ
    [0, 1, 0, 1, 1, 1] // ㅢ
]

const VowelReader = () => {
    return <BrailleReader category={category} brailleSymbols={brailleSimbols} brailleList={brailleList} />;
};

export default VowelReader;