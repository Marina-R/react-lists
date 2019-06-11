/* global google */
import React from 'react';
import { compose } from 'recompose';
import {
    withScriptjs,
    withGoogleMap,
    GoogleMap,
} from 'react-google-maps';
import MarkerWithLabel from "react-google-maps/lib/components/addons/MarkerWithLabel";
import Geocode from 'react-geocode';

const MapWithMarker = compose(
    withScriptjs,
    withGoogleMap
)(props => {
    // set Google Maps Geocoding API for purposes of quota management. Its optional but recommended.
    Geocode.setApiKey('AIzaSyAetFJ6vLep_cjVElUcKNsriWkzUlSMsG0');

    Geocode.fromAddress(props.address).then(
        response => {
            const { lat, lng } = response.results[0].geometry.location;
            console.log(lat, lng);
        },
        error => {
            console.error('world', error);
        }
    );

    return (
        <GoogleMap
            defaultZoom={15}
            defaultCenter={{lat: -34.397, lng: 150.644}}
        >
            <MarkerWithLabel
                position={{lat: -34.397, lng: 150.644}}
                labelAnchor={new google.maps.Point(0, 0)}
                labelStyle={{color: '#ef4b4b', fontSize: '18px'}}
            >
                <div>{props.address}</div>
            </MarkerWithLabel>
        </GoogleMap>
    );
});
export default MapWithMarker;