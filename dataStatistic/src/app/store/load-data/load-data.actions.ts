import {createAction, props} from '@ngrx/store';

export const loadDataAction = createAction(
  '[Load Data] Upload Data',
  props<{ file: { filename: string; date: Date; data: { category: string; value: number }[] } }>()

);

export const setSelectedFile = createAction(
  '[File] Set Selected File',
  props<{ selectedFileData: { category: string; value: number }[] }>()
);
