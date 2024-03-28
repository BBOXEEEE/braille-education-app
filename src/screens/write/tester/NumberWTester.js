import BrailleWTester from "../../../components/BrailleWTester";
import BrailleList from "../../../constants/BrailleList";

const braille = BrailleList.INITIAL_CONSONANT;
const category = braille.category;
const brailleSymbols = braille.symbols;
const brailleList = braille.brailleList;

const NumberWTester = () => {
  return (
    <BrailleWTester
      category={category}
      brailleSymbols={brailleSymbols}
      brailleList={brailleList}
    />
  );
};

export default NumberWTester;
