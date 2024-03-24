import BrailleReader from '../../../components/BrailleReader';
import BrailleList from '../../../constants/BrailleList';

const initialConsonant = BrailleList.FINAL_CONSONANT;
const category = initialConsonant.category;;
const brailleSymbols = initialConsonant.symbols;
const brailleList = initialConsonant.braille;

const FinalConsonantReader = () => {
    return <BrailleReader category={category} brailleSymbols={brailleSymbols} brailleList={brailleList} />;
};

export default FinalConsonantReader;