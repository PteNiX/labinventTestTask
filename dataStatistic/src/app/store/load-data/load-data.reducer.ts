import {createReducer, on} from '@ngrx/store';
import {uploadDataAction} from './load-data.actions';
import {DataState} from '../../interfaces/data.interface';

export const initialLoadDataState: DataState = {
  dataset: []
};

export const dataReducer = createReducer(
  initialLoadDataState,
  on(uploadDataAction, (state, {data}) => ({
    ...state,
    dataset: data
  }))
);
