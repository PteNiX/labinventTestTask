import {ActionReducerMap, provideStore, StoreModule} from '@ngrx/store';
import {metaReducers} from './meta-reducers';
import {dataReducer} from './load-data/load-data.reducer';
import {AppState} from '../interfaces/app.interface';


export const reducers: ActionReducerMap<AppState> = {
  data: dataReducer
};



export const provideAppStore = () => provideStore(reducers, { metaReducers });
