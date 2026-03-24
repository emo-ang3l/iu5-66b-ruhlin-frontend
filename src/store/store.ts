import { configureStore, combineReducers } from '@reduxjs/toolkit';
import userSlice from './userSlice';
import { persistReducer, persistStore } from 'redux-persist';
import createWebStorage from 'redux-persist/es/storage/createWebStorage';

// ESM-сборка Vite иначе может подставить обёртку `{ default }` вместо адаптера
const storage = createWebStorage('local');

const persistConfig = {
  key: 'root',
  storage,
};

const rootReducer = combineReducers({
  user: userSlice,  // стор состоит из одного слайса
});

// создаем редьюсера
const persistedReducer = persistReducer(persistConfig, rootReducer);

// конфигурирем стор
export const store = configureStore({
  reducer: persistedReducer,

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store); // стор персистентный, чтобы данные сохранялись в localStorage