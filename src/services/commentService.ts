import type { comment } from "../types/Comment";

const baseURL = 'http://localhost:4000';

export async function getComments(ticketId: number): Promise<comment[]> {
    const response = await fetch(`${baseURL}/tickets/${ticketId}/comments`,{
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
    })
    const data = await response.json()
    if(!response.ok) {
        throw new Error(`Error! failed to fetch comments. status: ${response.status}`);
    }
    return data 
}

export async function createComment(ticketId: number ,comment: comment): Promise<comment> {
    const response = await fetch(`${baseURL}/tickets/${ticketId}/comments`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(comment)
    })
    const data = await response.json()
    return data 
}

