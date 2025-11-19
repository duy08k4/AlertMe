import api from "../configs/gateway";

export interface LoginResponse {
    access_token: string;
    refresh_token: string;
    user: {
        id: string;
        email: string;
        role: string;
        // Add other user properties if needed
    };
}

export const authService = {
    login: async (email: string, password: string) => {
        try {
            const response = await api.post<LoginResponse>("/auth/signin", {
                email,
                password,
            });
            return response.data;
        } catch (error) {
            throw error;
        }
    },
};
