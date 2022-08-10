import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useHistory } from 'react-router-dom';

 const SearchBar = () => {
    const dispatch = useDispatch();
    const history = useHistory();

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

    const submitSearch = () => {
        history.push(`/search/${searchTerm}`)
        setSearchTerm('');
      }

    return (
        <>
            <div>
                <div className='search-bar-container'>
                    <input 
                        className='search-bar-input'
                        placeholder='Search here...'
                        type='text'
                        value={searchTerm}
                        onChange={(e) => {openMenu(); setSearchTerm(e.target.value)}}
                    />
                    <div>
                        <button type='submit' className='search-submit-btn' onClick={submitSearch}>
                            <i className="fa-solid fa-magnifying-glass fa-2x"></i>
                        </button>
                    </div>
                </div>
                {showMenu && (
                    <div className='search-results-container'>
                        {searchTerm && businessesArr?.filter(biz => {
                            if (searchTerm == '') {
                                return biz;
                            } else if (biz.name.toLowerCase().includes(searchTerm.toLowerCase())) {
                                return biz;
                            }
                        }).map((biz, idx) => (
                            <div key={idx} onClick={() => setSearchTerm('')}>
                                {/* <p>{biz.name}</p> */}
                                <NavLink to={`/businesses/${biz.id}`} className='filtered-search-results'>{biz.name}</NavLink>
                            </div>
                        ))}
                        {searchTerm && categoriesArr?.filter(category => {
                            if (searchTerm == '') {
                                return;
                            } else if (category.category_name.toLowerCase().includes(searchTerm.toLowerCase())) {
                                return category;
                            }
                        }).map((category, idx) => (
                            <div key={idx} onClick={() => setSearchTerm('')}>
                                <NavLink to={`/search/${category.id}`} className='filtered-search-results'>{category.category_name}</NavLink>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </>
    )
 };

 export default SearchBar;
