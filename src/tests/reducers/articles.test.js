import { FETCH_ALL_ARTICLES, FETCH_ALL_ARTICLES_FAIL } from '../../store/actions/actionTypes';
import reducer, { initialState } from '../../store/reducers/articlesReducer';
import { articles, error } from '../testData';

describe('articles reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  it('should handle FETCH_ALL_ARTICLES ', () => {
    expect(
      reducer(undefined, {
        type: FETCH_ALL_ARTICLES,
        articles,
      }),
    ).toEqual({
      articles,
    });
  });
});

it('should handle FETCH_ALL_ARTICLES_FAIL ', () => {
  expect(
    reducer(undefined, {
      type: FETCH_ALL_ARTICLES_FAIL,
      error,
    }),
  ).toEqual({
    articles: error,
  });
});
