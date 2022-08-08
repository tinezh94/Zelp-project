
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
          <img src={logo} width='95px' height='40px' />
      </div>
      <SearchBar />
      <div>
        <button type='submit' className='search-submit-btn'>
          <i className="fa-solid fa-magnifying-glass fa-2x"></i>
        </button>
      </div>
      <ul>
        <li>
          <NavLink to='/login' exact={true} activeClassName='active'>
            Login
          </NavLink>
        </li>
        <li>
          <NavLink to='/sign-up' exact={true} activeClassName='active'>
            Sign Up
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
