import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface RegistroState {
  intervencion: string;
  gabinete: string;
  numeroHistoriaClinica: string;
  fecha: string;
}

const initialState = {
  intervencion: '',
  gabinete: '',
  numeroHistoriaClinica: '',
  fecha: new Date().toISOString().slice(0, 16),
} as RegistroState;

export const registroSlice = createSlice({
  name: 'registro',
  initialState,
  reducers: {
    setRegistro(state, action: PayloadAction<RegistroState>) {
      return action.payload;
    },
    cleanRegistro(state) {
      return initialState;
    },
  },
});

export const registroReducer = registroSlice.reducer;

export const { setRegistro, cleanRegistro } = registroSlice.actions;
