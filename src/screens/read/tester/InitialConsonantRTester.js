import BrailleRTester from '../../../components/BrailleRTester';
import BrailleList from '../../../constants/BrailleList';

const braille = BrailleList.INITIAL_CONSONANT;
const category = braille.category;;
const brailleSymbols = braille.symbols;
const brailleList = braille.brailleList;

const InitialConsonantRTester = () => {
    return <BrailleRTester category={category} brailleSymbols={brailleSymbols} brailleList={brailleList} />;
};

export default InitialConsonantRTester;