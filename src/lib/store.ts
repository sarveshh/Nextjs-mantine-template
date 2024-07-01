import { Dispatch, Middleware, configureStore } from "@reduxjs/toolkit";
import { createLogger } from "redux-logger";
import { persistStore } from "redux-persist";
import rootReducer from "./rootReducer";

const middlewares: Middleware<Record<string, never>, any, Dispatch>[] = [];

if (process.env.NODE_ENV === "development") middlewares.push(createLogger());

export const makeStore = () => {
  const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: false,
        immutableCheck: process.env.NODE_ENV === "development",
      }).concat(...middlewares),
  });
  const persistor = persistStore(store);
  return { store, persistor };
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["store"]["getState"]>;
export type AppDispatch = AppStore["store"]["dispatch"];
