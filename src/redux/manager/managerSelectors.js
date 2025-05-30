import { createSelector } from 'reselect';

// Get the full managers slice
const selectManagersState = (state) => state.managers;

// Memoized selector for manager items
export const selectManagersItems = createSelector(
  [selectManagersState],
  (managersState) => managersState?.items || []
);

export const selectSelectedManager = createSelector(
  [selectManagersState],
  (managersState) => managersState?.selectedManager || null
);


// Memoized selector for status
export const selectManagersStatus = createSelector(
  [selectManagersState],
  (managersState) => managersState?.status || 'idle'
);

export const selectManagersError = createSelector(
  [selectManagersState],
  (managersState) => managersState?.error || null
);

