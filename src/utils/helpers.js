export const prepareOptions = (data, key, option, selectedOption) => {
    const options = [];
    data.map(item => item[option] === selectedOption || key === 'Country' ? options.push(item[key]) : false);

    // Count number of their appearance
    let appearance = {};
    options.forEach(item => appearance[item] = (appearance[item] || 0) + 1);

    //Sort them alphabetically
    const sortedAZ = {};
    Object.keys(appearance).sort().forEach(key => sortedAZ[key] = appearance[key]);

    // Sort by appearance number
    let sortedByAppearance = [];
    for (let value in sortedAZ) {
        sortedByAppearance.push([value, sortedAZ[value]]);
    }
    // Reduce sorted by appearance to array of countries only
    return sortedByAppearance.sort((a, b) => b[1] - a[1]).reduce((acc, curr) => acc.concat(curr[0]), []);
};