import axiosConfig from '../../axiosConfig';
import { FETCH_ALL_ARTICLES, FETCH_ALL_ARTICLES_FAIL } from './actionTypes';

export const fetchArticles = articles => ({
  type: FETCH_ALL_ARTICLES,
  articles,
});

export const fetchArticlesFail = error => ({
  type: FETCH_ALL_ARTICLES_FAIL,
  error,
});

export const fetchAllArticles = () => dispatch => axiosConfig
  .request({
    method: 'get',
    url: 'articles/',
  })
  .then((res) => {
    dispatch(fetchArticles(res.data.Articles));
  })
  .catch((error) => {
    dispatch(fetchArticlesFail(error));
  });
