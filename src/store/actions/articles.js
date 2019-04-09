import axiosConfig from '../../axiosConfig';
import { FETCH_ALL_ARTICLES } from './actionTypes';

export const fetchArticles = articles => ({
  type: FETCH_ALL_ARTICLES,
  articles,
});

export const fetchAllArticles = () => dispatch => {
return axiosConfig
.request({
  method: 'get',
  url: `articles/`
})
  .then((res) => {
    dispatch(fetchArticles(res.data.Articles.results));
  })
  .catch((error) => {
    throw (error);
  });
}
