import commentReducers from '../../store/reducers/commentReducers';
import {
    FETCH_AN_ARTICLE,
    FETCH_ARTICLE_COMMENTS,
    FETCH_AN_ARTICLE_404,
    CREATE_COMMENT_SUCCESS,
    CREATE_REPLY_SUCCESS,
    LOGGED_IN,
    DELETED_COMMENT,
    EDITED_COMMENT,
    FINISH_DELETE,
    FINISH_EDIT,
  } from '../../store/actions/actionTypes';
  import { sampleComments } from '../testData';

describe('comments reducers tests', () => {
  it('should return the initial state', () => {
    expect(commentReducers(undefined, {})).toEqual(
      {
        "author": {},
        "changedComment": false,
        "changedCommentData": "",
        "commentCreated": false,
        "comments": [],
        "createCommentError": false,
        "creatingComment": true,
        "creatingReply": true,
        "deletedComment": false,
        "deletedCommentId": false,
        "errors": null,
        "isFetchingArticle": true,
        "isFetchingComments": true,
        "isLoggedIn": false,
        "newReply": {},
        "replyCreated": false,
        "slug": ""
      },
    );
  });

  it('should change state on action type FETCH_AN_ARTICLE', () => {
    expect(
        commentReducers({}, {
        type: FETCH_AN_ARTICLE,
        payload:{},
        })
    ).toEqual(
      {
        article: {}, isFetchingArticle: false, slug: undefined,
      },
    )
  })

  it('should change state on action type succesful FETCH_ARTICLE_COMMENTS', () => {
    expect(
        commentReducers({}, {
        type: FETCH_ARTICLE_COMMENTS
      })
    ).toEqual(
        {comments: undefined, isFetchingComments: false}
      
    )
  })

  it('should change state on action type FETCH_AN_ARTICLE_404', () => {
    expect(
      commentReducers({}, {
        type: FETCH_AN_ARTICLE_404
      })
    ).toEqual(
        {errors: undefined, isFetchingArticle: false}
    )
  })
  it('should change state on action type LOGGED_IN', () => {
    expect(
      commentReducers({}, {
        type: LOGGED_IN
      })
    ).toEqual(
      {"isLoggedIn": true}
    )
  })
  it('should change state on action type DELETED_COMMENT', () => {
    expect(
      commentReducers({}, {
        type: DELETED_COMMENT
      })
    ).toEqual(
      {"deletedComment": true, "deletedCommentId": undefined}
    )
  })
  it('should change state on action type EDITED_COMMENT', () => {
    expect(
      commentReducers({}, {
        type: EDITED_COMMENT
      })
    ).toEqual(
      {"changedComment": true, "changedCommentData": undefined}
    )
  })
  it('should change state on action type FINISH_DELETE', () => {
    expect(
      commentReducers({}, {
        type: FINISH_DELETE
      })
    ).toEqual(
      {"deletedComment": false}
    )
  })
  it('should change state on action type FINISH_EDIT', () => {
    expect(
      commentReducers({}, {
        type: FINISH_EDIT
      })
    ).toEqual(
      {"changedComment": false}
    )
  })
  it('should change state on action type CREATE_COMMENT_SUCCESS', () => {
    expect(
      commentReducers({}, {
        type: CREATE_COMMENT_SUCCESS,
        payload: sampleComments[0]
      })
    ).toEqual(
        {commentCreated: true}
    )
  })
  it('should change state on action type CREATE_REPLY_SUCCESS', () => {
    expect(
      commentReducers({}, {
        type: CREATE_REPLY_SUCCESS
      })
    ).toEqual(
        {replyCreated: true}
    )
  })
});
