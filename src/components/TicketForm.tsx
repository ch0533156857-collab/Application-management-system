//טופס ליצירת טיקט חדש מאפשר למשתמש למלא כותרת, תאור ודחיfות

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import type { ticketCreate } from "../types/Ticket";

interface TicketFormProps {
    onSubmit: (data: ticketCreate) => Promise<void>;

}

export function TicketForm({ onSubmit }: TicketFormProps) {
    const [ticket, setTicket] = useState<ticketCreate>({
        subject: '',
        description: '',
        status_id: 1,
        priority_id: 1,
        assigned_to: 1,
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const navigate = useNavigate();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setTicket((prevTicket) => ({ ...prevTicket, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try{
            await onSubmit(ticket);

            setTicket({
                subject: '',
                description: '',
                status_id: 1,
                priority_id: 1,
                assigned_to: 1,
            })

            navigate('/tickets');

        }
        catch (error) {
            if (error instanceof Error) {
                setError(error.message);
            }
            else
                setError('An error occurred');
        }
        finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="form-container">
            <div className="form-group">
                <label htmlFor="subject">Subject</label>
                <input 
                    type="text" 
                    id="subject"
                    name="subject" 
                    placeholder="Describe your issue briefly"
                    value={ticket.subject} 
                    onChange={handleChange} 
                    required
                />
            </div>
            <div className="form-group">
                <label htmlFor="description">Description</label>
                <textarea 
                    id="description"
                    name="description" 
                    placeholder="Provide detailed information about your issue"
                    value={ticket.description} 
                    onChange={handleChange as any}
                    required
                />
            </div>
            <button type="submit" disabled={loading} style={{ width: '100%' }}>
                {loading ? '⏳ Submitting...' : '✓ Submit Ticket'}
            </button>

            {error && <p style={{ color: 'var(--accent-pink)', fontWeight: 'bold', marginTop: '1em' }}>⚠️ {error}</p>}
        </form>
    );
}