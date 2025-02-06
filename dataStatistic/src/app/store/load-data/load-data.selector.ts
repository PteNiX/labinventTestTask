import {createSelector, createFeatureSelector} from '@ngrx/store';
import {DataState} from '../../interfaces/data.interface';

export const selectDataState = createFeatureSelector<DataState>('data');

export const selectLoadedFiles = createSelector(
  selectDataState,
  (state) => state.uploadedFiles
);
