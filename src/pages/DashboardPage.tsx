//מציג מידע שונה אחרי התחברות לפי התפקיד של המשתמש

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { getTickets } from "../services/ticketService";
import { StatCard } from "../components/StatCard";


const DashboardPage = () => {
    const[states, setStates] = useState({
        totalTickets: 0,
        myTickets: 0 //agent or my tickets
    });
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const { user } = useAuth();

    useEffect(() => {
        if (!user) {
            navigate('/login');
        }
    }, [user, navigate])

    const loadStates = async () => {
        try {
            const response = await getTickets();

            console.log('response from server: ', response);

            const ticketsArr = Array.isArray(response) ? response : [];

            setStates({
                totalTickets: ticketsArr.length,
                myTickets: ticketsArr.filter(ticket => {
                    if(!user) return false;
                    if(user.role === 'agent') 
                        return ticket.assigned_to === user.id;
                    if(user.role === 'customer')
                        return ticket.created_by === user.id;
                    return true;
            }).length
        });
        } catch (error) {
            console.error("Failed to load states" ,error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        loadStates();
    }, [])

    return (
        <div>
            <h1>Dashboard</h1>
            <div style={{ marginBottom: '2em', padding: '1.5em', border: '3px dashed var(--accent-blue)', backgroundColor: 'rgba(0, 217, 255, 0.05)' }}>
                <p><strong>Name:</strong> {user?.name}</p>
                <p><strong>Email:</strong> {user?.email}</p>
                <p><strong>Role:</strong> <span className={`badge badge-${user?.role}`}>{user?.role?.toUpperCase()}</span></p>
            </div>
            <h2>
                {user?.role === 'agent' ? 'Agent Dashboard' : user?.role === 'admin' ? 'Admin Dashboard' : 'Customer Dashboard'}
            </h2>
            {loading ? (
            <p>Loading data...</p>
            ) : (
                <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
                    {user?.role === 'admin'  && (
                        <StatCard title="Total Tickets" value={states.totalTickets} icon={<span style={{ fontSize: '2em' }}>🎟️</span>} /> 
                    )}
                    {user?.role !== 'admin' && (
                        <StatCard title="My Tickets" value={states.myTickets} icon={<span style={{ fontSize: '2em' }}>📋</span>} />
                    )}
                </div>
            )}
        </div>
    )
}

export default DashboardPage