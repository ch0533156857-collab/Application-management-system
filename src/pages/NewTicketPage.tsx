//עמוד ליצירת טיקט חדש

import type {  ticketCreate } from "../types/Ticket";
import { createTicket } from "../services/ticketService";
import { TicketForm } from "../components/TicketForm";
import { useNavigate } from "react-router-dom";
import toast from 'react-hot-toast';


export function NewTicketPage() {
    const navigate = useNavigate(); 

    const handleSubmit = async (ticket: ticketCreate) => {
        try{
            const newTicket = await createTicket(ticket);
            toast.success('Ticket created successfully!', {
                style: {
                    background: 'linear-gradient(135deg, #00d9ff 0%, #00ff88 100%)',
                    color: '#000',
                    border: '3px solid #00d9ff',
                    boxShadow: '0 0 30px rgba(0, 217, 255, 0.8), 0 0 60px rgba(0, 255, 136, 0.4)',
                    borderRadius: '0px',
                    fontWeight: 'bold',
                    fontSize: '1em',
                    animation: 'bounce 0.5s ease-in-out'
                },
                iconTheme: {
                    primary: '#000',
                    secondary: '#00ff88'
                }
            });
            navigate(`/tickets/${newTicket.id}`);
        }catch(error){
            console.error(error);
            toast.error('Error creating ticket', {
                style: {
                    background: 'linear-gradient(135deg, #ff006e 0%, #ff1744 100%)',
                    color: '#fff',
                    border: '3px solid #ff006e',
                    boxShadow: '0 0 30px rgba(255, 0, 110, 0.8), 0 0 60px rgba(255, 23, 68, 0.4)',
                    borderRadius: '0px',
                    fontWeight: 'bold',
                    fontSize: '1em',
                    animation: 'shake 0.5s ease-in-out'
                },
                iconTheme: {
                    primary: '#fff',
                    secondary: '#ff006e'
                }
            });
            throw error;
        }
    };


    return <div>
        <h1>Create New Ticket</h1>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <TicketForm onSubmit={handleSubmit} />
        </div>
    </div>
}

export default NewTicketPage;

