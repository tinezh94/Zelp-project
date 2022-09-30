import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
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
import AllBusinesses from './components/FilteredBiz/AllBusinesses';
import UserBizPhotos from './components/UserProfile/UserBizPhotos';
import UserReviews from './components/UserProfile/UserReviews';
import UserBusinesses from './components/UserProfile/UserBusinesses';
import Directions from './components/Directions/Directions';

function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();

  const businesses = useSelector(state => state?.businesses)
  const apiKey = useSelector(state => state?.key)

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
      <NavBar />
      <Switch>
        <Route path='/login' exact={true}>
          {/* <NavBar /> */}
          <LoginForm />
        </Route>
        <Route path='/signup' exact={true}>
          <SignUpForm />
        </Route>
        <Route path='/businesses/new' exact={true}>
          <CreateBusinessForm />
        </Route>
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
          <UserProfilePage />
        </ProtectedRoute>
        <Route path='/' exact={true} >
          <BusinessesPage businesses={businesses} />
        </Route>
        <ProtectedRoute path='/biz_user_photos/:businessId/upload' exact={true}>
          <BizUploadImage />
        </ProtectedRoute>
        <ProtectedRoute path='/users/:userId/businesses' exact={true}>
          <UserBiz />
        </ProtectedRoute>
        <Route path='/search/:searchTerm' exact={true}>
          <CategoryPage businesses={businesses} />
        </Route>
        <Route path='/biz_photos/:businessId' exact={true}>
          <BizPhotos businesses={businesses} />
        </Route>
        <ProtectedRoute path='/user_local_photos/:userId' exact={true}>
          <UserBizPhotos />
        </ProtectedRoute>
        <ProtectedRoute path='/user_details_reviews/:userId' exact={true}>
          <UserReviews businesses={businesses} />
        </ProtectedRoute>
        <ProtectedRoute path='/user_biz/:userId' exact={true}>
          <UserBusinesses />
        </ProtectedRoute>
        <Route path='/map/:businessId' exact={true}>
          <Directions businesses={businesses} apiKey={apiKey} />
        </Route>
        <Route path='/businesses' exact={true}>
          <AllBusinesses businesses={businesses} />
        </Route>
        <Route>
          <PageNotFound />
        </Route>
      </Switch>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
