import {createReducer, on} from '@ngrx/store';
import {loadDataAction, setSelectedFile} from './load-data.actions';
import {DataState} from '../../interfaces/data.interface';

const initialLoadDataState: DataState = {
  uploadedFiles: [],
  selectedFileData: null
};

export const loadDataReducer = createReducer(
  initialLoadDataState,
  on(loadDataAction, (state, {file}) => {
    const updatedFiles = [...state.uploadedFiles, file];

    if (updatedFiles.length > 5) {
      updatedFiles.shift();
    }

    return {...state, uploadedFiles: updatedFiles};
  }),
  on(setSelectedFile, (state, { selectedFileData }) => ({
    ...state,
    selectedFileData
  }))
);
