import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import '../css/App.css';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Home from '../components/Home';
import Login from '../components/Login';
import ArticlesView from '../containers/ArticlesView';

const Routes = () => (
  <BrowserRouter>
    <div className="App">
      <Header />
      <Route exact path="/" component={Home} />
      <Route path="/login" component={Login} />
      <Route path="/articles" component={ArticlesView} />
      <Footer />
    </div>
  </BrowserRouter>
);

export default Routes;
