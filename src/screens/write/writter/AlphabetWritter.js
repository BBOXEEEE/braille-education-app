import BrailleWritter from "../../../components/BrailleWritter";
import BrailleList from "../../../constants/BrailleList";

const braille = BrailleList.ALPHABET;
const category = braille.category;
const brailleSymbols = braille.symbols;
const brailleList = braille.brailleList;

const AlphabetWritter = () => {
  return (
    <BrailleWritter
      category={category}
      brailleSymbols={brailleSymbols}
      brailleList={brailleList}
    />
  );
};

export default AlphabetWritter;
