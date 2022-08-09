import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { loadKey } from '../../store/map';
import MultiMapView from './FilteredMap';

const MultiMapContainer = ({ filteredBiz }) => {
    const dispatch = useDispatch();
    const key = useSelector(state => state?.key);

    useEffect(() => {
        dispatch(loadKey());
    }, [dispatch])

    return (
        <MultiMapView apiKey={key} filteredBiz={filteredBiz}></MultiMapView>
    )
};

export default MultiMapContainer;