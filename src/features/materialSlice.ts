import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { IMaterial } from '../types/models';
import { getAllMaterials } from './materialThunks';

interface MaterialState {
  allMaterials: IMaterial[];
  selectedMaterials: IMaterial[];
  error: any;
  status: string;
}

const initialState = {
  allMaterials: [],
  selectedMaterials: [],
  error: null,
  status: 'idle',
} as MaterialState;

export const materialSlice = createSlice({
  name: 'material',
  initialState,
  reducers: {
    selectMaterial(state, action: PayloadAction<IMaterial>) {
      state.selectedMaterials.push(action.payload);
    },
    deleteMaterial(state, action: PayloadAction<string>) {
      state.selectedMaterials = state.selectedMaterials.filter((material) => material.codigo !== action.payload);
    },
  },
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
        state.allMaterials = action.payload;
        state.status = 'fulfilled';
      });
  },
});

export const materialReducer = materialSlice.reducer;

export const { selectMaterial, deleteMaterial } = materialSlice.actions;
