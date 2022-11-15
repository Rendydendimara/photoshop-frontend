import { IUser } from 'interfaces/IUser';

export type UserActionTypes =
  | {
      type: 'RESET_USER';
    }
  | {
      type: 'SET_USER';
      user: IUser;
    };
