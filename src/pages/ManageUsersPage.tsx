import { useState, useEffect } from "react";
import type {user, CreateUserAdmin} from '../types/User';
import { getAllUsers, createUserAdmin as createUser } from "../services/userService";
import { userRole } from "../types/User";
import toast from 'react-hot-toast';

function ManageUsersPage() {
    const [users, setUsers] = useState<user[]>([]);
    const [showForm, setShowForm] = useState(false);
    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState<CreateUserAdmin>({
        name:'',
        email:'',
        password:'',
        role: userRole.customer,
    });


    useEffect(() => {
        loadUsers();
    }, []);

    const loadUsers = async () => {
        try {
            const data = await getAllUsers();
            setUsers(data);
        } catch (error) {
            console.error(error);
        }
    };

    const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        try {
            await createUser(formData);
            
            setFormData({
                name: '',
                email: '',
                password: '',
                role: userRole.customer,
            });
            setShowForm(false);
            loadUsers();

            toast.success('User added successfully!', {
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
            console.error(error);
            toast.error('Error adding user', {
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
        } finally {
            setLoading(false);
        }
    };

    return (
        <div >
            <h1>Manage Users</h1>

            <button 
            onClick={() => setShowForm(!showForm)} style={{ marginBottom: '1.5em' }}>
                {showForm ? '✕ Cancel' : '+ Add User'}
            </button>

            {showForm && (
                <form onSubmit={handleFormSubmit} className="form-container">
                    
                    <h3>Create New User</h3>

                    <div className="form-group">
                        <label>Name</label>
                        <input
                            type="text"
                            placeholder="Full name"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>Email</label>
                        <input
                            type="email"
                            placeholder="user@example.com"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>Password</label>
                        <input
                            type="password"
                            placeholder="Secure password"
                            value={formData.password}
                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>Role</label>
                        <select
                            value={formData.role}
                            onChange={(e) => setFormData({ ...formData, role: e.target.value as userRole })}
                            style={{ width: '100%' }}
                        >
                            <option value="customer">👤 Customer</option>
                            <option value="admin">👑 Admin</option>
                            <option value="agent">🔧 Agent</option>
                        </select>
                    </div>

                    <button type="submit" disabled={loading} style={{ width: '100%' }}>
                        {loading ? '⏳ Creating...' : '✓ Create User'}
                    </button>

                </form>
            )}

            <h2 style={{ marginTop: '2em', borderBottom: '3px dashed var(--accent-blue)', paddingBottom: '0.5em' }}>Users Directory</h2>
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Role</th>
                    </tr>
                </thead>

                <tbody>
                    {users.map((user) => (
                        <tr key={user.id}>
                            <td><strong>{user.name}</strong></td>
                            <td>{user.email}</td>
                            <td><span className={`badge badge-${user.role}`}>{user.role.toUpperCase()}</span></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default ManageUsersPage