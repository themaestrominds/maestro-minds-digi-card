import { configureStore } from '@reduxjs/toolkit';
import maestroReducer from './maestroSlice';

export const store = configureStore({
    reducer: {
        maestro: maestroReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
