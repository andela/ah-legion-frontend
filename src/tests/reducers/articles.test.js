import {
  FETCH_ALL_ARTICLES,
  CREATE_ARTICLE_FAIL,
  FETCH_ARTICLES_BY_AUTHOR,
  AUTHOR_ARTICLES_FETCH_FAILED,
  EDIT_ARTICLE,
  FETCH_ALL_ARTICLES_FAIL,
  FETCH_ARTICLES_BY_AUTHOR_FAIL,
  EDIT_ARTICLE_FAIL,
  PUBLISH_ARTICLE,
  PUBLISH_ARTICLE_FAIL,
} from '../../store/actions/actionTypes';
import reducer from '../../store/reducers/articlesReducer';
import {
  articles, error, article,
} from '../testData';
import { isUndefined } from 'util';


describe('register reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(
      {
        articles: [],
        article: [],
        authorArticles: [],
        editedArticle: [],
        publishedArticle: [],
      },
    );
  });
  it('should change state on action type FETCH_ALL_ARTICLES', () => {
    expect(
      reducer({}, {
        type: FETCH_ALL_ARTICLES,
        articles: {
          articles,
        },
      }),
    ).toEqual(
      {"articles": {"articles": [{"author": {"username": "Josh_Moracha"}, "created_at": "2019-04-09T20:56:04.410399+03:00", "description": "Ever wonder how?", "id": 7, "reading_time": "1 minutes", "title": "Andela TIA"}, {"author": {"username": "Josh_Moracha"}, "created_at": "2019-04-09T20:56:04.410399+03:00", "description": "Ever wonder how?", "id": 64, "reading_time": "1 minutes", "title": "Andela TIA"}]}}
    );
  });
  it('should change state on action type EDIT_ARTICLE', () => {
    expect(
      reducer({}, {
        type: EDIT_ARTICLE,
        articles: {
          articles,
        },
      }),
    ).toEqual(
      {"editedArticle": undefined}
    );
  });
  it('should change state on action type EDIT_ARTICLE', () => {
    expect(
      reducer({}, {
        type: EDIT_ARTICLE,
        articles: {
          articles,
        },
      }),
    ).toEqual(
      {"editedArticle": undefined}
    );
  });
  it('should change state on action type CREATE_ARTICLE_FAIL', () => {
    expect(
      reducer({}, {
        type: CREATE_ARTICLE_FAIL,
        articles: {
          articles,
        },
      }),
    ).toEqual(
      {"editedArticle": undefined}
    );
  });
  it('should change state on action type FETCH_ARTICLES_BY_AUTHOR_FAIL', () => {
    expect(
      reducer({}, {
        type: FETCH_ARTICLES_BY_AUTHOR_FAIL,
        articles: {
          articles,
        },
      }),
    ).toEqual(
      {"editedArticle": undefined}
    );
  });
  it('should change state on action type AUTHOR_ARTICLES_FETCH_FAILED', () => {
    expect(
      reducer({}, {
        type: AUTHOR_ARTICLES_FETCH_FAILED,
        articles: {
          articles,
        },
      }),
    ).toEqual(
      {"editedArticle": undefined}
    );
  });
  it('should change state on action type PUBLISH_ARTICLE', () => {
    expect(
      reducer(undefined, {
        type: PUBLISH_ARTICLE,
        articles: {
          articles,
        },
      }),
    ).toEqual(
      {"article": [], "articles": [], "authorArticles": [], "editedArticle": [], "publishedArticle": undefined}
    );
  });
});


it('should handle FETCH_ALL_ARTICLES_FAIL ', () => {
  expect(
    reducer(undefined, {
      type: FETCH_ALL_ARTICLES_FAIL,
      error,
    }),
  ).toEqual(
    {"article": [], "articles": "Network Error at createError (https://ah-legion-staging.herokuapp.com/static/js/0.chunk.js:1006:15) at XMLHttpRequest.handleError (https://ah-legion-staging.hssserokuapp.com/static/js/0.chunk.js:557:14)", "authorArticles": [], "editedArticle": [], "publishedArticle": []}
  );
});
