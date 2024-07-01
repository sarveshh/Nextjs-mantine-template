import { combineReducers } from "@reduxjs/toolkit";
import { getPersistConfig } from "redux-deep-persist";
import { persistReducer } from "redux-persist";
import countReducer from "./countSlice";
import storage from "./storage";

export const storageKeys = {
  count: "ajsysgGGG",
};

const appReducer = combineReducers({
  count: countReducer,
});

const rootReducer = (state: any, action: any) => {
  if (action.type === "CLEAR_STORE") {
    state = undefined;

    Object.values(storageKeys).forEach(async (key) => {
      await storage.removeItem(key);
    });
  }

  return appReducer(state, action);
};

const config = getPersistConfig({
  storage: storage,
  key: storageKeys.count,
  whitelist: ["count"],
  rootReducer,
});

export default persistReducer(config, rootReducer);
