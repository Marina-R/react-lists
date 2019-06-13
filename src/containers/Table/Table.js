import React from 'react';
import Geocode from 'react-geocode';

import Header from '../../components/Layout/Header/Header';
import List from '../../components/List/List';
import MapWithMarker from '../../components/Map';
import { prepareOptions, parseAddress } from '../../utils/helpers';
import './Table.css';

//TODO:
// 1. use Redux;
// 2. Split logic into different containers, so for ex. countries wont re-render on city click;
// 3. Fix Google Maps API restrictions
class Table extends React.PureComponent {
    state = {
        sortedCountries: [],
        sortedCities: [],
        sortedCompanies: [],
        country: '',
        city: '',
        company: '',
        position: {
            lat: -34.397, //Random values for testing purposes
            lng: 150.644
        }
    };

    componentWillMount() {
        const countries = prepareOptions('Country');
        const cities = prepareOptions('City', 'Country', countries[0]);
        const companies = prepareOptions('CompanyName', 'City', cities[0]);

        this.setState({
            sortedCountries: countries,
            sortedCities: cities,
            sortedCompanies: companies,
        });
        Geocode.setApiKey('AIzaSyAetFJ6vLep_cjVElUcKNsriWkzUlSMsG0');
    }

    prepareCities = input => this.setState({ sortedCities: prepareOptions('City', 'Country', input) });
    prepareCompanies = input => this.setState({ sortedCompanies: prepareOptions('CompanyName', 'City', input) });
    fetchCompanies = city => this.prepareCompanies(city);

    handleCountrySelect = name => {
        this.setState({ country: name });
        const cities = prepareOptions('City', 'Country', name);
        this.prepareCities(name);
        this.fetchCompanies(cities[0]);
    };

    handleCitySelect = name => {
        this.setState({ city: name});
        this.fetchCompanies(name);
    };

    handleCompanySelect = name => {
        this.setState({company: name});
        const address = parseAddress(name);
        this.setState({ mapAddress: address }, this.handleMapUpdate(address));
    };

    handleMapUpdate = address => {
        Geocode.fromAddress(address).then(
            response => {
                const {lat, lng} = response.results[0].geometry.location;
                this.setState({
                    position: { lat: lat, lng: lng }
                });
                console.log('lat, lng', lat, lng);
            },
            error => console.error('ERROR', error)
        );
    };

    render() {
        const { sortedCountries, sortedCities, sortedCompanies, city, country, company, mapAddress, position } = this.state;

        return (
            <section className='table'>
                <Header/>
                <div className='table-columns'>
                    <List data={sortedCountries} selectedValue={country} onClick={this.handleCountrySelect} />
                    <List data={sortedCities} selectedValue={city} onClick={this.handleCitySelect} />
                    <List data={sortedCompanies} selectedValue={company} onClick={this.handleCompanySelect} />
                    <MapWithMarker
                        googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyACtFWeVQlkY4odTUdwsmu24DzVWAJ3sFo&v=3.exp&libraries=geometry,drawing,places"
                        loadingElement={<div style={{height: `100%`}}/>}
                        containerElement={<div style={{height: `325px`, width: `500px`}}/>}
                        mapElement={<div style={{height: `100%`}}/>}
                        address={mapAddress}
                        position={position}
                    />
                </div>
            </section>
        );
    }
}

export default Table;