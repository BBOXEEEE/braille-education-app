import BrailleRTester from '../../../components/BrailleRTester';
import BrailleList from '../../../constants/BrailleList';

const braille = BrailleList.ABBREVIATION_THIRD;
const category = braille.category;;
const brailleSymbols = braille.symbols;
const brailleList = braille.braille;

const AbbreviationRTester3 = () => {
    return <BrailleRTester category={category} brailleSymbols={brailleSymbols} brailleList={brailleList} />;
};

export default AbbreviationRTester3;