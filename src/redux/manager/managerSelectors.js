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
// redux/manager/managerSelectors.js
export const selectManagerById = (state, managerId) => {
  return state.managers.list.find(mgr => mgr.id === managerId);
};



// Memoized selector for status
export const selectManagersStatus = createSelector(
  [selectManagersState],
  (managersState) => managersState?.status || 'idle'
);

export const selectManagersError = createSelector(
  [selectManagersState],
  (managersState) => managersState?.error || null
);


export const selectManagerImages = createSelector(
  [selectManagersState],
  (managersState) => managersState?.imageUrls || {}
);



// 🔹 Image by filename
export const selectManagerImageByFileName = (fileName) =>
  createSelector(
    [selectManagersState],
    (managersState) => managersState?.imageUrls?.[fileName] || null
  );

export const selectManagerImageStatusByFileName = (fileName) =>
  createSelector(
    [selectManagersState],
    (managersState) => managersState?.imageStatuses?.[fileName] || 'idle'
  );

export const selectManagerImageErrorByFileName = (fileName) =>
  createSelector(
    [selectManagersState],
    (managersState) => managersState?.imageErrors?.[fileName] || null
  );

