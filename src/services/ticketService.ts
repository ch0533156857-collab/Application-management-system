import type { ticket, ticketCreate, ticketUpdate } from "../types/Ticket";


const baseURL = 'http://localhost:4000';

export async function getTickets(): Promise<ticket[]> {
    const token = localStorage.getItem('token');

    const response = await fetch(`${baseURL}/tickets`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
    }) ; 
    if(!response.ok) {
        if(response.status === 401) {
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            window.location.href = '/login';
            throw new Error('Unauthorized - please login');
        }
        throw new Error(`Error! failed to fetch tickets. status: ${response.status}`);
    }
    const data = await response.json()
    return data
}

export async function getTicketByID(id: number): Promise<ticket> {
    const response = await fetch(baseURL + `/tickets/${id}`,{
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
    })

    if(!response.ok) {
        if(response.status === 401)
        {
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            window.location.href = '/login';
            throw new Error('Unauthorized - please login');
        }
        throw new Error(`Error! failed to fetch ticket. status: ${response.status}`);
    }

    const data = await response.json()
    return data 
}


//customer only
export async function createTicket(ticket: ticketCreate): Promise<ticket> {
    const response = await fetch(`${baseURL}/tickets`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(ticket)
    })
    if(!response.ok) {
        if(response.status === 401)
        {
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            window.location.href = '/login';
            throw new Error('Unauthorized - please login');
        }
        if(response.status === 403) {
            throw new Error('Forbidden - you do not have permission to create a ticket');
        }   
        throw new Error(`Error! failed to create ticket. status: ${response.status}`);
    }
    const data = await response.json()
    return data 
}

//agent and admin only
export async function updateTicket(id: number, ticket: ticketUpdate): Promise<ticket> {
    const response = await fetch(`${baseURL}/tickets/${id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(ticket)
    })
        if(!response.ok) {
        if(response.status === 401) {
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            window.location.href = '/login';
            throw new Error('Unauthorized - please login');
        }
        if(response.status === 403) {
            throw new Error('Forbidden - you do not have permission to update this ticket');
        }
        throw new Error(`Error! failed to update ticket. status: ${response.status}`);
    }
    const data = await response.json()
    return data
}

//admin only
export async function deleteTicket(id: number): Promise<ticket> {
    const response = await fetch(`${baseURL}/tickets/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
    })
        if(!response.ok) {
        if(response.status === 401) {
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            window.location.href = '/login';
            throw new Error('Unauthorized - please login');
        }
        if(response.status === 403) {
            throw new Error('Forbidden - only admins can delete tickets');
        }
        throw new Error(`Error! failed to delete ticket. status: ${response.status}`);
    }
    const data = await response.json()
    return data
}