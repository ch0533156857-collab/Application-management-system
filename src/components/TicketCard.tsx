//כרטיס יחיד ברשימת הטיקטים, ניתן ללחוץ עליו כדי לראות פרטים מלאים

import type { ticket } from "../types/Ticket";
import { useNavigate } from "react-router-dom";

interface ticketCardProps {
    ticket: ticket
}

export function TicketCard({ ticket }: ticketCardProps) {
    const navigate = useNavigate();

    // צבעים ורוד וחום-בורדו כמו שאר האתר
    const colors = [
        { bg: 'linear-gradient(135deg, #3d1a2f 0%, #5a2847 100%)', border: '#ff006e', text: '#ffffff', fontStyle: 'italic' }, // ורוד חזק
        { bg: 'linear-gradient(135deg, #4a1a2f 0%, #6a2847 100%)', border: '#ff1493', text: '#ffffff', fontStyle: 'italic' }, // ורוד בוהק
        { bg: 'linear-gradient(135deg, #3f1a28 0%, #5f284f 100%)', border: '#d946ef', text: '#ffffff', fontStyle: 'italic' }, // מגנטה ורוד
        { bg: 'linear-gradient(135deg, #2f1a25 0%, #4f283a 100%)', border: '#c2185b', text: '#ffffff', fontStyle: 'italic' }, // בורדו עמוק
        { bg: 'linear-gradient(135deg, #5a2a3f 0%, #7a3a5f 100%)', border: '#f50057', text: '#ffffff', fontStyle: 'italic' }, // ורוד-חום
        { bg: 'linear-gradient(135deg, #4f1f2f 0%, #6f2f4f 100%)', border: '#e91e63', text: '#ffffff', fontStyle: 'italic' }, // ורוד עז
        { bg: 'linear-gradient(135deg, #3a1a2a 0%, #5a2a4a 100%)', border: '#ff4081', text: '#ffffff', fontStyle: 'italic' }, // ורוד בהיר
        { bg: 'linear-gradient(135deg, #451f35 0%, #652f55 100%)', border: '#9b2e7f', text: '#ffffff', fontStyle: 'italic' }, // בורדו קלסי
    ];

    // בחר צבע על סמך ID של הטיקט
    const colorIndex = ticket.id % colors.length;
    const selectedColor = colors[colorIndex];

    const handleClick = () => {
        navigate(`/tickets/${ticket.id}`);
    }
    
    return (
        <div 
            className="ticket-card"
            style={{
                background: selectedColor.bg,
                border: `6px solid ${selectedColor.border}`,
                borderRadius: '25px',
                boxShadow: '0 8px 25px rgba(0,0,0,0.4), inset 0 0 20px rgba(0,0,0,0.1)',
                padding: '25px',
                margin: '1.5em 0',
                transform: 'rotate(-0.5deg)',
                transition: 'all 0.3s ease',
                cursor: 'pointer'
            }}
            onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'rotate(0deg) scale(1.05)';
                e.currentTarget.style.boxShadow = `0 12px 35px rgba(0,0,0,0.5), inset 0 0 20px rgba(0,0,0,0.15)`;
            }}
            onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'rotate(-0.5deg)';
                e.currentTarget.style.boxShadow = '0 8px 25px rgba(0,0,0,0.4), inset 0 0 20px rgba(0,0,0,0.1)';
            }}
        >
            <div style={{ position: 'relative' }}>
                <span style={{ position: 'absolute', top: '-10px', left: '-10px', fontSize: '2em', opacity: 0.7 }}>✦</span>
                <h2 style={{ 
                    color: selectedColor.text, 
                    margin: '0 0 0.5em 0', 
                    textShadow: `3px 3px 0px ${selectedColor.border}, 6px 6px 12px rgba(0,0,0,0.5)`,
                    fontFamily: "'Fredoka', 'Bebas Neue', sans-serif", 
                    fontWeight: 900,
                    letterSpacing: '2px', 
                    textTransform: 'uppercase',
                    fontSize: '1.4em'
                }}>
                    <span style={{ opacity: 0.5 }}>✦</span> {ticket.subject.toUpperCase()}
                </h2>
                <span style={{ position: 'absolute', bottom: '-15px', right: '-15px', fontSize: '1.5em', opacity: 0.6 }}>★</span>
            </div>
            <p style={{ 
                color: selectedColor.text, 
                opacity: 0.95, 
                margin: '1.5em 0 0.5em 0', 
                textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
                fontFamily: "'Righteous', sans-serif", 
                fontWeight: 700,
                fontSize: '0.95em',
                lineHeight: '1.6'
            }}>
                💬 {ticket.description}
            </p>
            <button 
                onClick={handleClick} 
                style={{ 
                    background: `linear-gradient(135deg, ${selectedColor.border}20, ${selectedColor.border}40)`, 
                    border: `3px solid ${selectedColor.border}`, 
                    color: selectedColor.text, 
                    padding: '0.8em 1.8em', 
                    fontSize: '0.95em', 
                    fontWeight: 900, 
                    cursor: 'pointer', 
                    borderRadius: '20px', 
                    textTransform: 'uppercase', 
                    letterSpacing: '1.5px',
                    marginTop: '1.5em', 
                    transition: 'all 0.3s ease',
                    fontFamily: "'Bebas Neue', sans-serif",
                    position: 'relative',
                    overflow: 'hidden'
                }}
                onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'scale(1.1)';
                    e.currentTarget.style.boxShadow = `0 0 20px ${selectedColor.border}`;
                }}
                onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'scale(1)';
                    e.currentTarget.style.boxShadow = 'none';
                }}
            >
                🚀 DETAILS
            </button>
        </div>
    )
}

export default TicketCard