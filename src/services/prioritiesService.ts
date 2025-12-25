import type { priority } from "../types/Priority";

const baseURL = 'http://localhost:4000';

export async function getPriorities(): Promise<priority[]> {
    const response = await fetch(`${baseURL}/priorities`,
        {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
        }
    )
    const data = await response.json()
    return data 
}

//admin only
export async function createPriority(priority: priority): Promise<string> {
    const response = await fetch(`${baseURL}/priorities`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(priority)
    })
    const data = await response.json()
    return data 
}