import { createSlice } from '@reduxjs/toolkit';

interface MaterialState {
  materiales: {
    id: number;
    nombre: string;
    tipo: string;
    codigo: string;
  }[];
}

const initialState = {
  materiales: [],
} as MaterialState;

export const materialSlice = createSlice({
  name: 'material',
  initialState,
  reducers: {},
});

export const materialReducer = materialSlice.reducer;
