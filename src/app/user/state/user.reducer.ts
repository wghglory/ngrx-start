import { User } from '../user';

/* NgRx */
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { UserActions, UserActionTypes } from './user.actions';

// State for this feature (User) strong type
export interface UserState {
  maskUserName: boolean;
  currentUser: User;
}

const initialState: UserState = {
  maskUserName: true,
  currentUser: null,
};

// selector
const getUserFeatureState = createFeatureSelector<UserState>('users');

export const getMaskUserName = createSelector(getUserFeatureState, (state) => state.maskUserName);

export const getCurrentUser = createSelector(getUserFeatureState, (state) => state.currentUser);

// reducer
export function reducer(state = initialState, action: UserActions): UserState {
  switch (action.type) {
    case UserActionTypes.MaskUserName:
      return {
        ...state,
        maskUserName: action.payload,
      };
    default:
      return state;
  }
}
