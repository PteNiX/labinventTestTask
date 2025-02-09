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

    const sum = data.reduce((acc, item) => acc + item.value, 0);
    const minValueThreshold = sum * 0.001;

    let filteredData = data.filter(item => {
      return (!filters.hideZeroValues || item.value > 0) &&
        (!filters.minValue || item.value >= minValueThreshold);
    });

    if (filters.sortAlphabetically) {
      filteredData = [...filteredData].sort((a, b) => a.category.localeCompare(b.category));
    } else {
      filteredData = data.filter(d => filteredData.some(fd => fd.category === d.category));
    }

    return filteredData;
  }
);
