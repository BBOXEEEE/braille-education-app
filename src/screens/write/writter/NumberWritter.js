import BrailleWritter from "../../../components/BrailleWritter";
import BrailleList from "../../../constants/BrailleList";

const braille = BrailleList.NUMBER;
const category = braille.category;
const brailleSymbols = braille.symbols;
const brailleList = braille.brailleList;

const NumberWritter = () => {
  return (
    <BrailleWritter
      category={category}
      brailleSymbols={brailleSymbols}
      brailleList={brailleList}
    />
  );
};

export default NumberWritter;
