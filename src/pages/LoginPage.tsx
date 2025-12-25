import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from 'react-router-dom';
import type {error} from '../types/Error';
import type { AuthRequest } from "../types/User";
import toast from 'react-hot-toast';

function LoginPage(){
    const { login } = useAuth();
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState('' as string | error);
    const [credentials, setCredentials] = useState<AuthRequest>({
        email: '',
        password: '',
    });
    const navigate = useNavigate();


    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const response = await login(credentials.email, credentials.password);
            if (response.success) {
                setSuccess(true);
                setError(''); 
                navigate('/dashboard'); 
            } else {
                setSuccess(false);
                setError(response.error as string);
                toast.error('Username or password wrong, try again', {
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
        } catch (error) {
            console.error(error);
            setSuccess(false);
            setError('An error occurred during login.');
            toast.error('Username or password wrong, try again', {
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
        <div style={{ maxWidth: '500px', margin: '2em auto' }}>
            <h1 style={{ textAlign: 'center' }}>Login</h1>
            <form onSubmit={handleSubmit} className="form-container">
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                        id="email"
                        type="email"
                        placeholder="Enter your email"
                        value={credentials.email}
                        onChange={(e) => setCredentials({ ...credentials, email: e.target.value })}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input
                        id="password"
                        type="password"
                        placeholder="Enter your password"
                        value={credentials.password}
                        onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                        required
                    />
                </div>

                <p style={{ margin: '1.5em 0', textAlign: 'center', color: 'rgba(255,255,255,0.8)' }}>
                    No account? <Link to="/register" style={{ color: 'var(--accent-blue)' }}>Sign up here</Link>
                </p>

                <button type="submit" style={{ width: '100%', marginBottom: '1em' }}>Login</button>
                {success && <p style={{ color: 'var(--accent-blue)', fontWeight: 'bold', textAlign: 'center' }}>✓ Login successful!</p>}
                {error && <p style={{ color: 'var(--accent-pink)', fontWeight: 'bold', textAlign: 'center' }}>⚠️ {String(error)}</p>}
            </form>
        </div>
    );
}

export default LoginPage