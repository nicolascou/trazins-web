import { createSlice } from '@reduxjs/toolkit';

interface RegistroState {
  intervencion: string;
  numeroHistoriaClinica: string;
  gabinete: string;
  fecha: string;
}

const initialState = {
  intervencion: '',
  numeroHistoriaClinica: '',
  gabinete: '',
  fecha: new Date().toISOString().slice(0, 16),
} as RegistroState;

export const registroSlice = createSlice({
  name: 'registro',
  initialState,
  reducers: {},
});

export const registroReducer = registroSlice.reducer;
