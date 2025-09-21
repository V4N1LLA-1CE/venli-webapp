"use client"

import axios from 'axios'
import { TokenManager } from './token-manager'

const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_CORE_BASE_URL,
  withCredentials: true,
})

// add access token to requests
apiClient.interceptors.request.use((config) => {
  const token = TokenManager.getAccessToken()
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// handle token refresh on 401 responses
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true

      try {
        const refreshResponse = await axios.post(
          `${process.env.NEXT_PUBLIC_BACKEND_CORE_BASE_URL}/api/auth/refresh`,
          {},
          { withCredentials: true }
        )

        const { access_token } = refreshResponse.data
        TokenManager.setAccessToken(access_token)

        // retry original request with new token
        originalRequest.headers.Authorization = `Bearer ${access_token}`
        return apiClient(originalRequest)
      } catch (refreshError) {
        // refresh failed - redirect to login
        TokenManager.removeAccessToken()
        window.location.href = '/login'
        return Promise.reject(refreshError)
      }
    }

    return Promise.reject(error)
  }
)

export { apiClient }

