import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import { registroReducer } from '../features/registroSlice';
import { materialReducer } from '../features/materialSlice';

export const store = configureStore({
  reducer: {
    registro: registroReducer,
    material: materialReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;
