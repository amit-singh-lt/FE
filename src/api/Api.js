import axios from "axios";
import { API_BASE_URL } from "../utils/constants";

// Create an axios instance
export const apiClient = axios.create({
    baseURL: API_BASE_URL,
    timeout: 10000, // 10 seconds timeout
    headers: {
        "Content-Type": "application/json",
    },
});

// Interceptor for handling errors globally or authentication
apiClient.interceptors.response.use(
    (config) => {
        // Add any custom headers or authentication tokens here
        // config.headers['Authorization'] = `Bearer ${token}`;
        return config;
    },
    (response) => response,
    (error) => {
        console.error("API Error:", error.response || error.message);
        return Promise.reject(error);
    }
);

// API functions
export const fetchTeams = async () => {
    const url = `${API_BASE_URL}/`;
    const response = await apiClient.get(url);
    return response.data.teams;
};

export const fetchEnvs = async (team) => {
    const url = `${API_BASE_URL}/${team}`;
    const response = await apiClient.get(url);
    return response.data.envs;
};

export const fetchSuites = async (team, env) => {
    const url = `${API_BASE_URL}/${team}/${env}`;
    const response = await apiClient.get(url);
    return response.data.suites;
};

export const fetchBuilds = async (team, env, suite) => {
    const url = `${API_BASE_URL}/${team}/${env}/${suite}`;
    const response = await apiClient.get(url);
    return response.data;
};

export const fetchBuildReport = async (team, env, suite, build, limit = 5) => {
    const url = `${API_BASE_URL}/${team}/${env}/${suite}/${build}/history?limit=${limit}`;
    const response = await apiClient.get(url);
    return response.data;
};

export const fetchBuildTests = async (team, env, suite, build) => {
    const url = `${API_BASE_URL}/${team}/${env}/${suite}/${build}/tests`;
    console.log("Fetching tests from URL:", url);
    const response = await apiClient.get(url);
    return response.data;
};