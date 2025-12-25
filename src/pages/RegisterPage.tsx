import { useState } from "react";
import {useNavigate, Link} from 'react-router-dom';
import type { RegisterRequest } from "../types/User";
import { register as registerServise } from "../services/authService";
import { useAuth} from "../context/AuthContext";

function RegisterPage() {
    const navigate = useNavigate();
    const { login } = useAuth();
    const [formData, setFormData] = useState<RegisterRequest>({
        name: '',
        email: '',
        password: '',
    });
    const [error, setError] = useState('' as string);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async(e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const response = await registerServise(formData);
            
            if (response.id) {
                const loginResult = await login(formData.email, formData.password);

                if(loginResult.success) {
                    navigate('/dashboard');            
                }
                else{
                    setError(loginResult.error as string + 'registration succeeded, but login failed');
                }
            }
        } catch (error: any) {
    if (error.message.includes('409') || error.message.includes('Conflict')) {
      alert('האימייל כבר קיים במערכת. נסה להתחבר או השתמש באימייל אחר.');
    } else {
      alert('הרשמה נכשלה. נסה שוב.');
    }
    console.error('Registration error:', error);
  } finally {
            setLoading(false);  
        }
    };

    return (
        <div style={{ maxWidth: '500px', margin: '2em auto' }}>
        <h1 style={{ textAlign: 'center' }}>Register</h1>

        {error && <div style={{ backgroundColor: 'rgba(255, 0, 110, 0.15)', border: '3px solid var(--accent-pink)', padding: '1em', marginBottom: '1.5em', color: 'var(--accent-pink)', fontWeight: 'bold' }}>⚠️ {error}</div>}

        <form onSubmit={handleSubmit} className="form-container">
            <div className="form-group">
                <label htmlFor="name">Name</label>
                <input type="text" id="name" placeholder="Enter your full name" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} required />
            </div>
            <div className="form-group">
                <label htmlFor="email">Email</label>
                <input type="email" id="email" placeholder="Enter your email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} required />
            </div>
            <div className="form-group">
                <label htmlFor="password">Password</label>
                <input type="password" id="password" placeholder="Create a strong password" value={formData.password} onChange={(e) => setFormData({ ...formData, password: e.target.value })} required />
            </div>
        <button type="submit" disabled={loading} style={{ width: '100%', marginBottom: '1em' }}>{loading? '⏳ Creating...' : '✓ Register'}</button> 
           </form>

        <p style={{ textAlign: 'center', color: 'rgba(255,255,255,0.8)', marginTop: '1.5em' }}>
            Already have an account? <Link to="/login" style={{ color: 'var(--accent-blue)' }}>Log in here</Link>
        </p>
        </div>

    );
}

export default RegisterPage;