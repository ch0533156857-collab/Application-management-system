//כרטיס יחיד ברשימת הטיקטים, ניתן ללחוץ עליו כדי לראות פרטים מלאים

import type { ticket } from "../types/Ticket";

interface ticketCardProps {
    ticket: ticket
}

export function TicketDetailsCard({ ticket }: ticketCardProps) {
    
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
    
    return (
        <div 
            className="ticket-details"
            style={{
                background: selectedColor.bg,
                border: `6px solid ${selectedColor.border}`,
                borderRadius: '25px',
                boxShadow: '0 8px 25px rgba(0,0,0,0.4), inset 0 0 20px rgba(0,0,0,0.1)',
                padding: '25px',
                margin: '1.5em 0',
                transform: 'rotate(-0.5deg)',
                transition: 'all 0.3s ease'
            }}
        >
            <div style={{ position: 'relative', marginBottom: '2em' }}>
                <span style={{ position: 'absolute', top: '-15px', left: '-15px', fontSize: '2.5em', opacity: 0.7 }}>✦</span>
                <h2 style={{ 
                    color: selectedColor.text, 
                    margin: '0 0 0.5em 0', 
                    textShadow: `4px 4px 0px ${selectedColor.border}, 8px 8px 16px rgba(0,0,0,0.5)`,
                    fontFamily: "'Fredoka', 'Bebas Neue', sans-serif", 
                    fontWeight: 900,
                    letterSpacing: '2px', 
                    textTransform: 'uppercase',
                    fontSize: '1.8em'
                }}>
                    <span style={{ opacity: 0.5 }}>✦</span> {ticket.subject.toUpperCase()}
                </h2>
                <span style={{ position: 'absolute', bottom: '-20px', right: '-20px', fontSize: '2em', opacity: 0.6 }}>★</span>
            </div>
            <p style={{ 
                color: selectedColor.text, 
                opacity: 0.95, 
                margin: '2em 0 1.5em 0', 
                textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
                fontFamily: "'Righteous', sans-serif", 
                fontWeight: 700,
                fontSize: '1em',
                lineHeight: '1.8',
                paddingBottom: '1em',
                borderBottom: `3px dashed ${selectedColor.border}80`
            }}>
                📝 {ticket.description}
            </p>
            
            <div className="ticket-meta" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1em', marginBottom: '1.5em' }}>
                <div className="meta-item" style={{ background: `linear-gradient(135deg, ${selectedColor.border}25, ${selectedColor.border}15)`, borderLeft: `5px solid ${selectedColor.border}`, borderRadius: '12px', padding: '1.2em', boxShadow: `0 4px 8px rgba(0,0,0,0.2), inset 0 0 10px ${selectedColor.border}15`, transform: 'rotate(-0.7deg)', transition: 'all 0.3s ease', cursor: 'pointer' }} onMouseEnter={(e) => { e.currentTarget.style.transform = 'rotate(0deg) scale(1.05)'; e.currentTarget.style.boxShadow = `0 8px 16px rgba(0,0,0,0.3), 0 0 15px ${selectedColor.border}`; }} onMouseLeave={(e) => { e.currentTarget.style.transform = 'rotate(-0.7deg) scale(1)'; e.currentTarget.style.boxShadow = `0 4px 8px rgba(0,0,0,0.2), inset 0 0 10px ${selectedColor.border}15`; }}>
                    <label style={{ fontFamily: "'Press Start 2P', monospace", fontSize: '0.65em', color: selectedColor.border, textShadow: `2px 2px 0px ${selectedColor.text}80`, letterSpacing: '1.5px', marginBottom: '0.5em', opacity: 0.8, display: 'block' }}>📅 CREATED</label>
                    <p style={{ color: selectedColor.text, margin: 0, fontFamily: "'Righteous', sans-serif", fontWeight: 700, fontSize: '1em', textShadow: '2px 2px 4px rgba(0,0,0,0.3)' }}>{new Date(ticket.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}</p>
                </div>
                <div className="meta-item" style={{ background: `linear-gradient(135deg, ${selectedColor.border}25, ${selectedColor.border}15)`, borderLeft: `5px solid ${selectedColor.border}`, borderRadius: '12px', padding: '1.2em', boxShadow: `0 4px 8px rgba(0,0,0,0.2), inset 0 0 10px ${selectedColor.border}15`, transform: 'rotate(0.3deg)', transition: 'all 0.3s ease', cursor: 'pointer' }} onMouseEnter={(e) => { e.currentTarget.style.transform = 'rotate(0deg) scale(1.05)'; e.currentTarget.style.boxShadow = `0 8px 16px rgba(0,0,0,0.3), 0 0 15px ${selectedColor.border}`; }} onMouseLeave={(e) => { e.currentTarget.style.transform = 'rotate(0.3deg) scale(1)'; e.currentTarget.style.boxShadow = `0 4px 8px rgba(0,0,0,0.2), inset 0 0 10px ${selectedColor.border}15`; }}>
                    <label style={{ fontFamily: "'Press Start 2P', monospace", fontSize: '0.65em', color: selectedColor.border, textShadow: `2px 2px 0px ${selectedColor.text}80`, letterSpacing: '1.5px', marginBottom: '0.5em', opacity: 0.8, display: 'block' }}>⚡ PRIORITY</label>
                    <p style={{ color: selectedColor.text, margin: 0, fontFamily: "'Righteous', sans-serif", fontWeight: 700, fontSize: '1em', textShadow: '2px 2px 4px rgba(0,0,0,0.3)' }}><span className="badge badge-priority">{ticket.priority_name}</span></p>
                </div>
                <div className="meta-item" style={{ background: `linear-gradient(135deg, ${selectedColor.border}25, ${selectedColor.border}15)`, borderLeft: `5px solid ${selectedColor.border}`, borderRadius: '12px', padding: '1.2em', boxShadow: `0 4px 8px rgba(0,0,0,0.2), inset 0 0 10px ${selectedColor.border}15`, transform: 'rotate(0.7deg)', transition: 'all 0.3s ease', cursor: 'pointer' }} onMouseEnter={(e) => { e.currentTarget.style.transform = 'rotate(0deg) scale(1.05)'; e.currentTarget.style.boxShadow = `0 8px 16px rgba(0,0,0,0.3), 0 0 15px ${selectedColor.border}`; }} onMouseLeave={(e) => { e.currentTarget.style.transform = 'rotate(0.7deg) scale(1)'; e.currentTarget.style.boxShadow = `0 4px 8px rgba(0,0,0,0.2), inset 0 0 10px ${selectedColor.border}15`; }}>
                    <label style={{ fontFamily: "'Press Start 2P', monospace", fontSize: '0.65em', color: selectedColor.border, textShadow: `2px 2px 0px ${selectedColor.text}80`, letterSpacing: '1.5px', marginBottom: '0.5em', opacity: 0.8, display: 'block' }}>🎯 STATUS</label>
                    <p style={{ color: selectedColor.text, margin: 0, fontFamily: "'Righteous', sans-serif", fontWeight: 700, fontSize: '1em', textShadow: '2px 2px 4px rgba(0,0,0,0.3)' }}><span className="badge badge-status">{ticket.status_name}</span></p>
                </div>
            </div>
        </div>
    )
}

export default TicketDetailsCard;