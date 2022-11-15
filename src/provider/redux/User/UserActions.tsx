import { IUser } from 'interfaces/IUser';
import { Dispatch } from 'react';
import { IUserState } from './UserReducer';
import { UserActionTypes } from './UserTypes';

export const actionResetUser = () => {
  return async (
    dispatch: Dispatch<UserActionTypes>,
    getState: () => IUserState
  ) => {
    dispatch({ type: 'RESET_USER' });
  };
};

export const actionSetUser = (user: IUser) => {
  return async (
    dispatch: Dispatch<UserActionTypes>,
    getState: () => IUserState
  ) => {
    dispatch({ type: 'SET_USER', user: user });
  };
};
