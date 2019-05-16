import { toast } from 'react-toastify';
import axios from 'axios';
import { GET_SEARCH_RESULTS } from './actionTypes';

const { REACT_APP_BASE_URL } = process.env;

export const fetchSearchResults = searchString => dispatch => axios.all([
  axios.get(REACT_APP_BASE_URL.concat(`articles/body/search/?query=${searchString}`)),
  axios.get(REACT_APP_BASE_URL.concat(`articles/title/search/?query=${searchString}`)),
  axios.get(REACT_APP_BASE_URL.concat(`articles/author/search/?query=${searchString}`)),
  axios.get(REACT_APP_BASE_URL.concat(`articles/description/search/?query=${searchString}`)),
  axios.get(REACT_APP_BASE_URL.concat(`articles/tags/search/?query=${searchString}`)),
], {
  headers: {
    'content-type': 'application/json',
  },
}).then(axios.spread((bodyRes, titleRes, authorRes, descriptionRes, tagsRes) => {
  const payload = {
    title: titleRes.data,
    author: authorRes.data,
    body: bodyRes.data,
    description: descriptionRes.data,
    tags: tagsRes.data,
  };
  dispatch({ type: GET_SEARCH_RESULTS, payload });
})).catch(() => {
  toast.error('Something went wrong when getting search results');
});

export const fetchSearchUpdate = searchData => dispatch => axios
  .get(searchData.searchURL, { headers: { 'content-type': 'application/json' } })
  .then((res) => {
    const payload = res.data;
    dispatch({ type: searchData.action, payload });
  })
  .catch(() => {
    toast.error('Something went wrong when getting search results');
  });
