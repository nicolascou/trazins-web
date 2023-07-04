import { createSlice } from '@reduxjs/toolkit';
import { IMaterial } from '../types/models';
import { getAllMaterials } from './materialThunks';

interface MaterialState {
  materials: IMaterial[];
  error: any;
  status: string;
}

const initialState = {
  materials: [],
  error: null,
  status: 'idle',
} as MaterialState;

export const materialSlice = createSlice({
  name: 'material',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllMaterials.rejected, (state, action) => {
        state.error = action.payload;
        state.status = 'rejected';
      })
      .addCase(getAllMaterials.pending, (state) => {
        state.status = 'pending';
      })
      .addCase(getAllMaterials.fulfilled, (state, action) => {
        state.materials = action.payload;
        state.status = 'fulfilled';
      });
  },
});

export const materialReducer = materialSlice.reducer;
