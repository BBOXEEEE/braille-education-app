import BrailleReader from '../../components/BrailleReader';

const category = '약어 1단계';
const brailleSimbols = [
    '가', '나', '다', '라', '마', '바', '사', '자', '카', '타', '파', '하',
    '억', '언', '얼', '연', '열', '영', '옥', '온', '옹', '운', '울', '은', '을', '인', '것'
]
const brailleList = [
    
]

const AbbreviationReader1 = () => {
    return <BrailleReader category={category} brailleSymbols={brailleSimbols} brailleList={brailleList} />;
};

export default AbbreviationReader1;