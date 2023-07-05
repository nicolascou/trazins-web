import { createAsyncThunk } from '@reduxjs/toolkit';
import { IMaterial } from '../types/models';

export const getAllMaterials = createAsyncThunk<IMaterial[], void, { rejectValue: Error }>(
  'material/getAllMaterials',
  async (_, { rejectWithValue }) => {
    try {
      console.log(process.env.REACT_APP_API_URL);
      const res = await fetch(process.env.REACT_APP_API_URL + '/material?tipo=all');
      return await res.json();
    } catch (error) {
      return rejectWithValue(error as Error);
    }
  }
);
