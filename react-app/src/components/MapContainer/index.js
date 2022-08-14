import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { loadKey } from '../../store/map';
import Maps from './Map';

const libraries = ['places'];
const MapContainer = ({ latitude, longitude}) => {
    const dispatch = useDispatch();
    // const [ key, setKey ] = useState(null);

    const key = useSelector(state => state?.key);

    // useEffect(() => {
    //     async function fetchData() {
    //         const res = await fetch ('/api/businesses/google_maps_api');

    //         console.log('res', res)
    //         const apiKey = await res.json();
    //         setKey(apiKey);
    //     };
    //     fetchData()
    // }, []);

    // if (!key) return null;
    useEffect(() => {
        dispatch(loadKey());
    }, [dispatch])

    console.log('key', key)

    return (
        <Maps apiKey={key} latitude={latitude} longitude={longitude}></Maps>
    )
};

export default MapContainer;