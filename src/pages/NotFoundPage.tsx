import { useNavigate } from "react-router-dom";

export function NotFoundPage() {
    const navigate = useNavigate();
    return (
        <div style={{ textAlign: 'center', minHeight: '80vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
            <h1 style={{ fontSize: '5em', marginBottom: '0.3em' }}>404</h1>
            <h2 style={{ marginBottom: '1.5em', color: 'var(--accent-blue)' }}>Page Not Found</h2>
            <p style={{ fontSize: '1.2em', color: 'rgba(255,255,255,0.8)', marginBottom: '2em' }}>The page you're looking for doesn't exist or has been moved.</p>
            <button onClick={() => navigate("/")} style={{ minWidth: '200px', padding: '1em 2em', fontSize: '1.1em' }}>← Back to Home</button>
        </div>
    );
}

export default NotFoundPage