import { configureStore } from '@reduxjs/toolkit';
import branchReducer from './branchSlice';
import ridersReducer from './rider/ridersSlice'; // ✅ FIXED path
import managersReducer from './manager/managersSlice'; // ✅ FIXED path
import pricesSlice from './PriceSlice';
import VehiclesReducer from './vehicleSlice';
import notificationReducer from "./notificationSlice";


export const store = configureStore({
  reducer: {
    branches: branchReducer,
    riders: ridersReducer,
    managers: managersReducer,
    prices: pricesSlice,
    vehicles: VehiclesReducer,
    notification: notificationReducer,

  },
});
