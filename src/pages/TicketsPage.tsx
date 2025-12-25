//מציג רשימת טיקטים לפי התפקיד של המשתמש
//מנהל רואה הכל, סוכן את מה שהוקצה אליו, ומשתמש את שלו

import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import type { ticket } from "../types/Ticket";
import { getTickets } from "../services/ticketService";
import TicketCard from "../components/TicketCard";
import { ClipLoader } from "react-spinners";


function TicketsPage() {
    const navigate = useNavigate();
    const { user } = useAuth();
    const [tickets, setTickets] = useState<ticket[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');


    useEffect(() => {
        if (!user) {
            navigate('/login');
        }
    }, [user, navigate])

    const loadTickets = async () => {
        try {
            const response = await getTickets();
            let filteredTickets = response;

            if (user!.role === 'agent') {
                filteredTickets = response.filter(ticket => ticket.assigned_to === user!.id);
            } else if (user!.role === 'customer') {
                filteredTickets = response.filter(ticket => ticket.created_by === user!.id);
            }

            setTickets(filteredTickets);
        } catch (error) {
            setError(error + ' Failed to load tickets');
        }
        finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        loadTickets();
    }, []);

    return (
        <div>
            <h1>Tickets</h1>
            {loading ? <ClipLoader size={50} color="#00d9ff" /> : <h3 style={{ color: 'var(--accent-blue)' }}>✓ Ready!</h3>}
            {error !== '' && <p style={{ color: 'var(--accent-pink)', fontWeight: 'bold', fontSize: '1.1em' }}>⚠️ {error}</p>}
            {tickets.length === 0 && <p style={{ fontSize: '1.2em', color: 'rgba(255,255,255,0.7)' }}>No tickets found</p>}
            <div className="tickets-list">
                {tickets.map(ticket => <TicketCard key={ticket.id} ticket={ticket} />)}
            </div>

            {user && user.role === 'customer' && <button onClick={() => navigate('/tickets/new')} style={{ marginTop: '2em' }}>+ New Ticket</button>}
        </div>
    );
}   

export default TicketsPage;