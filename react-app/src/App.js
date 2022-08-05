import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Wrapper } from '@googlemaps/react-wrapper';
import LoginForm from './components/auth/LoginForm';
import SignUpForm from './components/auth/SignUpForm';
import NavBar from './components/NavBar';
import ProtectedRoute from './components/auth/ProtectedRoute';
import UsersList from './components/UsersList';
import User from './components/User';
import { authenticate } from './store/session';
import CreateBusinessForm from './components/businesses/CreateBusinessForm';
import BusinessesPage from './components/businesses/BusinessesList';
import EditBusinessForm from './components/businesses/EditBusinessForm';
import BusinessPage from './components/businesses/BusinessPage';
import CreateReviewForm from './components/reviews/CreateReviewForm';
import EditReviewForm from './components/reviews/EditReviewForm';
import MapContainer from './components/MapContainer';
import { loadKey } from './store/map';

function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    (async() => {
      await dispatch(authenticate());
      setLoaded(true);
    })();
  }, [dispatch]);

  useEffect(() => {
    dispatch(loadKey());
  }, [dispatch]);

  if (!loaded) {
    return null;
  }

  return (
    <BrowserRouter>
    <Wrapper libraries={'places'}>
      <NavBar />
      <Switch>
        <Route path='/login' exact={true}>
          <LoginForm />
        </Route>
        <Route path='/sign-up' exact={true}>
          <SignUpForm />
        </Route>
        <ProtectedRoute path='/users' exact={true} >
          <UsersList/>
        </ProtectedRoute>
        <ProtectedRoute path='/businesses' exact={true}>
          <CreateBusinessForm />
        </ProtectedRoute>
        <ProtectedRoute path='/businesses/:businessId' exact={true}>
          <BusinessPage />
        </ProtectedRoute>
        <ProtectedRoute path='/writeareview/biz/:businessId' exact={true}>
          <CreateReviewForm />
        </ProtectedRoute>
        <ProtectedRoute path='/editareview/biz/:businessId' exact={true}>
          <EditReviewForm />
        </ProtectedRoute>
        <ProtectedRoute path='/users/:userId' exact={true} >
          <User />
        </ProtectedRoute>
        <ProtectedRoute path='/' exact={true} >
          <BusinessesPage />
          <MapContainer />
        </ProtectedRoute>
      </Switch>
    </Wrapper>
    </BrowserRouter>
  );
}

export default App;
