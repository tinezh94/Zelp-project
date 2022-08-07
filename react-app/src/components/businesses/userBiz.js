import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useParams } from 'react-router-dom';
import { loadBusinesses } from '../../store/business';

const UserBiz = () => {
    const dispatch = useDispatch();
    const { userId } = useParams();

    const businesses = useSelector(state => state?.businesses);

    const businessesArr = businesses ? Object.values(businesses) : null;

    let userBizes = businessesArr.filter(business => {
        return business.owner_id === Number(userId);
    });

    // userBizes = userBizes[0];
    console.log('userBiz', userBizes)

    useEffect(() => {
        dispatch(loadBusinesses());
    }, [dispatch])

    return (
        <>
            <div>
                {userBizes && userBizes.map(biz => (
                    <div>
                        <h3>{biz.name}</h3>
                        <p>{biz.description}</p>
                    </div>
                ))}
            </div>
        </>
    )

}

export default UserBiz;
