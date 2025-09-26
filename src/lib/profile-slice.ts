import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { apiClient } from './api-client'
import { User, ProfileResponse } from '@/types'

interface ProfileState {
  user: User | null
  loading: boolean
  error: string | null
}

const initialState: ProfileState = {
  user: null,
  loading: false,
  error: null,
}

export const loadUserProfile = createAsyncThunk(
  'profile/loadUserProfile',
  async (_, { rejectWithValue }) => {
    try {
      const response = await apiClient.get<ProfileResponse>('/api/user')
      return response.data.profile
    } catch (error) {
      return rejectWithValue(`failed to load user profile: ${error}`)
    }
  }
)

export const updateUserProfile = createAsyncThunk(
  'profile/updateUserProfile',
  async (updateData: Partial<User>, { rejectWithValue }) => {
    try {
      const response = await apiClient.patch("/api/user", updateData)
      return response.data.profile
    } catch (error) {
      return rejectWithValue(`failed to update user profile: ${error}`)
    }
  }
)

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loadUserProfile.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(loadUserProfile.fulfilled, (state, action) => {
        state.loading = false
        state.user = action.payload
        state.error = null
      })
      .addCase(loadUserProfile.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })
      .addCase(updateUserProfile.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(updateUserProfile.fulfilled, (state, action) => {
        state.loading = false
        state.user = action.payload
        state.error = null
      })
      .addCase(updateUserProfile.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })
  },
})

export default profileSlice.reducer
