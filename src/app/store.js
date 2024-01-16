// import { compose, applyMiddleware } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
// import logger from 'redux-logger';

// import createSagaMiddleware from 'redux-saga';

// import { rootSaga } from './root-saga';

// import { rootReducer } from './root-reducer';


import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query/react';
import { apiSlice } from '../features/api/api';
import { combineReducers } from 'redux';
import auth from '../features/auth/authSlice';


const persistConfig = {
  key: 'root',
  storage,
  // whitelist: ['cart'],
};

// const sagaMiddleware = createSagaMiddleware();


// const middleWares = [
//   process.env.NODE_ENV !== 'production' && logger,
//   sagaMiddleware,
//   apiSlice.middleware
// ].filter(Boolean);

// const composeEnhancer =
//   (process.env.NODE_ENV !== 'production' &&
//     window &&
//     window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
//   compose;

// const composedEnhancers = composeEnhancer(applyMiddleware(...middleWares));
// console.log(composedEnhancers);
// export const store = createStore(
//   persistedReducer,
//   undefined,
//   composedEnhancers
// );

 const rootReducer = combineReducers({
    auth: auth,
    [apiSlice.reducerPath]: apiSlice.reducer
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

// console.log(apiSlice.reducerPath);
// console.log(apiSlice.reducer);
 export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    // getDefaultMiddleware().concat(sagaMiddleware, apiSlice.middleware),
        getDefaultMiddleware().concat(apiSlice.middleware),
      // getDefaultMiddleware().concat(composedEnhancers),
  devTools: true
})

setupListeners(store.dispatch);

//  store;
// 
// sagaMiddleware.run(rootSaga);

export const persistor = persistStore(store);
