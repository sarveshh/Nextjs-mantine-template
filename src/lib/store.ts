import {
  Dispatch,
  Middleware,
  combineReducers,
  configureStore,
} from "@reduxjs/toolkit";
import { createLogger } from "redux-logger";
import { persistReducer } from "redux-persist";
import createWebStorage from "redux-persist/lib/storage/createWebStorage";
import countReducer from "./countSlice";

const createNoopStorage = () => {
  return {
    getItem() {
      return Promise.resolve(null);
    },
    setItem(_key: string, value: number) {
      return Promise.resolve(value);
    },
    removeItem() {
      return Promise.resolve();
    },
  };
};

const storage =
  typeof window !== "undefined"
    ? createWebStorage("local")
    : createNoopStorage();

const authPersistConfig = {
  key: "count",
  storage: storage,
};

const persistedReducer = persistReducer(authPersistConfig, countReducer);

const rootReducer = combineReducers({
  count: persistedReducer,
});

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

  return store;
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
