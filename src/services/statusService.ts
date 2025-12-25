import type { status } from "../types/Status";

const baseURL = 'http://localhost:4000';

export async function getStatus(): Promise<status[]> {
    const response = await fetch(`${baseURL}/statuses`,
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
export async function createStatus(status: status): Promise<status> {
    const response = await fetch(`${baseURL}/statuses`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(status)
    })
    const data = await response.json()
    return data 
}