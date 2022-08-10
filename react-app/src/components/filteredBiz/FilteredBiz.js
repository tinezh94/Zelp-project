import React, { useState, useEffect, cloneElement } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams, NavLink } from 'react-router-dom';
import { loadBusinesses } from '../../store/business';
import { loadCategories } from '../../store/category';
import { loadReviews } from '../../store/review';
import { FaStar } from 'react-icons/fa';
import { loadImages } from '../../store/image';
import MultiMapContainer from '../FilteredMap';

const FilteredBiz = () => {
    const dispatch = useDispatch();
    const businesses = useSelector(state => state?.businesses)
    console.log('bizz', businesses)

    const { searchTerm } = useParams();
    const businessesArr = businesses ? Object.values(businesses) : null;
    console.log(searchTerm)
    const filteredBiz = businessesArr?.filter(biz => {
        return biz.name.toLowerCase().includes(searchTerm.toLowerCase());
    });


    return (
        <>
            <h1>hi</h1>
        </>
    )

}

export default FilteredBiz;