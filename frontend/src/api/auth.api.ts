import api from "./axios";

export interface LoginDto{
    email: string,
    password: string
}

export async function login(loginDto: LoginDto) {
    const response = await api.post("auth/login", loginDto);
    return response.data;
}