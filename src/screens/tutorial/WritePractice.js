import BrailleWriter from '../../components/BrailleWritter';

const WritePractice = ({ route }) => {
    const category = route.params.category;
    const brailleSymbols = route.params.brailleSymbols;
    const brailleList = route.params.brailleList;

    return <BrailleWriter category={category} brailleSymbols={brailleSymbols} brailleList={brailleList} />;
};

export default WritePractice;