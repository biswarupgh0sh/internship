import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL =import.meta.env.MODE === "development" ? "http://localhost:5000/api/auth" : "/api/auth";

// Thunks for async operations
// Signup
export const signup = createAsyncThunk('/signup', async (userData, { rejectWithValue }) => {
    try {
        const response = await axios.post(`${API_URL}/signup`, userData);
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response.data.message || 'Signup failed');
    }
});

// Signin
export const signin = createAsyncThunk('/signin', async (credentials, { rejectWithValue }) => {
    try {
        const response = await axios.post(`${API_URL}/signin`, credentials);
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response.data.message || 'Signin failed');
    }
});

// Logout
export const logout = createAsyncThunk('/logout', async (_, { rejectWithValue }) => {
    try {
        await axios.post(`${API_URL}/logout`);
        return null;
    } catch (error) {
        return rejectWithValue(error.response.data.message || 'Logout failed');
    }
});

// Slice
const userSlice = createSlice({
    name: 'user',
    initialState: {
        user: null,
        token: null,
        loading: false,
        error: null,
    },
    reducers: {
        clearError: (state) => {
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            // Signup cases
            .addCase(signup.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(signup.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload.user;
                state.token = action.payload.token;
                state.error = null;
            })
            .addCase(signup.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            
            // Signin cases
            .addCase(signin.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(signin.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload.user;
                state.token = action.payload.token;
                state.error = null;
            })
            .addCase(signin.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            
            // Logout cases
            .addCase(logout.pending, (state) => {
                state.loading = true;
            })
            .addCase(logout.fulfilled, (state) => {
                state.loading = false;
                state.user = null;
                state.token = null;
            })
            .addCase(logout.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export const { clearError } = userSlice.actions;
export default userSlice.reducer;