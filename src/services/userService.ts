import type{ CreateUserAdmin, user } from "../types/User";

const baseURL = 'http://localhost:4000';


//admin only
export async function createUserAdmin(data: CreateUserAdmin): Promise<user> {
    const token = localStorage.getItem('token');

    const response = await fetch(`${baseURL}/users`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(data)
    })
    if(!response.ok) {
        throw new Error(`Error! status: ${response.status}`);
    }
    const res = await response.json()
    return res
}

//admin only
export async function getAllUsers(): Promise<user[]> {
    const token = localStorage.getItem('token');

    const response = await fetch(`${baseURL}/users`, {
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

//admin only
export async function getUserById(id: number): Promise<user> {
    const token = localStorage.getItem('token');    

    const response = await fetch(`${baseURL}/users/${id}`, {
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