import BrailleWritter from "../../../components/BrailleWritter";
import BrailleList from "../../../constants/BrailleList";

const braille = BrailleList.ABBREVIATION_FIRST;
const category = braille.category;
const brailleSymbols = braille.symbols;
const brailleList = braille.brailleList;

const AbbreviationWritter1 = () => {
  return (
    <BrailleWritter
      category={category}
      brailleSymbols={brailleSymbols}
      brailleList={brailleList}
    />
  );
};

export default AbbreviationWritter1;
