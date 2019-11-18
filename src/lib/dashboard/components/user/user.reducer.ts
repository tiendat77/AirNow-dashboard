import { Map } from 'immutable';
import * as UserActions from './user.actions';
import { UserState } from './user.model';

export type UserActions = UserActions.ALL;

const initialState = Map({
  users: [],
});

export function userReducer(state: UserState = initialState, action: UserActions.ALL) {

  switch(action.type) {
    case UserActions.FETCH_DATA: {
      const userList = action.payload;
      return state.set('users', userList);
    }

    default:
      return state;
  }
}
