import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useHistory } from 'react-router-dom';
import UploadImageModal from '../UploadImageModal';
import ProfileImage from './ProfileImageUpload';

const UserProfilePage = () => {
    const dispatch = useDispatch();
    const history = useHistory();

    const user = useSelector(state => state?.session.user);

    const month = user.created_at.split(' ')[2]
    const year = user.created_at.split(' ')[3]
    
    return (
        <>
            <div>
            <img src={user.profile_pic} alt='profile pic' style={{width: 175, height: 225 }} />
            <NavLink to={`/users/${user.id}`}>
                <button>Profile Overview</button>
            </NavLink>
            <NavLink to={`/users/${user.id}/reviews`}>
                <button>Reviews</button>
            </NavLink>
            <NavLink to={`/users/${user.id}/businesses`}>
                <button>Businesses</button>
            </NavLink>
            </div>
            <div>
                <h1>{user.first_name} {user.last_name[0].toUpperCase()}</h1>
            </div>
            <div>
            <ProfileImage />
            <h4>About {user.first_name} {user.last_name[0].toUpperCase()}</h4>
            <h4>Zelping since </h4>
            <p>{month} {year}</p>
            </div>
        </>
    )
};

export default UserProfilePage;

