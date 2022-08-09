
import React from 'react';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import LogoutButton from '../auth/LogoutButton';
import CreateBusinessForm from '../businesses/CreateBusinessForm'
import SearchBar from '../SearchBar';
import logo from './logo.png';
import './navbar.css';

const NavBar = () => {
  const user = useSelector(state => state?.session?.user);

  const [showMenu, setShowMenu] = useState(false);

  let sessionLinks;
  if (!user) {
    sessionLinks = (
      <div className='session-actions-div'>
        <li>
          <NavLink to='/' style={{textDecoration: 'none'}} className='navbar-businesses-link'>Businesses</NavLink>
        </li>
        <li>
          <NavLink to='/login' exact={true} activeClassName='active'>
            <button className='login-btn'>Log In</button>
          </NavLink>
        </li>
        <li>
          <NavLink to='/sign-up' exact={true} activeClassName='active'>
            <button className='signup-btn'>Sign Up</button>
          </NavLink>
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

  return (
    <nav>
      <div className='logo-div'>
          <NavLink to='/'>
            <img src={logo} width='95px' height='40px' />
          </NavLink>
      </div>
      <div className='search-bar-container'>
        <SearchBar />
        <div>
          <button type='submit' className='search-submit-btn'>
            <i className="fa-solid fa-magnifying-glass fa-2x"></i>
          </button>
        </div>
      </div>
      <ul>
        {sessionLinks}
        {user && (
          <div className='profile-div'>
            <li>
              <NavLink to='/' style={{textDecoration: 'none'}} className='navbar-businesses'>Businesses</NavLink>
            </li>
            <li>
                <img className='user-profile-pic'  src={user.profile_pic} style={{width: 40, height: 40}} onClick={() => openMenu()} />
              {showMenu && (
                <div className='profile-dropdown'>
                  <NavLink className='dropdown-links' to='/businesses'>
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
        )}
      </ul>
    </nav>
  );
}

export default NavBar;
