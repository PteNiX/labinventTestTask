import {createReducer, on} from '@ngrx/store';
import {loadDataAction, setSelectedFile} from './load-data.actions';
import {initialLoadDataState} from './load-data.state';

export const loadDataReducer = createReducer(
  initialLoadDataState,
  on(loadDataAction, (state, {file}) => {
    const updatedFiles = [file, ...state.uploadedFiles];

    if (updatedFiles.length > 5) {
      updatedFiles.pop();
    }

    return {...state, uploadedFiles: updatedFiles};
  }),
  on(setSelectedFile, (state, {selectedFileData}) => ({
    ...state,
    selectedFileData
  }))
);
