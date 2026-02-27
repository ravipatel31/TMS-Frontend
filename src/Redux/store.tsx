// import { configureStore } from '@reduxjs/toolkit'
// import globalReducer from './Reducers/globalSlice'
// import loadingReducer from './Reducers/loadingSlice'
// import dashboardReducer from './Reducers/dashboardSlice'
// import { persistStore, persistReducer } from "redux-persist"
// import storageSession from "redux-persist/lib/storage/session"

// const persistConfig = {
//     key: "root",
//     storage: storageSession,
// }

// const persistedReducer = persistReducer(persistConfig, globalReducer)

// export const store = configureStore({
//     reducer: {
//         global: persistedReducer,
//         loading: loadingReducer,
//         dashboard:dashboardReducer
//     },
// })

// export const persistor = persistStore(store)

// export type RootState = ReturnType<typeof store.getState>;
// export type AppDispatch = typeof store.dispatch;

// export default store;

import { configureStore } from '@reduxjs/toolkit'
import globalReducer from './Reducers/globalSlice'
import loadingReducer from './Reducers/loadingSlice'
import dashboardReducer from './Reducers/dashboardSlice'

import { persistStore, persistReducer } from "redux-persist"
import storageSession from "redux-persist/lib/storage/session"

import {
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist"

const persistConfig = {
  key: "root",
  storage: storageSession,
}

const persistedReducer = persistReducer(persistConfig, globalReducer)

export const store = configureStore({
  reducer: {
    global: persistedReducer,
    loading: loadingReducer,
    dashboard: dashboardReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [
          FLUSH,
          REHYDRATE,
          PAUSE,
          PERSIST,
          PURGE,
          REGISTER,
        ],
      },
    }),
})

export const persistor = persistStore(store)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store
