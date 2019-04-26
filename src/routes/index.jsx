import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import ProtectedRoute from './protectedRoute';
import Header from '../components/Header';
import Footer from '../components/Footer';
import HomeView from '../containers/HomeView';
import UserProfile from '../components/user/UserProfile';
import ResetPassword from '../components/ResetPassword';
import CreateArticleView from '../containers/CreateArticleView';
import DraftsView from '../containers/DraftsView';
import Login from '../components/Login';
import BookmarkButton from '../components/BookmarkButton';

const Routes = () => (
  <BrowserRouter>
    <div className="App">
      <Header />
      <Route exact path="/" component={HomeView} />
      <Route path="/profile" component={UserProfile} />
      <Route path="/reset-password/:resetToken" component={ResetPassword} />
      <Route path="/login" component={Login} />
      <Route path="/bookmark" component={BookmarkButton} />
      <ProtectedRoute path="/article/create" component={CreateArticleView} />
      <ProtectedRoute path="/articles/drafts" component={DraftsView} />
      <Footer />
    </div>
  </BrowserRouter>
);
export default Routes;
