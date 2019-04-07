import profileReducer from '../../store/reducers/profileReducer';
import { PROFILE_FETCH_FAILED, PROFILE_UPDATE_FAILED, PROFILE_UPDATE_SUCESSFUL, AUTHENTICATION_FAILED, PROFILE_FETCHED }
  from '../../store/actions/actionTypes';

describe('profile reducer', () => {
  it('should return the initial state', () => {
    expect(profileReducer(undefined, {})).toEqual(
      {
        profileData: {},
        profileUpdated: false,
        errors: [],
        error: false,
        authenticated: true,
      },
    );
  });

  it('should change state on action type profile fetched', () => {
    expect(
        profileReducer({}, {
        type: PROFILE_FETCHED,
        payload:{},
        })
    ).toEqual(
      {
        profileData: {},
      },
    )
  })

  it('should change state on action type succesful profile update', () => {
    expect(
        profileReducer({}, {
        type: PROFILE_UPDATE_SUCESSFUL
      })
    ).toEqual(
        {
          authenticated: true,
          error: false, 
          profileData: undefined,
          profileUpdated: true
        }
      
    )
  })

  it('should change state on action type profile update failed', () => {
    expect(
      profileReducer({}, {
        type: PROFILE_UPDATE_FAILED
      })
    ).toEqual(
      {
        error: true,
        errors: undefined
      }
    )
  })
  it('should change state on action type profile fetch failed', () => {
    expect(
      profileReducer({}, {
        type: PROFILE_FETCH_FAILED
      })
    ).toEqual(
      {
        errors: undefined
      }
    )
  })
  it('should change state on action type auth fail', () => {
    expect(
      profileReducer({}, {
        type: AUTHENTICATION_FAILED
      })
    ).toEqual(
      {
        errors: undefined,
        authenticated: false,
      }
    )
  })
});
