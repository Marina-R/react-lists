/* global google */
import React from 'react';
import { compose } from 'recompose';
import { withScriptjs, withGoogleMap, GoogleMap } from 'react-google-maps';
import MarkerWithLabel from 'react-google-maps/lib/components/addons/MarkerWithLabel';

const MapWithMarker = compose(withScriptjs, withGoogleMap)(React.memo(props => {
    const { address, position } = props;

    return (
        <GoogleMap
            defaultZoom={1}
            defaultCenter={{lat: position.lat, lng: position.lng}}
        >
            <MarkerWithLabel
                zoom={1}
                position={{lat: position.lat, lng: position.lng}}
                labelAnchor={new google.maps.Point(0, 0)}
                labelStyle={{color: '#ef4b4b', fontSize: '18px'}}
            >
                <div>{address || ''}</div>
            </MarkerWithLabel>
        </GoogleMap>
    );
}));
export default MapWithMarker;