import { configureStore } from "@reduxjs/toolkit";
import pinsReducer from "./features/pins/pinsSlice";
import { pinsApi } from "./features/pins/pinsApi";
import { eventsApi } from "./features/events/eventsApi";

export const makeStore = () => {
  return configureStore({
    reducer: {
      pins: pinsReducer,
      [pinsApi.reducerPath]: pinsApi.reducer,
      [eventsApi.reducerPath]: eventsApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(pinsApi.middleware, eventsApi.middleware),
  });
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
