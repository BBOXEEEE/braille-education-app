import BrailleReader from '../../../components/BrailleReader';
import BrailleList from '../../../constants/BrailleList';

const initialConsonant = BrailleList.INITIAL_CONSONANT;
const category = initialConsonant.category;;
const brailleSymbols = initialConsonant.symbols;
const brailleList = initialConsonant.braille;

const InitialConsonantReader = () => {
    return <BrailleReader category={category} brailleSymbols={brailleSymbols} brailleList={brailleList} />;
};

export default InitialConsonantReader;