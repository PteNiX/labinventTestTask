import {ActionReducer, MetaReducer} from '@ngrx/store';
import {AppState} from '../interfaces/app.interface';

export function logger(reducer: ActionReducer<AppState>): ActionReducer<AppState> {
  return (state, action) => {
    return reducer(state, action);
  };
}

export const metaReducers: MetaReducer<AppState>[] = [logger];
