import articleReducer from '../../store/reducers/personalArticlesReducer';
import * as types from '../../store/actions/actionTypes';

describe('article reducer', () => {
  it('should return the initial state', () => {
    expect(articleReducer(undefined, {})).toEqual(
      {
        personalArticles: [],
        errors: {},
      },
    );
  });
  it('should change state on action type articles fetched', () => {
    expect(
      articleReducer({}, {
        type: types.PERSONAL_ARTICLES_FETCHED,
        payload: [],
      }),
    ).toEqual(
      {
        personalArticles: [],
      },
    );
  });
  it('should change state on action type articles fetched', () => {
    expect(
      articleReducer({}, {
        type: types.ARTICLE_FETCH_FAILED,
        payload: [],
      }),
    ).toEqual(
      {
        errors: [],
      },
    );
  });
});
