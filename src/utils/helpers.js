import clients from './content/clients';

export const prepareOptions = (key, option, selectedOption) => {
    const data = clients.Customers;
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

//Todo: change to fetch by id
export const parseAddress = companyName => {
    const data =  clients.Customers.filter(item => item['CompanyName'] === companyName)[0];
    const region = data['Region'] || '';
    return data.Address + ', ' + data['City'] + ', ' + region + ' ' + data['PostalCode']  + ', ' + data['Country'];
};