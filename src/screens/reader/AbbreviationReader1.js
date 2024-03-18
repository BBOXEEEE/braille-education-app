import BrailleReader from '../../components/BrailleReader';

const category = '약어 1단계';
const brailleSimbols = [
    '가', '나', '다', '라', '마', '바', '사', '자', '카', '타', '파', '하',
];
const brailleList = [

]

const AbbreviationReader1 = () => {
    return <BrailleReader category={category} brailleSymbols={brailleSimbols} brailleList={brailleList} />;
};

export default AbbreviationReader1;