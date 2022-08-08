import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { NavLink, Redirect } from 'react-router-dom';
import { signUp } from '../../store/session';
import './signup.css';

const SignUpForm = () => {
  const [errors, setErrors] = useState([]);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const dateTime = new Date();
    const isoTime = dateTime.toISOString();
    const date = isoTime.slice(0, 10);
    const time = isoTime.slice(12, 19);
    const combined = date + ' ' + time

  const onSignUp = async (e) => {
    e.preventDefault();
    
    const payload = {
      first_name: firstName,
      last_name: lastName,
      email: email,
      password: password,
      created_at: combined
    }

    if (password === repeatPassword) {
      setErrors([]);
      return dispatch(signUp(payload))
        .catch(async (res) => {
          const data = await res.json();
          if (data && data.errors) setErrors(data.errors);
        });
      // if (data) {
      //   setErrors(data)
      // }
    }
    return setErrors(['Repeat password field must be the same as the Password field.']);
  };

  // const updateUsername = (e) => {
  //   setUsername(e.target.value);
  // };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const updateRepeatPassword = (e) => {
    setRepeatPassword(e.target.value);
  };

  if (user) {
    return <Redirect to='/' />;
  }

  return (
    <div className='signup-container'>
      <div className='signup-form-text-container'>
        <form onSubmit={onSignUp} className='signup-form'>
          <div>
            {errors.map((error, ind) => (
              <div key={ind}>{error}</div>
            ))}
          </div>
          <div>
            <h2 className='signup-to-zelp'>Sign Up for Zelp</h2>
            <h3 className='signup-subheading'>Connect with great local businesses</h3>
          </div>
          <div className='signup-name-div'>
            {/* <label>First Name</label> */}
            <input
              className='signup-form-input'
              id='signup-name'
              placeholder='First Name'
              type='text'
              name='firstname'
              onChange={(e) => setFirstName(e.target.value)}
              value={firstName}
            />
            {/* <label>Last Name</label> */}
            <input
              className='signup-form-input'
              id='signup-name'
              placeholder='Last Name'
              type='text'
              name='lastname'
              onChange={(e) => setLastName(e.target.value)}
              value={lastName}
            ></input>
          </div>
          <div>
            {/* <label>Email</label> */}
            <input
              className='signup-form-input'
              placeholder='Email'
              type='text'
              name='email'
              onChange={updateEmail}
              value={email}
            />
          </div>
          <div>
            {/* <label>Password</label> */}
            <input
              className='signup-form-input'
              placeholder='Password'
              type='password'
              name='password'
              onChange={updatePassword}
              value={password}
            />
          </div>
          <div>
            {/* <label>Repeat Password</label> */}
            <input
              className='signup-form-input'
              placeholder='Confirm Password'
              type='password'
              name='repeat_password'
              onChange={updateRepeatPassword}
              value={repeatPassword}
              required={true}
            />
          </div>
          <div>
            <button className='signup-form-submit-btn' type='submit'>Sign Up</button>
          </div>
        </form>
        <div className='signup-form-subtle-text'>
          <p>Already on Zelp?
            <NavLink to='/login' className='signup-form-subtle-signup'>Log in</NavLink>
          </p>
        </div>
      </div>
      <div>
        <img className='signup-illustration' src='https://s3-media0.fl.yelpcdn.com/assets/2/www/img/7922e77f338d/signup/signup_illustration.png' alt='signup illustration' />
      </div>
    </div>
  );
};

export default SignUpForm;
