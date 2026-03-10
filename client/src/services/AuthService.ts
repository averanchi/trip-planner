import $api from "../http";
import type { AxiosResponse } from "axios";
import type { AuthResponse } from "../models/response/AuthResponse";
import type { IUser } from "../models/response/IUser";

export default class AuthService {
    static async login(email: string, password: string): Promise<AxiosResponse<AuthResponse>> {
        return $api.post<AuthResponse>('/login', { email, password });
    }

    static async registration(email: string, password: string): Promise<AxiosResponse<AuthResponse>> {
        return $api.post<AuthResponse>('/registration', { email, password });
    }

    static async logout(): Promise<void> {
        return $api.post('/logout');
    }

    static async getUsers(): Promise<AxiosResponse<IUser[]>> {
        return $api.get<IUser[]>('/users');
    }

}

