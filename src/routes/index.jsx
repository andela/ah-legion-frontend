
import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faStar,
  faHeart,
  faReply,
  faCommentAlt,
  faEdit,
  faTrashAlt,
} from '@fortawesome/free-solid-svg-icons';
import ProtectedRoute from './protectedRoute';
import Header from '../components/Header';
import Footer from '../components/Footer';
// eslint-disable-next-line import/no-named-as-default
import HomeView from '../containers/HomeView';
import UserProfile from '../components/user/UserProfile';
import ResetPassword from '../components/ResetPassword';
import CreateArticleView from '../containers/CreateArticleView';
import DraftsView from '../containers/DraftsView';
import GetAnArticle from '../containers/GetAnArticle';
import '../css/App.css';

library.add(faStar);
library.add(faHeart);
library.add(faReply);
library.add(faCommentAlt);
library.add(faEdit);
library.add(faTrashAlt);

const Routes = () => (
  <BrowserRouter>
    <div className="App">
      <Header />
      <Switch>
        <Route exact path="/" component={HomeView} />
        <Route path="/profile" component={UserProfile} />
        <Route path="/reset-password/:resetToken" component={ResetPassword} />
        <ProtectedRoute path="/article/create" component={CreateArticleView} />
        <ProtectedRoute path="/articles/drafts" component={DraftsView} />
        <Route path="/article/:slug" component={GetAnArticle} />
      </Switch>
      <Footer />
    </div>
  </BrowserRouter>
);
export default Routes;
