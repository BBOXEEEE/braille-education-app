import BrailleReader from '../../components/BrailleReader';

const ReadPractice = ({ route }) => {
    const category = route.params.category;
    const brailleSymbols = route.params.brailleSymbols;
    const brailleList = route.params.brailleList;

    return <BrailleReader category={category} brailleSymbols={brailleSymbols} brailleList={brailleList} />;
};

export default ReadPractice;