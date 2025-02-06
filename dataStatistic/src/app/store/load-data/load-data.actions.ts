import {createAction, props} from '@ngrx/store';

export const loadDataAction = createAction(
  '[Load Data] Upload Data',
  props<{ file: { filename: string; date: Date; data: { category: string; value: number }[] } }>()

);
