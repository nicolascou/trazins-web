import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { IRegistro } from '../types/models';

const initialState = {
  intervencion: '',
  gabinete: '',
  numeroHistoriaClinica: '',
  fecha: new Date().toISOString().slice(0, 16),
} as IRegistro;

export const registroSlice = createSlice({
  name: 'registro',
  initialState,
  reducers: {
    setRegistro(state, action: PayloadAction<IRegistro>) {
      return action.payload;
    },
    cleanRegistro() {
      return initialState;
    },
  },
});

export const registroReducer = registroSlice.reducer;

export const { setRegistro, cleanRegistro } = registroSlice.actions;
