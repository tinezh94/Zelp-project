/*global google*/
import { GoogleMap, useLoadScript, Marker, useJsApiLoader } from '@react-google-maps/api';
import React, { useEffect, useState, useRef, useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadKey } from '../../store/map';

const MultiMapView = ({ filteredBiz, apiKey, businessesArr }) => {
    const dispatch = useDispatch();

    const [ isLoaded, setIsLoad ] = useState(false);

    const mapRef = useRef();
    const onLoad = useCallback(map => (mapRef.current = map), [])

    // console.log('filtered', filteredBiz)

    let coordinates = [];

    filteredBiz?.forEach(biz => {
        coordinates.push({lat: biz.latitude, lng: biz.longitude})
    });

    
    // let center = [];
    let allCoordinates = [];
    businessesArr?.forEach(biz => {
        allCoordinates.push({lat: biz.latitude, lng: biz.longitude})
    });
    
    // console.log('coordinates', allCoordinates)
    let latSum = 0;
    let lgnSum = 0;
    for (let i = 0; i < allCoordinates.length; i++) {
            let set = allCoordinates[i];
            latSum += set.lat
            lgnSum += set.lng

    }

    const latAvrg = latSum / allCoordinates.length;
    const lgnAvrg = lgnSum / allCoordinates.length;
        // console.log('sums',  latAvrg, lgnAvrg)

    let center;
    if (filteredBiz.length === 0) {
        center = {
            lat: latAvrg,
            lng: lgnAvrg
        }
    } else {
        center = {
            lat: coordinates[0]?.lat,
            lng: coordinates[0]?.lng
        }
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