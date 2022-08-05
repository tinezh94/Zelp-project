/*global google*/
import { GoogleMap, useLoadScript, Marker, useJsApiLoader } from '@react-google-maps/api';
import React, { useEffect, useState, useRef, useCallback, useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { loadKey } from '../../store/map';

const libraries = ['places']
const Maps = ({ apiKey }) => {
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

    const center = {
        lat: 40.771479,
        lng: 73.833352,
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
        <>
        {isLoaded && (
            <GoogleMap 
                mapContainerStyle={{width: 400, height:350}}
                zoom={10}
                center={center}
                apiKey={apiKey}
                onLoad={onLoad}
            >
                <Marker position={center}></Marker>
            </GoogleMap>
        )}
        </>
        // <h1>MapContainer</h1>
    )
}

export default Maps;
