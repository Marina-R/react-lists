/* global google */
import React from 'react';
import { compose } from 'recompose';
import {
    withScriptjs,
    withGoogleMap,
    GoogleMap,
} from 'react-google-maps';
import MarkerWithLabel from "react-google-maps/lib/components/addons/MarkerWithLabel";

const MapWithMarker = compose(
    withScriptjs,
    withGoogleMap
)(props =>
    <GoogleMap
        defaultZoom={15}
        defaultCenter={{ lat: -34.397, lng: 150.644 }}
    >
        <MarkerWithLabel
            position={{ lat: -34.397, lng: 150.644 }}
            labelAnchor={new google.maps.Point(0, 0)}
            labelStyle={{ color: '#ef4b4b', fontSize: '18px' }}
        >
            <div>{props.address || 'hello'}</div>
        </MarkerWithLabel>
    </GoogleMap>
);
export default MapWithMarker;