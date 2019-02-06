import { createSelector } from 'reselect';
import { getFilteredItems } from './stylesheetSelectors';
import { completed } from '../constants/applicationConstants';

const getActiveQueryTabState = state => state.query.get('activeQueryTab');
const getStatusState = state => state.query.get('status');
const getCurrentFilterState = state => state.query.get('currentFilter');
const getBboxState = state => state.query.get('bbox');
const getQueryPropertiesState = state => state.query.get('queryProperties');

export const getQueryProperties = createSelector(
  [getQueryPropertiesState],
  queryProperties => queryProperties
);

export const getActiveQueryTab = createSelector(
  [getActiveQueryTabState],
  activeQueryTab => activeQueryTab
);

export const getCurrentFilter = createSelector(
  [getCurrentFilterState],
  currentFilter => currentFilter
);

export const getQueryStatus = createSelector(
  [getStatusState],
  status => status
);

export const getBbox = createSelector(
  [getBboxState],
  bbox => bbox
);

export const getResultsTabDisabled = createSelector(
  [getStatusState, getFilteredItems],
  (status, filteredItems) => {
    let disabled;
    if (status === completed && filteredItems.size) {
      disabled = false;
    } else {
      disabled = true;
    }
    return disabled;
  }
);
