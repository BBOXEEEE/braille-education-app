import BrailleRTester from '../../../components/BrailleRTester';
import BrailleList from '../../../constants/BrailleList';

const braille = BrailleList.FINAL_CONSONANT;
const category = braille.category;;
const brailleSymbols = braille.symbols;
const brailleList = braille.braille;

const FinalConsonantRTester = () => {
    return <BrailleRTester category={category} brailleSymbols={brailleSymbols} brailleList={brailleList} />;
};

export default FinalConsonantRTester;