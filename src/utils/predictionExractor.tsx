export const extractData = (data: string) => {
    const dataObj: any = {
        probabilities: {
            floydMayweather: 'N/A',
            conorMcGregor: 'N/A',
        },
    };

    // Regex for extracting winning probabilities
    const probMatch = data.match(
        /### Hypothetical Future Match Probability:\n- \*\*Floyd Mayweather:\*\* (\d+%) probability of winning\n- \*\*Conor McGregor:\*\* (\d+%) probability of winning/
    );

    if (probMatch) {
        dataObj.probabilities = {
            floydMayweather: probMatch[1] || 'N/A',
            conorMcGregor: probMatch[2] || 'N/A',
        };
    }
    return dataObj;
};
