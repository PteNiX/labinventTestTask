import {createSelector, createFeatureSelector} from '@ngrx/store';
import {DataState} from '../../interfaces/data.interface';

export const selectDataState = createFeatureSelector<DataState>('data');

export const selectDataset = createSelector(
  selectDataState,
  (state) => state.dataset
);

