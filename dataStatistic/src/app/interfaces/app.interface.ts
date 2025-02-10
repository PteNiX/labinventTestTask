import {DataState} from './data.interface';
import {FilterState} from './filter.interface';

export interface AppState {
  data: DataState;
  filter: FilterState;
}
