import {createAction, props} from '@ngrx/store';

export const uploadDataAction = createAction(
  '[Load Data] Upload Data',
  props<{ data: { category: string; value: number }[] }>()
);
