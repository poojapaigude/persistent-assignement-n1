
import { User } from 'src/app/shared/models/User';
import { AuthAction, AuthActionTypes } from './user.actions';

export interface State {
  user: User | null;
}

export const initialState: State = {
  user: null,
};
export function reducer(state = initialState, action: AuthAction): State {
  switch (action.type) {
    case AuthActionTypes.SIGNUP_SUCCESS: {
      return {
        ...state,
        user: action.payload,
      };
    }
    case AuthActionTypes.SIGNUP_FAILURE: {
      return {
        ...state,
      };
    }
    case AuthActionTypes.LOGIN_FAIL: {
      return {
        ...state,
      };
    }
    case AuthActionTypes.LOGOUT: {
      return initialState;
    }
    case AuthActionTypes.LOGIN_SUCCESS: {
      return {
        ...state,
        user: {
          name: action.payload.name,
          username: action.payload.username,
          password: action.payload.password
        },
      };
    }
    default: {
      return state;
    }
  }
}
