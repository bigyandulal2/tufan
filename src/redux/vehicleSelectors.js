import { createSelector } from 'reselect';

const selectVehiclesState = (state) => state.vehicles;

// 🔹 सबै vehicles
export const selectVehiclesItems = createSelector(
  [selectVehiclesState],
  (vehiclesState) => vehiclesState?.items || []
);

// 🔹 छानिएको vehicle
export const selectSelectedVehicle = createSelector(
  [selectVehiclesState],
  (vehiclesState) => vehiclesState?.selectedVehicle || null
);

// 🔹 vehicles को overall status
export const selectVehiclesStatus = createSelector(
  [selectVehiclesState],
  (vehiclesState) => vehiclesState?.status || 'idle'
);

// 🔹 vehicles को error message
export const selectVehiclesError = createSelector(
  [selectVehiclesState],
  (vehiclesState) => vehiclesState?.error || null
);

// 🔹 सबै vehicle image urls
export const selectVehicleImages = createSelector(
  [selectVehiclesState],
  (vehiclesState) => vehiclesState?.imageUrls || {}
);

// 🔹 fileName अनुसार specific vehicle image url
export const selectVehicleImageByFileName = (fileName) =>
  createSelector(
    [selectVehiclesState],
    (vehiclesState) => vehiclesState?.imageUrls?.[fileName] || null
  );

// 🔹 fileName अनुसार vehicle image loading status
export const selectVehicleImageStatusByFileName = (fileName) =>
  createSelector(
    [selectVehiclesState],
    (vehiclesState) => vehiclesState?.imageStatuses?.[fileName] || 'idle'
  );

// 🔹 fileName अनुसार vehicle image loading error
export const selectVehicleImageErrorByFileName = (fileName) =>
  createSelector(
    [selectVehiclesState],
    (vehiclesState) => vehiclesState?.imageErrors?.[fileName] || null
  );
