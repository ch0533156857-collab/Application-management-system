import type { AuthRequest, AuthResponse, RegisterRequest } from "../types/User";

const baseURL = 'http://localhost:4000';

export async function login(credentials: AuthRequest): Promise<AuthResponse> {
    const response = await fetch(`${baseURL}/auth/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(credentials)
    })

    if(!response.ok) {
        if(response.status === 401) {

            localStorage.removeItem('token');
            localStorage.removeItem('user');
            window.location.href = '/login';
            throw new Error('Unauthorized - please login');
        }
        throw new Error(`Error! status: ${response.status}`);
    }

    try{
        const data = await response.json()
        return data
    } catch (error) {            
        throw new Error('invalid JSON response from server');
    }
}

export async function register(data: RegisterRequest): Promise<AuthResponse> {
    const response = await fetch(`${baseURL}/auth/register`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
  if (!response.ok) {
    const error = await response.json();
    if (response.status === 409) {
      throw new Error('המשתמש כבר קיים במערכת');
    }
    throw new Error(error.message || 'הרשמה נכשלה');
  }
    const res = await response.json()
    return res
}

//get current user
export async function getCurrentUser(): Promise<AuthResponse> {
    const token = localStorage.getItem('token');

    const response = await fetch(`${baseURL}/auth/me`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
    if(!response.ok) {
        throw new Error(`Error! status: ${response.status}`);
    }
    const res = await response.json()
    return res
}

