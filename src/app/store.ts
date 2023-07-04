import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import { materialReducer } from '../features/materialSlice';
import { registroReducer } from '../features/registroSlice';

export const store = configureStore({
  reducer: {
    material: materialReducer,
    registro: registroReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;
