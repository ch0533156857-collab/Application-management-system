//עמוד למנהל בלבד, ניהול עדיפויות
import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from 'react-router-dom';
import type {error} from '../types/Error';
import type { priority } from "../types/Priority";
import { getPriorities, createPriority } from "../services/prioritiesService";
import toast from 'react-hot-toast';


export default function ManageStatusPage() {
    const [priority, setPriority] = useState<priority[]>([]);
    const [error, setError] = useState<error | null>(null);
    const { user } = useAuth();
    const navigate = useNavigate();
    const [newPriority, setNewPriority] = useState('');

    useEffect(() => {
        if (!user) {
            navigate('/login');
        }
    }, [user, navigate]);

    useEffect(() => {
        const fetchPriority = async () => {
            try {
                const response = await getPriorities();
                setPriority(response);
            } catch (error) {
                setError(error as error);
            }
        };
        fetchPriority();
    }, []);

    const handleCreatePriority = async (newPriority: string) => {
        if (!newPriority.trim()) return;
        
        try {
            await createPriority({ id: priority.length + 1, name: newPriority });
            setPriority([...priority, { id: priority.length + 1, name: newPriority }]);
            console.log('new priority: ', newPriority);
            setNewPriority('');
            toast.success('Priority added successfully!', {
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
            toast.error('Error adding priority', {
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
            <h1>Manage Priorities</h1>
            {error && <div style={{ backgroundColor: 'rgba(255, 0, 110, 0.15)', border: '3px solid var(--accent-pink)', padding: '1em', marginBottom: '1.5em', color: 'var(--accent-pink)', fontWeight: 'bold', borderRadius: '0px' }}>⚠️ {error.message}</div>}
            <table>
                <thead>
                    <tr>
                        <th>Priority Level</th>
                    </tr>
                </thead>
                <tbody>
                    {priority.map(item => (
                        <tr key={item.id}>
                            <td><span className="badge badge-priority">{item.name}</span></td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="form-container" style={{ marginTop: '2em', maxWidth: '500px' }}>
                <h3>Add New Priority</h3>

                <div className="form-group">
                    <label htmlFor="status">Priority Name</label>
                    <input type="text" id="name" placeholder="Enter priority name" value={newPriority} onChange={(e) => setNewPriority(e.target.value )} required />
                </div>
                <button onClick={() => handleCreatePriority(newPriority)} style={{ width: '100%' }}>+ Create Priority</button>
            </div>

        </div>
    );
}