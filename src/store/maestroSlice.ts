import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { MaestroState } from '@/types/maestro';
import { APP_CONFIG } from '@/config/app.config';

const initialState: MaestroState = {
    profile: null,
    loading: false,
    error: null,
};

export const fetchMaestroProfile = createAsyncThunk(
    'maestro/fetchProfile',
    async (id: string) => {
        const response = await axios.get(`${APP_CONFIG.BASE_URL}/db/Maestros/?maestro_id=${id}`);
        return response.data;
    }
);

const maestroSlice = createSlice({
    name: 'maestro',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchMaestroProfile.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchMaestroProfile.fulfilled, (state, action) => {
                state.loading = false;
                state.profile = action.payload;
            })
            .addCase(fetchMaestroProfile.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to fetch profile';
            });
    },
});

export default maestroSlice.reducer;
