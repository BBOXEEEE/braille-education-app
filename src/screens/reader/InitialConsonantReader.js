import BrailleReader from '../../components/BrailleReader';

const category = '자음';
const brailleSimbols = ['ㄱ', 'ㄴ', 'ㄷ', 'ㄹ', 'ㅁ', 'ㅂ', 'ㅅ', 'ㅈ', 'ㅊ', 'ㅋ', 'ㅍ', 'ㅌ', 'ㅎ', 'ㄲ', 'ㄸ', 'ㅃ', 'ㅆ', 'ㅉ']
const brailleList = [
    [0, 0, 0, 1, 0, 0], // ㄱ
    [1, 0, 0, 1, 0, 0], // ㄴ
    [0, 1, 0, 1, 0, 0], // ㄷ
    [0, 0, 0, 0, 1, 0], // ㄹ
    [1, 0, 0, 0, 1, 0], // ㅁ
    [0, 0, 0, 1, 1, 0], // ㅂ
    [0, 0, 0, 0, 0, 1], // ㅅ
    [0, 0, 0, 1, 0, 1], // ㅈ
    [0, 0, 0, 0, 1, 1], // ㅊ
    [1, 1, 0, 1, 0, 0], // ㅋ
    [1, 1, 0, 0, 1, 0], // ㅍ
    [1, 0, 0, 1, 1, 0], // ㅌ
    [0, 1, 0, 1, 1, 0], // ㅎ
    [0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0], // ㄲ
    [0, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 0], // ㄸ
    [0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 1, 0], // ㅃ
    [0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1], // ㅆ
    [0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1]  // ㅉ
]

const InitialConsonantReader = () => {
    return <BrailleReader category={category} brailleSymbols={brailleSimbols} brailleList={brailleList} />;
};

export default InitialConsonantReader;