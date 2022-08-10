import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Wrapper } from '@googlemaps/react-wrapper';
import LoginForm from './components/auth/LoginForm';
import SignUpForm from './components/auth/SignUpForm';
import NavBar from './components/navbar/NavBar';
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
import BizUploadImage from './components/businesses/BizUploadImage';
import UserProfilePage from './components/UserProfile/UserProfilePage';
import UserBiz from './components/businesses/userBiz';
import { loadBusinesses } from './store/business';
import { loadCategories } from './store/category';
import SearchBar from './components/SearchBar';
import SplashPage from './components/SplashPage';
import { loadReviews } from './store/review';
import Footer from './components/Footer/Footer';
import CategoryPage from './components/category/CategoryPage';
import FilteredBiz from './components/filteredBiz/FilteredBiz';

function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();

  const businesses = useSelector(state => state?.businesses)

  useEffect(() => {
    (async() => {
      await dispatch(authenticate());
      setLoaded(true);
    })();
  }, [dispatch]);

  useEffect( () => {
    dispatch(loadKey());
    dispatch(loadBusinesses());
    dispatch(loadCategories());
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
        <Route path='/signup' exact={true}>
          <SignUpForm />
        </Route>
        <ProtectedRoute path='/users' exact={true} >
          <UsersList/>
        </ProtectedRoute>
        <ProtectedRoute path='/businesses' exact={true}>
          <CreateBusinessForm />
        </ProtectedRoute>
        <Route path='/businesses/:businessId' exact={true}>
          <BusinessPage />
        </Route>
        <ProtectedRoute path='/businesses/:businessId/edit' exact={true}>
          <EditBusinessForm />
        </ProtectedRoute>
        <ProtectedRoute path='/writeareview/biz/:businessId' exact={true}>
          <CreateReviewForm />
        </ProtectedRoute>
        <ProtectedRoute path='/editareview/biz/:businessId' exact={true}>
          <EditReviewForm />
        </ProtectedRoute>
        <ProtectedRoute path='/users/:userId' exact={true} >
          {/* <User /> */}
          <UserProfilePage />
        </ProtectedRoute>
        <Route path='/' exact={true} >
          <BusinessesPage />
          {/* <SplashPage /> */}
        </Route>
        <ProtectedRoute path='/biz/:businessId/images-upload' exact={true}>
          <BizUploadImage />
        </ProtectedRoute>
        <ProtectedRoute path='/users/:userId/businesses' exact={true}>
          <UserBiz />
        </ProtectedRoute>
        <Route path='/search/:searchTerm' exact={true}>
          <CategoryPage />
        </Route>
      </Switch>
      <Footer />
    </Wrapper>
    </BrowserRouter>
  );
}

export default App;
