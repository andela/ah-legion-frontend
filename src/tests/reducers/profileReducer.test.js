import profileReducer from '../../store/reducers/profileReducer';
import {
  PROFILE_FETCH_FAILED,
  PROFILE_UPDATE_FAILED,
  PROFILE_UPDATE_SUCESSFUL,
  AUTHENTICATION_FAILED,
  PROFILE_FETCHED,
  FOLLOW_AUTHOR_SUCCESSFUL,
  UNFOLLOW_AUTHOR_SUCCESSFUL,
  FOLLOW_AUTHOR_FAILED,
  UNFOLLOW_AUTHOR_FAILED,
  AUTHOR_PROFILE_FETCHED_SUCCESSFUL,
  AUTHOR_PROFILE_FETCH_FAILED,
  ALL_AUTHOR_PROFILES_FETCHED_SUCCESSFUL,
  ALL_AUTHOR_PROFILES_FETCH_FAILED,
}
  from '../../store/actions/actionTypes';
import * as testData from '../mockData/profile';
import {mapDispatchToProps} from '../../components/articles/Articles'

describe('profile reducer', () => {
  it('should return the initial state', () => {
    expect(profileReducer(undefined, {})).toEqual(
      {
        profileData: {},
        profileUpdated: false,
        errors: [],
        error: false,
        authenticated: true,
        followStats: {},
        authorProfile: {},
        allAuthorProfiles: {},
      },
    );
  });

  it('should change state on action type profile fetched', () => {
    expect(
      profileReducer({}, {
        type: PROFILE_FETCHED,
        payload: {},
      }),
    ).toEqual(
      {
        profileData: {},
      },
    );
  });

  it('should change state on action type succesful profile update', () => {
    expect(
      profileReducer({}, {
        type: PROFILE_UPDATE_SUCESSFUL,
      }),
    ).toEqual(
      {
        authenticated: true,
        error: false,
        profileData: undefined,
        profileUpdated: true,
      },

    );
  });

  it('should change state on action type profile update failed', () => {
    expect(
      profileReducer({}, {
        type: PROFILE_UPDATE_FAILED,
      }),
    ).toEqual(
      {
        error: true,
        errors: undefined,
      },
    );
  });
  it('should change state on action type profile fetch failed', () => {
    expect(
      profileReducer({}, {
        type: PROFILE_FETCH_FAILED,
      }),
    ).toEqual(
      {
        errors: undefined,
      },
    );
  });
  it('should change state on action type auth fail', () => {
    expect(
      profileReducer({}, {
        type: AUTHENTICATION_FAILED,
      }),
    ).toEqual(
      {
        errors: undefined,
        authenticated: false,
      },
    );
  });
  it('should change state on action type FOLLOW_AUTHOR_SUCCESSFUL', () => {
    expect(
      profileReducer({}, {
        type: FOLLOW_AUTHOR_SUCCESSFUL,
        payload: testData.followAuthorProfile,
      }),
    ).toEqual(
      {
        authorProfile: { profile: testData.followAuthorProfile.profile.user_of_interest },
      },
    );
  });
  it('should change state on action type UNFOLLOW_AUTHOR_SUCCESSFUL', () => {
    expect(
      profileReducer({}, {
        type: UNFOLLOW_AUTHOR_SUCCESSFUL,
        payload: testData.unfollowAuthorProfile,
      }),
    ).toEqual(
      {
        authorProfile: { profile: testData.unfollowAuthorProfile.profile.user_of_interest },
      },
    );
  });
  it('should change state on action type FOLLOW_AUTHOR_FAILED', () => {
    expect(
      profileReducer({}, {
        type: FOLLOW_AUTHOR_FAILED,
        payload: testData.followAuthorFailed,
      }),
    ).toEqual(
      {
        errors: testData.followAuthorFailed,
      },
    );
  });
  it('should change state on action type UNFOLLOW_AUTHOR_FAILED', () => {
    expect(
      profileReducer({}, {
        type: UNFOLLOW_AUTHOR_FAILED,
        payload: testData.unfollowAuthorFailed,
      }),
    ).toEqual(
      {
        errors: testData.unfollowAuthorFailed,
      },
    );
  });
  it('should change state on action type AUTHOR_PROFILE_FETCHED_SUCCESSFUL', () => {
    expect(
      profileReducer({}, {
        type: AUTHOR_PROFILE_FETCHED_SUCCESSFUL,
        payload: testData.authorProfile,
      }),
    ).toEqual(
      {
        authorProfile: testData.authorProfile,
      },
    );
  });
  it('should change state on action type AUTHOR_PROFILE_FETCH_FAILED', () => {
    expect(
      profileReducer({}, {
        type: AUTHOR_PROFILE_FETCH_FAILED,
        payload: testData.failedProfileAuthor,
      }),
    ).toEqual(
      {
        errors: testData.failedProfileAuthor,
      },
    );
  });
  it('should change state on action type ALL_AUTHOR_PROFILES_FETCHED_SUCCESSFUL', () => {
    expect(
      profileReducer({}, {
        type: ALL_AUTHOR_PROFILES_FETCHED_SUCCESSFUL,
        payload: testData.allAuthorProfiles,
      }),
    ).toEqual(
      {
        allAuthorProfiles: testData.allAuthorProfiles,
      },
    );
  });
  it('should change state on action type ALL_AUTHOR_PROFILES_FETCH_FAILED', () => {
    expect(
      profileReducer({}, {
        type: ALL_AUTHOR_PROFILES_FETCH_FAILED,
        payload: testData.failedAllAuthorsProfiles,
      }),
    ).toEqual(
      {
        errors: testData.failedAllAuthorsProfiles,
      },
    );
  });
  it('should change state on action type ALL_AUTHOR_PROFILES_FETCH_FAILED', () => {
    expect(
      profileReducer({}, {
        type: AUTHOR_PROFILE_FETCH_FAILED,
        payload: testData.failedAllAuthorsProfiles,
      }),
    ).toEqual(
      {
        authorProfile: testData.failedAllAuthorsProfiles,
      },
    );
  });
});

describe('MapDispatchToProps', () => { 
  const dispatch = jest.fn()
  it('register user function is called', () => {
    mapDispatchToProps(dispatch).fetchPersonalUserArticles('payload');
    expect(dispatch).toHaveBeenCalled();
  });
});