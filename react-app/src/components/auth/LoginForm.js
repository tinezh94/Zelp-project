import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink, Redirect, useHistory } from 'react-router-dom';
import { login } from '../../store/session';
import DemoUser from './DemoUser';
import './login.css';

const LoginForm = () => {
  const [errors, setErrors] = useState([]);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();
  const history = useHistory();
  const [users, setUsers] = useState([]);

  // useEffect(() => {
  //   async function fetchData() {
  //     const response = await fetch('/api/users/');
  //     const responseData = await response.json();
  //     setUsers(responseData.users);
  //   }
  //   fetchData();
  // }, []);

  const onLogin = async (e) => {
    e.preventDefault();
    // setHasSubmitted(true);

    // if (!validationErrors.length) {
    //   await dispatch(login(email, password));
    //   setHasSubmitted(false);
    //   // history.push('/');
    // }
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
      console.log('errors', data)
    }
  };
  // console.log('errors', errors[0])

  // useEffect(() => {
  //   const errors = [];
  //   if (!email) errors.push('Email field is required');
  //   if (!password) errors.push('Password field is required');
  //   if (!(users.map(user => user.email).includes(email))) errors.push('No such user exists');

  //   setValidationErrors(errors);
  // }, [email, password]);

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  if (user) {
    return <Redirect to='/' />;
  }

  return (
    <div className='login-container'>
      <div>

        <form onSubmit={onLogin} className='login-form'>
          <div className='login-form-errors-div'>
            {errors.map((error, ind) => (
              <div key={ind}>{error}</div>
            ))}
          </div>
          <div>
            <h2 className='login-to-zelp'>Log in to Zelp</h2>
            <h3 className='login-subheading'>New to Zelp? 
              <NavLink to='/signup' className='subheading-signup'>Sign up</NavLink>
            </h3>
          </div>
          <div>
            {/* <label htmlFor='email' className='login-form-label'>Email</label> */}
            <input
              className='login-form-input'
              name='email'
              type='text'
              placeholder='Email'
              value={email}
              onChange={updateEmail}
            />
          </div>
          <div>
            {/* <label htmlFor='password' className='login-form-label'>Password</label> */}
            <input
              className='login-form-input'
              name='password'
              type='password'
              placeholder='Password'
              value={password}
              onChange={updatePassword}
            />
          </div>
          <div>
            <button className='login-form-submit-btn' type='submit'>Log In</button>
          </div>
          <div>
            <DemoUser />
          </div>
        </form>
        <div className='login-form-subtle-text'>
          <p>New to Zelp?
            <NavLink to='/signup' className='login-form-subtle-signup'>Sign up</NavLink>
          </p>
        </div>
      </div>
      <div>
        <img className='login-illustration' src='https://s3-media0.fl.yelpcdn.com/assets/2/www/img/7922e77f338d/signup/signup_illustration.png' alt='login illustration' />
      </div>
    </div>
  );
};

export default LoginForm;
