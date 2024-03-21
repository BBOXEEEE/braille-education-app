import BrailleWritter from "../../components/BrailleWritter";
import BrailleList from "../../constants/BrailleList";

const initialConsonant = BrailleList.ABBREVIATION_SECOND;
const category = initialConsonant.category;
const brailleSymbols = initialConsonant.symbols;
const brailleList = initialConsonant.braille;

const AbbreviationWritter2 = () => {
  return (
    <BrailleWritter
      category={category}
      brailleSymbols={brailleSymbols}
      brailleList={brailleList}
    />
  );
};

export default AbbreviationWritter2;
