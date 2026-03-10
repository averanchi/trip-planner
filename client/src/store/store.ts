import { makeAutoObservable } from "mobx";
import type { IUser } from "../models/response/IUser";
import AuthService from "../services/AuthService";
import axios from "axios";
import type { AuthResponse } from "../models/response/AuthResponse";
import { BASE_URL } from "../http";

export default class Store {
    user = {} as IUser;
    isAuth = false;
    isLoading = false;

    constructor() {
        makeAutoObservable(this);
    }

    setAuth(bool: boolean) {
        this.isAuth = bool;
    }

    setUser(user: IUser) {
        this.user = user;
    }

    setLoading(bool: boolean) {
        this.isLoading = bool;
    }

    async login(email: string, password: string) {
        try {
            const response = await AuthService.login(email, password);
            console.log(response);
            localStorage.setItem('token', response.data.accessToken);
            this.setAuth(true);
            this.setUser(response.data.user);
        } catch (e) {
            if (axios.isAxiosError(e)) {
                console.log(e.response?.data?.message);
            } else {
                console.log("Unexpected error", e);
            }
        }
    }


    async registration(email: string, password: string) {
        try {
            const response = await AuthService.registration(email, password);
            console.log(response);
            localStorage.setItem('token', response.data.accessToken);
            this.setAuth(true);
            this.setUser(response.data.user);
        } catch (e) {
            if (axios.isAxiosError(e)) {
                console.log(e.response?.data?.message);
            } else {
                console.log("Unexpected error", e);
            }
        }
    }

    async logout() {
        try {
            await AuthService.logout();
            localStorage.removeItem('token');
            this.setAuth(false);
            this.setUser({} as IUser);
        } catch (e) {
            if (axios.isAxiosError(e)) {
                console.log(e.response?.data?.message);
            } else {
                console.log("Unexpected error", e);
            }
        }
    }

    async checkAuth() {
        this.setLoading(true);
        try {
            const response = await axios.get<AuthResponse>(`${BASE_URL}/refresh`, { withCredentials: true });
            console.log(response);
            localStorage.setItem('token', response.data.accessToken);
            this.setAuth(true);
            this.setUser(response.data.user);
        } catch (e) {
            if (axios.isAxiosError(e)) {
                console.log(e.response?.data?.message);
            } else {
                console.log("Unexpected error", e);
            }
        } finally {
            this.setLoading(false);
        }

    }

    async fetchUsers() {
        try {
            const response = await AuthService.getUsers();
            console.log(response.data);
            return response;
        } catch (e) {
            if (axios.isAxiosError(e)) {
                console.log(e.response?.data?.message);
            } else {
                console.log("Unexpected error", e);
            }
        }
    }

}