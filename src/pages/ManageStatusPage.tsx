//עמוד למנהל בלבד, ניהול סטטוסים, הוספה מחיקה, עדכון
import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from 'react-router-dom';
import type {error} from '../types/Error';
import type { status } from "../types/Status";
import { getStatus, createStatus } from "../services/statusService";
import toast from 'react-hot-toast';


export default function ManageStatusPage() {
    const [status, setStatus] = useState<status[]>([]);
    const [error, setError] = useState<error | null>(null);
    const { user } = useAuth();
    const navigate = useNavigate();
    const [newStatusName, setNewStatusName] = useState('');

    useEffect(() => {
        if (!user) {
            navigate('/login');
        }
    }, [user, navigate]);

    useEffect(() => {
        const fetchStatus = async () => {
            try {
                const response = await getStatus();
                setStatus(response);
            } catch (error) {
                setError(error as error);
            }
        };
        fetchStatus();
    }, []);

    const handleCreateStatus = async (newStatus: string) => {
        if (!newStatusName.trim()) return;
        
        try {
            await createStatus({ id: status.length + 1, name: newStatusName });
            setStatus([...status, { id: status.length + 1, name: newStatus }]);
            console.log('new status: ', newStatusName);
            setNewStatusName('');
            toast.success('Status added successfully!', {
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
        } catch (error) {
            setError(error as error);
            toast.error('Error adding status', {
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
        }
    };    
    return (

        <div>
            <h1>Manage Status</h1>
            {error && <div style={{ backgroundColor: 'rgba(255, 0, 110, 0.15)', border: '3px solid var(--accent-pink)', padding: '1em', marginBottom: '1.5em', color: 'var(--accent-pink)', fontWeight: 'bold', borderRadius: '0px' }}>⚠️ {error.message}</div>}
            <table>
                <thead>
                    <tr>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {status.map(item => (
                        <tr key={item.id}>
                            <td><span className="badge badge-status">{item.name}</span></td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="form-container" style={{ marginTop: '2em', maxWidth: '500px' }}>
                <h3>Add New Status</h3>

                <div className="form-group">
                    <label htmlFor="status">Status Name</label>
                    <input type="text" id="name" placeholder="Enter status name" value={newStatusName} onChange={(e) => setNewStatusName(e.target.value )} required />
                </div>
                <button onClick={() => handleCreateStatus(newStatusName)} style={{ width: '100%' }}>+ Create Status</button>
            </div>

        </div>
    );
}