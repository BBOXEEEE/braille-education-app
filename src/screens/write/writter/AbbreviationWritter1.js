import BrailleWritter from "../../../components/BrailleWritter";
import BrailleList from "../../../constants/BrailleList";

const braille = BrailleList.ABBREVIATION_FIRST;
const category = braille.category;
const brailleSymbols = braille.symbols;
const brailleList = braille.brailleList;

const AbbreviationWTester1 = () => {
  return (
    <BrailleWritter
      category={category}
      brailleSymbols={brailleSymbols}
      brailleList={brailleList}
    />
  );
};

export default AbbreviationWTester1;
