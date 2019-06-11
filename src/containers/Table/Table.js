import React from 'react';
import Header from '../../components/Layout/Header/Header';
import List from '../../components/List/List';
import MapWithMarker from '../Map';
import { prepareOptions, parseAddress } from '../../utils/helpers';
import './Table.css';

//TODO: use Redux; find better way to handle selections;
class Table extends React.PureComponent {
    state = {
        sortedCountries: [],
        sortedCities: [],
        sortedCompanies: [],
        country: '',
        city: '',
        company: '',
    };

    componentWillMount() {
        const countries = prepareOptions('Country');
        const cities = prepareOptions('City', 'Country', countries[0]);
        const companies = prepareOptions('CompanyName', 'City', cities[0]);
        const address = parseAddress(companies[0]);

        this.setState({
            sortedCountries: countries,
            sortedCities: cities,
            sortedCompanies: companies,
            country: countries[0],
            city: cities[0],
            company: companies[0],
            mapAddress: address,
        });
    }

    prepareCities = input => this.setState({ sortedCities: prepareOptions('City', 'Country', input) });
    prepareCompanies = input => this.setState({ sortedCompanies: prepareOptions('CompanyName', 'City', input) });

    fetchCompanies = city => {
        const companies = prepareOptions('CompanyName', 'City', city);
        this.prepareCompanies(city);
        this.setState({ company: companies[0] });
        this.setState({ mapAddress: parseAddress(companies[0]) });
    };

    handleCountrySelect = name => {
        this.setState({ country: name });
        const cities = prepareOptions('City', 'Country', name);
        this.prepareCities(name);
        this.setState({ city: cities[0] });
        this.fetchCompanies(cities[0]);
    };

    handleCitySelect = name => {
        this.setState({ city: name});
        this.fetchCompanies(name);
    };

    handleCompanySelect = name => {
        this.setState({ company: name});
        this.setState({ mapAddress: parseAddress(name) });
    };

    render() {
        const { sortedCountries, sortedCities, sortedCompanies, city, country, company, mapAddress } = this.state;

        return (
            <section className='table'>
                <Header/>
                <div className='table-columns'>
                    <List data={sortedCountries} selectedValue={country} onClick={this.handleCountrySelect} />
                    <List data={sortedCities} selectedValue={city} onClick={this.handleCitySelect} />
                    <List data={sortedCompanies} selectedValue={company} onClick={this.handleCompanySelect} />
                    <MapWithMarker
                        googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyAetFJ6vLep_cjVElUcKNsriWkzUlSMsG0&v=3.exp&libraries=geometry,drawing,places"
                        loadingElement={<div style={{height: `100%`}}/>}
                        containerElement={<div style={{height: `325px`, width: `500px`}}/>}
                        mapElement={<div style={{height: `100%`}}/>}
                        address={mapAddress}
                    />
                </div>
            </section>
        );
    }
}

export default Table;