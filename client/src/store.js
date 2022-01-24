import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import rootReducer from "./reducers";

const initialState = {};

const middleware = [thunk];

const persistConfig = {
  key: "root",
  blacklist: ["errors"],
  storage,
}
 
const persistedReducer = persistReducer(persistConfig, rootReducer)

const buildStore = () => {
  let store = createStore(
    persistedReducer,
    initialState,
    compose(
      applyMiddleware(...middleware)/*,
      (window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ &&
        window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__()) ||
        compose*/
    )
  );
  let persistor = persistStore(store);
  return { store, persistor };
}

export default buildStore;
