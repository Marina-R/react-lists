import React, { useState, useEffect } from 'react';
// import PropTypes from 'prop-types';
import Header from '../../components/Layout/Header/Header';
import List from '../../components/List/List';
import MapWithMarker from '../Map';
import clients from '../../utils/content/clients';
import { prepareOptions } from "../../utils/helpers";
import './Table.css';

class Table extends React.PureComponent {
    state = {

    };

    const data = clients.Customers;

    const sortedCountries = prepareOptions(data, 'Country');
    const [ country, setCountry ] = useState(sortedCountries);

    let sortedCities = prepareOptions(data, 'City', 'Country', sortedCountries[0]);
    const [ cities, setCities ] = useState(sortedCities[0]);

    let sortedCompanies = prepareOptions(data, 'CompanyName', 'City', cities[0]);
    const [ companies, setCompanies ] = useState(sortedCompanies[0]);

    const [ city, setCity ] = useState(sortedCities[0]);
    const [ company, setCompany ] = useState(sortedCompanies[0]);

    useEffect(() => {
        let sortedCompanies = prepareOptions(data, 'CompanyName', 'City', sortedCities[0]);
        console.log('sortedCities', sortedCities);
        console.log('sortedCompanies', sortedCompanies);

    });
    const onCountrySelect = item => {
        setCountry(item);
    }
    const onCitySelect = item => {
        console.log('test', sortedCities[0])
        setCity(item);
    }
    const onCompanySelect = item => setCompany(item);

    const handleCountrySelect = e => onCountrySelect(e.target.innerText);
    const handleCitySelect = e => onCitySelect(e.target.innerText);
    const handleCompanySelect = e => onCompanySelect(e.target.innerText);

    return (
        <section className='table'>
            <Header />
            <div className='table-columns'>
                <List data={sortedCountries} onClick={handleCountrySelect} />
                <List data={sortedCities} onClick={handleCitySelect} />
                <List data={sortedCompanies} onClick={handleCompanySelect} />
                <MapWithMarker
                    googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyAetFJ6vLep_cjVElUcKNsriWkzUlSMsG0&v=3.exp&libraries=geometry,drawing,places"
                    loadingElement={<div style={{ height: `100%` }} />}
                    containerElement={<div style={{ height: `325px`, width: `500px` }} />}
                    mapElement={<div style={{ height: `100%` }} />}
                />
                <span>Company {company}</span>
            </div>
        </section>
    );
}

export default Table;