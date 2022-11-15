import { IUser } from 'interfaces/IUser';
import { UserActionTypes } from './UserTypes';

export interface IUserState {
  user?: IUser;
}

const userReducerDefaultState: IUserState = {
  user: undefined,
};

export const userReducer = (
  state = userReducerDefaultState,
  action: UserActionTypes
): IUserState => {
  switch (action.type) {
    case 'RESET_USER': {
      return {
        user: undefined,
      };
    }
    case 'SET_USER': {
      return {
        ...state,
        user: {
          ...action.user,
        },
      };
    }
    default:
      return state;
  }
};
