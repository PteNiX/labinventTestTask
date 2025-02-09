import {createReducer, on} from '@ngrx/store';
import {setHideZeroValues, setMinValue, setSortAlphabetically} from './filter.action';
import {initialFilterState} from './filter.state';

export const filterReducer = createReducer(
  initialFilterState,
  on(setSortAlphabetically, (state, {sortAlphabetically}) => ({
    ...state,
    sortAlphabetically
  })),
  on(setHideZeroValues, (state, {hideZeroValues}) => ({
    ...state,
    hideZeroValues
  })),
  on(setMinValue, (state, {minValue}) => ({
    ...state,
    minValue
  }))
);
