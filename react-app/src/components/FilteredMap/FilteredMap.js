/*global google*/
import { GoogleMap, useLoadScript, Marker, useJsApiLoader } from '@react-google-maps/api';
import React, { useEffect, useState, useRef, useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadKey } from '../../store/map';

const MultiMapView = ({ filteredBiz, apiKey }) => {
    const dispatch = useDispatch();

    const [ isLoaded, setIsLoad ] = useState(false);

    const mapRef = useRef();
    const onLoad = useCallback(map => (mapRef.current = map), [])

    console.log('filtered', filteredBiz)

    let coordinates = [];

    filteredBiz.forEach(biz => {
        coordinates.push({lat: biz.latitude, lng: biz.longitude})
    });

    console.log('coordinates', coordinates)

    // coordinates.map(set => {

    // })

    const center = {
        lat: 40.76119499307807,
        lng: -73.82777500027217
    }

    useEffect(() => {
        if (apiKey) {
            setIsLoad(true);
        }    
    }, [apiKey])

    if (!isLoaded) {
        return <h1>Loading...</h1>
    }

    return (
        <div>
            {isLoaded && (
                <div className='multi-mark-map-container'>
                    <GoogleMap
                        mapContainerStyle={{width: '100%', height: '100vh'}}
                        apiKey={apiKey}
                        onLoad={onLoad}
                        zoom={14}
                        center={center}
                    >
                        {coordinates.map(set => (
                            <Marker position={{lat: set.lat, lng: set.lng}}></Marker>
                        ))}
                    </GoogleMap>
                </div>
            )}
        </div>
    )
};

export default MultiMapView;