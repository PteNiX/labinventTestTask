import {ActionReducerMap, provideStore, StoreModule} from '@ngrx/store';
import {metaReducers} from './meta-reducers';
import {dataReducer} from './load-data/load-data.reducer';
import {AppState} from '../interfaces/app.interface';
import {NgModule} from '@angular/core';


export const reducers: ActionReducerMap<AppState> = {
  data: dataReducer
};

@NgModule({
  imports: [
    StoreModule.forRoot(reducers, {metaReducers})
  ],
  exports: [StoreModule]
})
export class AppStoreModule {
}

export const provideAppStore = () => provideStore(reducers, { metaReducers });
