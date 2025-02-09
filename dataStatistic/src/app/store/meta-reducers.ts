import {ActionReducer, MetaReducer} from '@ngrx/store';
import {AppState} from '../interfaces/app.interface';

export function logger(reducer: ActionReducer<AppState>): ActionReducer<AppState> {
  return (state, action) => {
    const newState = reducer(state, action);
    return newState;
  };
}

export const metaReducers: MetaReducer<AppState>[] = [logger];
