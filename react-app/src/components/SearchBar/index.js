import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';

 const SearchBar = () => {
    const dispatch = useDispatch();

    const businesses = useSelector(state => state?.businesses);
    const categories = useSelector(state => state?.categories);

    const businessesArr = businesses ? Object.values(businesses) : null;
    const categoriesArr = categories ? Object.values(categories) : null;

    const [ searchTerm, setSearchTerm ] = useState('');

    return (
        <>
            <div>
                <input 
                    placeholder='Search here...'
                    type='text'
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                {businessesArr.filter(biz => {
                    if (searchTerm == '') {
                        return;
                    } else if (biz.name.toLowerCase().includes(searchTerm.toLowerCase())) {
                        return biz;
                    }
                }).map((biz, idx) => (
                    <div key={idx}>
                        {/* <p>{biz.name}</p> */}
                        <NavLink to={`/businesses/${biz.id}`}>{biz.name}</NavLink>
                    </div>
                ))}
                {categoriesArr.filter(category => {
                    if (searchTerm == '') {
                        return;
                    } else if (category.category_name.toLowerCase().includes(searchTerm.toLowerCase())) {
                        return category;
                    }
                }).map((category, idx) => (
                    <div key={idx}>
                        <p>{category.category_name}</p>
                    </div>
                ))}
            </div>
        </>
    )
 };

 export default SearchBar;
