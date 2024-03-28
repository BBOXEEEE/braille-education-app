import BrailleWTester from "../../../components/BrailleWTester";
import BrailleList from "../../../constants/BrailleList";

const braille = BrailleList.ABBREVIATION_SECOND;
const category = braille.category;
const brailleSymbols = braille.symbols;
const brailleList = braille.brailleList;

const InitialConsonantWTester = () => {
  return (
    <BrailleWTester
      category={category}
      brailleSymbols={brailleSymbols}
      brailleList={brailleList}
    />
  );
};

export default InitialConsonantWTester;
