import {createSelector} from '@ngrx/store';
import {DataState} from '../../interfaces/data.interface';
import {FilterState} from '../../interfaces/filter.interface';

export const selectFileData = (state: { data: DataState; filter: FilterState }) => state.data.selectedFileData;
export const selectFilters = (state: { data: DataState; filter: FilterState }) => state.filter;

export const selectFilteredData = createSelector(
  selectFileData,
  selectFilters,
  (data, filters) => {
    if (!data) return [];

    let filteredData = [...data];

    if (filters.sortAlphabetically) {
      filteredData.sort((a, b) => a.category.localeCompare(b.category));
    }

    if (filters.hideZeroValues) {
      filteredData = filteredData.filter(item => item.value > 0);
    }

    return filteredData;
  }
);
