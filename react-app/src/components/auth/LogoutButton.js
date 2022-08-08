import React from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '../../store/session';

const LogoutButton = () => {
  const dispatch = useDispatch()
  const onLogout = async (e) => {
    await dispatch(logout());
  };

  return (
    <div className='dropdown-logout-btn-div'>
      <i className="fa-solid fa-arrow-right-from-bracket"></i>
      <button className='logout-btn' onClick={onLogout}>Log Out</button>
    </div>
  )
};

export default LogoutButton;
