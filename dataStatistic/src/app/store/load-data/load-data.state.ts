import {ActionReducerMap} from '@ngrx/store';
import {dataReducer} from './load-data.reducer';
import {AppState} from '../../interfaces/app.interface';

export const reducers: ActionReducerMap<AppState> = {
  data: dataReducer
};
