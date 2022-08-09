/*global google*/
import { GoogleMap, useLoadScript, Marker, useJsApiLoader } from '@react-google-maps/api';
import React, { useEffect, useState, useRef, useCallback, useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { loadKey } from '../../store/map';

const libraries = ['places']
const Maps = ({ apiKey, latitude, longitude }) => {
//     const { isLoaded } = useLoadScript({
//         id: 'google-map-script',
//         googleMapsApiKey: apiKey,
//         libraries
// })

    const mapRef = useRef();
    const onLoad = useCallback(map => (mapRef.current = map), [])
    // const center = useMemo(() => ({
    //     lat: 40.771479,
    //     lng: 73.833352,
    // }), [])

    console.log('lat, lng', latitude, longitude)
    const center = {
        lat: latitude,
        lng: longitude
    }
    const [ isLoaded, setIsLoad ] = useState(false);

    useEffect(() => {
        if (apiKey) {
            setIsLoad(true);
        }    
    }, [apiKey])

    if (!isLoaded) {
        return <h1>Loading...</h1>
    }
    // const [ map, setMap] = useState(/**@type google.maps.Map */(null))

    return (
        <div>
            {isLoaded && (
                <GoogleMap 
                    mapContainerStyle={{width: 375, height: 325}}
                    zoom={10}
                    center={center}
                    apiKey={apiKey}
                    onLoad={onLoad}
                >
                    <Marker position={center}></Marker>
                </GoogleMap>
            )}
        </div>
        // <h1>MapContainer</h1>
    )
}

export default Maps;
