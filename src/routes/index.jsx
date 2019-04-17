import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import HomeView from '../containers/HomeView';
import UserProfile from '../components/user/UserProfile';
import ResetPassword from '../components/ResetPassword';

const Routes = () => (
  <BrowserRouter>
    <div className="App">
      <Header />
      <Route exact path="/" component={HomeView} />
      <Route path="/profile" component={UserProfile} />
      <Route path="/reset-password/:resetToken" component={ResetPassword} />
      <Footer />
    </div>
  </BrowserRouter>
);
export default Routes;
