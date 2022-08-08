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
    const [ showMenu, setShowMenu ] = useState(false);

    const openMenu = () => {
        if (showMenu) return;
        setShowMenu(true)
    }

    useEffect(() => {
        if (!showMenu) return;
        const closeMenu = () => {
            setShowMenu(false);
        };

        document.addEventListener('click', closeMenu);
        return () => document.removeEventListener('click', closeMenu);
    }, [showMenu])


    return (
        <>
            <div>
                <input 
                    className='search-bar-input'
                    placeholder='Search here...'
                    type='text'
                    value={searchTerm}
                    onChange={(e) => {openMenu(); setSearchTerm(e.target.value)}}
                />
                {showMenu && (
                    <div className='search-results-container'>
                        {businessesArr.filter(biz => {
                            if (searchTerm == '') {
                                return;
                            } else if (biz.name.toLowerCase().includes(searchTerm.toLowerCase())) {
                                return biz;
                            }
                        }).map((biz, idx) => (
                            <div key={idx}>
                                {/* <p>{biz.name}</p> */}
                                <NavLink to={`/businesses/${biz.id}`} className='filtered-search-results'>{biz.name}</NavLink>
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
                                <p className='filtered-search-results'>{category.category_name}</p>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </>
    )
 };

 export default SearchBar;
