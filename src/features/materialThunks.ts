import { createAsyncThunk } from '@reduxjs/toolkit';
import { IMaterial } from '../types/models';

export const getAllMaterials = createAsyncThunk<IMaterial[], void, { rejectValue: Error }>(
  'material/getAllMaterials',
  async (_, { rejectWithValue }) => {
    try {
      const res = await fetch('http://localhost:5001/material?tipo=all');
      return await res.json();
    } catch (error) {
      return rejectWithValue(error as Error);
    }
  }
);
