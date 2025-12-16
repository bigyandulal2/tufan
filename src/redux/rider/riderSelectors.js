import { createSelector } from 'reselect';

export const selectRidersState = (state) => state.riders;


// 🔹 All Riders
export const selectRidersItems = createSelector(
  [selectRidersState],
  (ridersState) => ridersState?.items || []
);

// 🔹 Pending Riders
export const selectPendingRidersItems = createSelector(
  [selectRidersState],
  (ridersState) => ridersState?.pendingItems?.content || []
);

// 🔹 Selected Rider
export const selectSelectedRider = createSelector(
  [selectRidersState],
  (ridersState) => ridersState?.selectedRider || null
);

// 🔹 Statuses
export const selectRidersStatus = createSelector(
  [selectRidersState],
  (ridersState) => ridersState?.status || 'idle'
);

export const selectPendingRidersStatus = createSelector(
  [selectRidersState],
  (ridersState) => ridersState?.pendingRidersStatus || 'idle'
);

// 🔹 Errors
export const selectRidersError = createSelector(
  [selectRidersState],
  (ridersState) => ridersState?.error || null
);

// 🔹 Rider Images
export const selectRiderImages = createSelector(
  [selectRidersState],
  (ridersState) => ridersState?.imageUrls || {}
);

// 🔹 Image by filename
export const selectRiderImageByFileName = (fileName) =>
  createSelector(
    [selectRidersState],
    (ridersState) => ridersState?.imageUrls?.[fileName] || null
  );

export const selectRiderImageStatusByFileName = (fileName) =>
  createSelector(
    [selectRidersState],
    (ridersState) => ridersState?.imageStatuses?.[fileName] || 'idle'
  );

export const selectRiderImageErrorByFileName = (fileName) =>
  createSelector(
    [selectRidersState],
    (ridersState) => ridersState?.imageErrors?.[fileName] || null
  );

//  total number of pages 
export const selectRidersPages = createSelector(
  [selectRidersState],
  (ridersState) => ridersState?.totalPages || []
);