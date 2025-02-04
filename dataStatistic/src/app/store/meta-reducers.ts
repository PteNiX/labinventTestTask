import {ActionReducer, MetaReducer} from '@ngrx/store';
import {AppState} from '../interfaces/app.interface';

export function logger(reducer: ActionReducer<AppState>): ActionReducer<AppState> {
  return (state, action) => {
    console.log('Action:', action);
    console.log('State before:', state);
    const newState = reducer(state, action);
    console.log('State after:', newState);
    return newState;
  };
}

export const metaReducers: MetaReducer<AppState>[] = [logger];
