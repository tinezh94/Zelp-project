import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Wrapper } from '@googlemaps/react-wrapper';
import LoginForm from './components/auth/LoginForm';
import SignUpForm from './components/auth/SignUpForm';
import NavBar from './components/navbar/NavBar';
import ProtectedRoute from './components/auth/ProtectedRoute';
// import UsersList from './components/UsersList';
// import User from './components/User';
import { authenticate } from './store/session';
import CreateBusinessForm from './components/businesses/CreateBusinessForm';
import BusinessesPage from './components/businesses/BusinessesList';
import EditBusinessForm from './components/businesses/EditBusinessForm';
import BusinessPage from './components/businesses/BusinessPage';
import CreateReviewForm from './components/reviews/CreateReviewForm';
import EditReviewForm from './components/reviews/EditReviewForm';
// import MapContainer from './components/MapContainer';
import { loadKey } from './store/map';
import BizUploadImage from './components/businesses/BizUploadImage';
import UserProfilePage from './components/UserProfile/UserProfilePage';
import UserBiz from './components/businesses/userBiz';
import { loadBusinesses } from './store/business';
import { loadCategories } from './store/category';
// import SearchBar from './components/SearchBar';
// import { loadReviews } from './store/review';
import Footer from './components/Footer/Footer';
import CategoryPage from './components/category/CategoryPage';
// import AllImages from './components/images/AllImages';
import BizPhotos from './components/images/BizPhotos';
import PageNotFound from './components/PageNotFound';

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
          {/* <NavBar /> */}
          <LoginForm />
        </Route>
        <Route path='/signup' exact={true}>
          {/* <NavBar /> */}
          <SignUpForm />
        </Route>
        <Route path='/businesses/new' exact={true}>
          {/* <NavBar /> */}
          <CreateBusinessForm />
        </Route>
        <Route path='/businesses/:businessId' exact={true}>
          {/* <NavBar /> */}
          <BusinessPage />
        </Route>
        <ProtectedRoute path='/businesses/:businessId/edit' exact={true}>
          {/* <NavBar /> */}
          <EditBusinessForm />
        </ProtectedRoute>
        <ProtectedRoute path='/writeareview/biz/:businessId' exact={true}>
          {/* <NavBar /> */}
          <CreateReviewForm />
        </ProtectedRoute>
        <ProtectedRoute path='/editareview/biz/:businessId' exact={true}>
          {/* <NavBar /> */}
          <EditReviewForm />
        </ProtectedRoute>
        <ProtectedRoute path='/users/:userId' exact={true} >
          {/* <NavBar /> */}
          <UserProfilePage />
        </ProtectedRoute>
        <Route path='/' exact={true} >
          {/* <NavBar /> */}
          <BusinessesPage businesses={businesses} />
        </Route>
        <ProtectedRoute path='/biz_user_photos/:businessId/upload' exact={true}>
          {/* <NavBar /> */}
          <BizUploadImage />
        </ProtectedRoute>
        <ProtectedRoute path='/users/:userId/businesses' exact={true}>
          {/* <NavBar /> */}
          <UserBiz />
        </ProtectedRoute>
        <Route path='/search/:searchTerm' exact={true}>
          {/* <NavBar /> */}
          <CategoryPage businesses={businesses} />
        </Route>
        <Route path='/biz_photos/:businessId' exact={true}>
          {/* <NavBar /> */}
          <BizPhotos businesses={businesses} />
        </Route>
        <Route>
          <PageNotFound />
        </Route>
      </Switch>
      <Footer />
    </Wrapper>
    </BrowserRouter>
  );
}

export default App;
