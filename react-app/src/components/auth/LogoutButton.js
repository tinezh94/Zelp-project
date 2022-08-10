import React from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { logout } from '../../store/session';

const LogoutButton = () => {
  const history = useHistory();
  const dispatch = useDispatch()
  const onLogout = async (e) => {
    await dispatch(logout());
    history.push('/');
  };

  return (
    <div className='dropdown-logout-btn-div'>
      <i className="fa-solid fa-arrow-right-from-bracket"></i>
      <button className='logout-btn' onClick={onLogout}>Log Out</button>
    </div>
  )
};

export default LogoutButton;
