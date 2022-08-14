/*global google*/
import { GoogleMap, useLoadScript, Marker, useJsApiLoader } from '@react-google-maps/api';
import React, { useEffect, useState, useRef, useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadKey } from '../../store/map';

const libraries = ['places'];

const AllBizMapView = ({ businessesArr }) => {
    const [ isLoaded, setIsLoad ] = useState(false);

    const dispatch = useDispatch();
    const key = useSelector(state => state?.key);

    useEffect(() => {
        dispatch(loadKey());
    }, [dispatch])

    const mapRef = useRef();
    const onLoad = useCallback(map => (mapRef.current = map), [])

    let allCoordinates = [];
    businessesArr?.forEach(biz => {
        allCoordinates.push({lat: biz.latitude, lng: biz.longitude})
    });
    
    // console.log('coordinates', allCoordinates)
    // let latSum = 0;
    // let lgnSum = 0;
    // for (let i = 0; i < allCoordinates.length; i++) {
    //         let set = allCoordinates[i];
    //         latSum += set.lat
    //         lgnSum += set.lng

    // }

    // const latAvrg = latSum / allCoordinates.length;
    // const lgnAvrg = lgnSum / allCoordinates.length;

    // let center = {
    //     lat: latAvrg,
    //     lng: lgnAvrg
    // }

    let defaultCenter = {
        lat: 40.7624368,
        lng: -73.8311779
    }

    useEffect(() => {
        if (key) {
            setIsLoad(true);
        }    
    }, [key])

    if (!isLoaded) {
        return <h1>Loading...</h1>
    }

    return (
        <div>
            {isLoaded && (
                <div className='multi-mark-map-container'>
                    <GoogleMap
                        mapContainerStyle={{width: '100%', height: '100vh'}}
                        apiKey={key}
                        onLoad={onLoad}
                        zoom={12}
                        center={defaultCenter}
                    >
                        {allCoordinates.map(set => (
                            <Marker position={{lat: set.lat, lng: set.lng}}></Marker>
                        ))}
                    </GoogleMap>
                </div>
            )}
        </div>
    )
}

export default AllBizMapView;