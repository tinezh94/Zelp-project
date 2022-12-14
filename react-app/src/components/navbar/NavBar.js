
import React from 'react';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { NavLink, useHistory } from 'react-router-dom';
import { Redirect } from 'react-router-dom';
import LogoutButton from '../auth/LogoutButton';
import CreateBusinessForm from '../businesses/CreateBusinessForm'
import SearchBar from '../SearchBar';
import logo from './logo.png';
import './navbar.css';

const NavBar = () => {
  const history = useHistory();
  const user = useSelector(state => state?.session?.user);

  const [showMenu, setShowMenu] = useState(false);

  let sessionLinks;
  if (!user) {
    sessionLinks = (
      <div className='session-actions-div'>
        <li>
          <NavLink to='/' className='navbar-businesses-link' onClick={() => {window.location.href='/'}}>Businesses</NavLink>
        </li>
        <li>
          <NavLink to='/login' exact={true} activeClassName='active'>
            <button className='login-btn'>Log In</button>
          </NavLink>
        </li>
        <li>
          <NavLink to='/signup' exact={true} activeClassName='active'>
            <button className='signup-btn'>Sign Up</button>
          </NavLink>
        </li>
      </div>
    )
  } else {
    sessionLinks = (
      <div className='profile-div'>
            {/* <li>
              <NavLink to='/' className='navbar-businesses' onClick={() => {window.location.href='/'}}>Businesses</NavLink>
            </li> */}
            <li>
                <img className='user-profile-pic'  src={user.profile_pic} style={{width: 50, height: 50}} onClick={() => openMenu()} />
              {showMenu && (
                <div className='profile-dropdown'>
                  <NavLink className='dropdown-links' to='/businesses/new'>
                    <i className="fa-solid fa-plus"></i>
                    <p className='dropdown-p'>Create New Business Listing</p>
                  </NavLink>
                  <NavLink className='dropdown-links' to={`/users/${user?.id}`}>
                      <i className="fa-solid fa-address-card"></i>
                      <p className='dropdown-p'>About me</p>
                  </NavLink>
                  <LogoutButton />
                </div>
                  )}
            </li>
          </div>
    )
  }

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

  // const submitSearch = () => {
  //   history.push(`/search/${searchTerm}`)
  // }


  return (
    <nav>
      <div className='nav-bar-logo-search-div'>
        <div className='logo-div'>
            <NavLink to='/'>
              <img src={logo} width='95px' height='40px' />
            </NavLink>
        </div>
        <div>
          <SearchBar />
        </div>
      </div>
      <ul>
        {sessionLinks}
        {/* {user && (
          <div className='profile-div'>
            <li>
              <NavLink to='/' className='navbar-businesses' onClick={() => {window.location.href='/'}}>Businesses</NavLink>
            </li>
            <li>
                <img className='user-profile-pic'  src={user.profile_pic} style={{width: 40, height: 40}} onClick={() => openMenu()} />
              {showMenu && (
                <div className='profile-dropdown'>
                  <NavLink className='dropdown-links' to='/businesses/new'>
                    <i className="fa-solid fa-plus"></i>
                    <p className='dropdown-p'>Create New Business Listing</p>
                  </NavLink>
                  <NavLink className='dropdown-links' to={`/users/${user?.id}`}>
                      <i className="fa-solid fa-address-card"></i>
                      <p className='dropdown-p'>About me</p>
                  </NavLink>
                  <LogoutButton />
                </div>
                  )}
            </li>
          </div>
        )} */}
      </ul>
    </nav>
  );
}

export default NavBar;
