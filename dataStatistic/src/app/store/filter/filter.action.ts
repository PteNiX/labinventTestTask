import { createAction, props } from '@ngrx/store';

export const setSortAlphabetically = createAction(
  '[Filter] Set Sort Alphabetically',
  props<{ sortAlphabetically: boolean }>()
);

export const setHideZeroValues = createAction(
  '[Filter] Set Hide Zero Values',
  props<{ hideZeroValues: boolean }>()
);

export const setMinValue = createAction(
  '[Filter] Set Min Value',
  props<{ minValue: number }>()
);
