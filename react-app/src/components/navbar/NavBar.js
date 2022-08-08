
import React from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import LogoutButton from '../auth/LogoutButton';
import SearchBar from '../SearchBar';
import logo from './logo.png';
import './navbar.css';

const NavBar = () => {
  const user = useSelector(state => state?.session?.user);

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
      <ul className='session-actions-div'>
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
        <li>
          {user && <LogoutButton />}
        </li>
      </ul>
    </nav>
  );
}

export default NavBar;
