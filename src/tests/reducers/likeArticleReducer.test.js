import likeReducers from '../../store/reducers/likeArticleReducers';
import {
    FETCH_TOTAL_LIKES,
    HAS_REACTION,
    REMOVE_REACTION,
  } from '../../store/actions/actionTypes';

  describe('like article reducers tests', () => {
    it('should return the initial state', () => {
      expect(likeReducers(undefined, {})).toEqual(
        {
            hasLiked: false,
            likeState: false,
            likeID: -1,
            totalLikes: 0,
            totalDislikes: 0,
        },
      );
    });
    it('should change state on action type FETCH_TOTAL_LIKES', () => {
        expect(
            likeReducers({}, {
            type: FETCH_TOTAL_LIKES,
            payload:{
                total_likes: 0,
                total_dislikes: 0,
            },
            })
        ).toEqual(
          {
            totalDislikes: 0,
            totalLikes: 0
          },
        )
      });
    it('should change state on action type HAS_REACTION', () => {
        expect(
            likeReducers({}, {
            type: HAS_REACTION,
            payload:{
                is_like: true,
                id: 1,
            },
            })
        ).toEqual(
            {
              hasLiked: true,
              likeState: true,
              likeID: 1,
            },
        )
      })
    it('should change state on action type REMOVE_REACTION', () => {
        expect(
            likeReducers({}, {
            type: REMOVE_REACTION,
            })
        ).toEqual(
            {
              hasLiked: false,
              likeState: false,
              likeID: -1,
            },
        )
      })
});
