const getRandomBrailleIndex = (brailleList) => {
    const range = brailleList.length;
    const count = Math.floor(range / 2);
    let randomIndex = [];

    while(randomIndex.length < count) {
        const random = Math.floor(Math.random() * range);
        if (!randomIndex.includes(random)) { // using includes() for readability
            randomIndex.push(random);
        }
    }

    return randomIndex;
}

export default getRandomBrailleIndex;