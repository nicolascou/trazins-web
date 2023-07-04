import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { IMaterial } from '../types/models';
import { getAllMaterials } from './materialThunks';

interface MaterialState {
  data: {
    allMaterials: IMaterial[];
    selectedMaterials: IMaterial[];
  };
  error: any;
  status: string;
}

const initialState = {
  data: {
    allMaterials: [],
    selectedMaterials: [],
  },
  error: null,
  status: 'idle',
} as MaterialState;

export const materialSlice = createSlice({
  name: 'material',
  initialState,
  reducers: {
    selectMaterial(state, action: PayloadAction<IMaterial>) {
      state.data.selectedMaterials.push(action.payload);
    },
    deleteMaterial(state, action: PayloadAction<string>) {
      state.data.selectedMaterials = state.data.selectedMaterials.filter((material) => material.codigo !== action.payload);
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
        state.data.allMaterials = action.payload;
        state.status = 'fulfilled';
      });
  },
});

export const materialReducer = materialSlice.reducer;

export const { selectMaterial, deleteMaterial } = materialSlice.actions;
