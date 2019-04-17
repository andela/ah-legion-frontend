import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import HomeView from '../containers/HomeView';
import Login from '../components/Login';
import RegisterForm from '../components/RegisterForm';

const Routes = () => (
  <BrowserRouter>
    <div className="App">
      <Header />
      <Route exact path="/" component={HomeView} />
      <Route path="/login" component={Login} />
      <Route path="/register" component={RegisterForm} />
      <Footer />
    </div>
  </BrowserRouter>
);
export default Routes;
