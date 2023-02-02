import { configureStore } from '@reduxjs/toolkit';
import { marvelApi } from '../api/api-slice';

const stringMiddleware =
    ({ dispatch, getState }) =>
    (next) =>
    (action) => {
        if (typeof action === 'string') {
            return next({ type: action });
        }

        return next(action);
    };

const store = configureStore({
    reducer: {
        [marvelApi.reducerPath]: marvelApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(stringMiddleware, marvelApi.middleware),
    devTools: process.env.NODE_ENV !== 'production',
});

export default store;