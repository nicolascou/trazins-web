import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { IMaterial } from '../types/models';

interface RegistroState {
  intervencion: string;
  numeroHistoriaClinica: string;
  gabinete: string;
  fecha: string;
  materials: IMaterial[];
}

const initialState = {
  intervencion: '',
  numeroHistoriaClinica: '',
  gabinete: '',
  fecha: new Date().toISOString().slice(0, 16),
  materials: [],
} as RegistroState;

export const registroSlice = createSlice({
  name: 'registro',
  initialState,
  reducers: {
    addMaterialToRegistro(state, action: PayloadAction<IMaterial>) {
      state.materials.push(action.payload);
    },
  },
});

export const registroReducer = registroSlice.reducer;

export const { addMaterialToRegistro } = registroSlice.actions;
