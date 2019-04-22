import axios from 'axios';
import { toast } from 'react-toastify';
import { axiosConfigAuth } from '../../axiosConfig';
import {
  FETCH_ALL_ARTICLES,
  CREATE_ARTICLE,
  FETCH_ARTICLES_BY_AUTHOR,
  EDIT_ARTICLE,
  FETCH_ALL_ARTICLES_FAIL,
  CREATE_ARTICLE_FAIL,
  FETCH_ARTICLES_BY_AUTHOR_FAIL,
  EDIT_ARTICLE_FAIL,
  PUBLISH_ARTICLE,
  PUBLISH_ARTICLE_FAIL,
  VIEW_ARTICLES,
  IS_LOADING,
} from './actionTypes';

export const fetchArticles = articles => ({
  type: FETCH_ALL_ARTICLES,
  articles,
});

export const fetchArticlesFail = error => ({
  type: FETCH_ALL_ARTICLES_FAIL,
  error,
});

export const createArticle = article => ({
  type: CREATE_ARTICLE,
  article,
});

export const createArticleFail = error => ({
  type: CREATE_ARTICLE_FAIL,
  error,
});

export const AllArticlesByAuthor = authorArticles => ({
  type: FETCH_ARTICLES_BY_AUTHOR,
  authorArticles,
});

export const AllArticlesByAuthorFail = error => ({
  type: FETCH_ARTICLES_BY_AUTHOR_FAIL,
  error,
});

export const editArticle = editedArticle => ({
  type: EDIT_ARTICLE,
  editedArticle,
});

export const editArticleFail = error => ({
  type: EDIT_ARTICLE_FAIL,
  error,
});

export const publishArticle = publishedArticle => ({
  type: PUBLISH_ARTICLE,
  publishedArticle,
});

export const publishArticleFail = error => ({
  type: PUBLISH_ARTICLE_FAIL,
  error,
});
export const fetchAllArticles = url => dispatch => axios
  .get(url, { headers: { 'content-type': 'application/json' } })
  .then((res) => {
    dispatch(fetchArticles(res.data.Articles));
    dispatch({ type: VIEW_ARTICLES, payload: res.data.Articles });
    dispatch({ type: IS_LOADING, payload: false });
  })
  .catch((error) => {
    dispatch(fetchArticlesFail(error));
    dispatch({ type: IS_LOADING, payload: false });
  });

export const createAnArticle = article => dispatch => axiosConfigAuth
  .request({
    method: 'post',
    url: 'articles/create/',
    data: article,
  })
  .then((res) => {
    dispatch(createArticle(res.data.Article));
    toast.success('Árticle created successifully');
  })
  .catch((error) => {
    dispatch(createArticleFail(error));
  });

export const fetchAllArticlesByAuthor = () => dispatch => axiosConfigAuth
  .request({
    method: 'get',
    url: 'user/articles/',
  })
  .then((res) => {
    dispatch(AllArticlesByAuthor(res.data.Articles));
  })
  .catch((error) => {
    dispatch(AllArticlesByAuthorFail(error));
  });

export const editAnArticle = (editArticleData, slug) => dispatch => axiosConfigAuth
  .request({
    method: 'put',
    url: `articles/${slug}/edit/`,
    data: editArticleData,
  })
  .then((res) => {
    dispatch(editArticle(res.data.Article));
  })
  .catch((error) => {
    dispatch(editArticleFail(error));
  });

export const publishAnArticle = slug => dispatch => axiosConfigAuth
  .request({
    method: 'patch',
    url: `articles/${slug}/publish/`,
  })
  .then((res) => {
    dispatch(publishArticle(res.data.Article));
  })
  .catch((error) => {
    dispatch(publishArticleFail(error));
  });
