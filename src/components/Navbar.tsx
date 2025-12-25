//הקומפוננטה מציגה תפריט עליון שמופיע בכל דף אחרי התחברות לוגות שם משתמש, תפריט ניווט

import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

function Narbar(){
    const {user, logout} = useAuth();
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);

    const hundleLogout = async () => {
        await logout();
        navigate('/login');
    }

    const navButtonStyle = {
        background: 'transparent',
        color: '#00d9ff',
        border: '2px solid #00d9ff',
        padding: '0.6em 1.2em',
        fontWeight: 700,
        fontSize: '0.95em',
        cursor: 'pointer',
        transition: 'all 0.3s ease',
        textTransform: 'uppercase',
        letterSpacing: '1px',
        borderRadius: '0px'
    };

    const navButtonHoverStyle = {
        ...navButtonStyle,
        backgroundColor: '#00d9ff',
        color: '#000',
        boxShadow: '0 0 15px rgba(0, 217, 255, 0.6)'
    };

    const adminButtonStyle = {
        ...navButtonStyle,
        color: '#9b2e7f',
        border: '2px solid #9b2e7f'
    };

    const adminButtonHoverStyle = {
        ...adminButtonStyle,
        backgroundColor: '#9b2e7f',
        color: '#fff',
        boxShadow: '0 0 15px rgba(155, 46, 127, 0.6)'
    };

    const logoutButtonStyle = {
        ...navButtonStyle,
        color: '#ff006e',
        border: '2px solid #ff006e'
    };

    const logoutButtonHoverStyle = {
        ...logoutButtonStyle,
        backgroundColor: '#ff006e',
        color: '#000',
        boxShadow: '0 0 15px rgba(255, 0, 110, 0.6)'
    };

    return (
        <nav style={{
            background: 'linear-gradient(135deg, #1a1a1a 0%, #2a2a2a 50%, #1a1a1a 100%)',
            borderBottom: '3px solid #00d9ff',
            boxShadow: '0 5px 25px rgba(0, 217, 255, 0.15), inset 0 -2px 10px rgba(0, 0, 0, 0.5)',
            padding: '1.2em 2em',
            position: 'sticky',
            top: 0,
            zIndex: 1000,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '1.5em'
        }}>
            {/* Logo/Branding */}
            <h1 style={{
                margin: 0,
                color: '#ff006e',
                fontSize: '1.8em',
                fontWeight: 900,
                letterSpacing: '3px',
                textTransform: 'uppercase',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                textShadow: '0 0 20px rgba(255, 0, 110, 0.4)'
            }} 
            onMouseEnter={(e) => {
                e.currentTarget.style.color = '#00d9ff';
                e.currentTarget.style.textShadow = '0 0 20px rgba(0, 217, 255, 0.6)';
            }}
            onMouseLeave={(e) => {
                e.currentTarget.style.color = '#ff006e';
                e.currentTarget.style.textShadow = '0 0 20px rgba(255, 0, 110, 0.4)';
            }}
            onClick={() => navigate('/')}
            >
                🎫 HELPDESK
            </h1>

            {/* Mobile menu toggle */}
            <button 
                style={{
                    background: 'none',
                    border: 'none',
                    color: '#00d9ff',
                    fontSize: '1.5em',
                    cursor: 'pointer'
                }}
                onClick={() => setIsOpen(!isOpen)}
            >
                {isOpen ? '✕' : '☰'}
            </button>

            {/* Navigation */}
            { user && 
            <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '1.5em',
                flexWrap: 'wrap'
            }}>
                {/* User Info */}
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.8em',
                    padding: '0.5em 1em',
                    borderLeft: '3px solid #00d9ff',
                    borderRight: '3px solid #00d9ff'
                }}>
                    <span style={{
                        fontSize: '1.2em'
                    }}>👤</span>
                    <p style={{
                        margin: 0,
                        color: '#00d9ff',
                        fontWeight: 700,
                        fontSize: '0.95em',
                        textTransform: 'uppercase',
                        letterSpacing: '0.5px'
                    }}>
                        {user?.name}
                    </p>
                    <span style={{
                        background: `linear-gradient(135deg, ${
                            user?.role === 'admin' ? '#9b2e7f' : 
                            user?.role === 'agent' ? '#00d9ff' : 
                            '#ff006e'
                        }, ${
                            user?.role === 'admin' ? '#ff006e' : 
                            user?.role === 'agent' ? '#00ff88' : 
                            '#ff1744'
                        })`,
                        color: '#000',
                        padding: '0.3em 0.7em',
                        fontSize: '0.75em',
                        fontWeight: 900,
                        borderRadius: '0px',
                        border: '2px solid #fff',
                        textTransform: 'uppercase'
                    }}>
                        {user?.role}
                    </span>
                </div>

                {/* Navigation Buttons */}
                <div style={{
                    display: 'flex',
                    gap: '0.8em',
                    flexWrap: 'wrap'
                }}>
                    <button 
                        onClick={() => navigate('/dashboard')}
                        style={navButtonStyle}
                        onMouseEnter={(e) => Object.assign(e.currentTarget.style, navButtonHoverStyle)}
                        onMouseLeave={(e) => Object.assign(e.currentTarget.style, navButtonStyle)}
                    >
                        📊 Dashboard
                    </button>
                    <button 
                        onClick={() => navigate('/tickets')}
                        style={navButtonStyle}
                        onMouseEnter={(e) => Object.assign(e.currentTarget.style, navButtonHoverStyle)}
                        onMouseLeave={(e) => Object.assign(e.currentTarget.style, navButtonStyle)}
                    >
                        🎫 Tickets
                    </button>

                    {user?.role === 'admin' && (
                        <>
                            <button 
                                onClick={() => navigate('/users')}
                                style={adminButtonStyle}
                                onMouseEnter={(e) => Object.assign(e.currentTarget.style, adminButtonHoverStyle)}
                                onMouseLeave={(e) => Object.assign(e.currentTarget.style, adminButtonStyle)}
                            >
                                👥 Users
                            </button>
                            <button 
                                onClick={() => navigate('/status')}
                                style={adminButtonStyle}
                                onMouseEnter={(e) => Object.assign(e.currentTarget.style, adminButtonHoverStyle)}
                                onMouseLeave={(e) => Object.assign(e.currentTarget.style, adminButtonStyle)}
                            >
                                📝 Status
                            </button>
                            <button 
                                onClick={() => navigate('/priorities')}
                                style={adminButtonStyle}
                                onMouseEnter={(e) => Object.assign(e.currentTarget.style, adminButtonHoverStyle)}
                                onMouseLeave={(e) => Object.assign(e.currentTarget.style, adminButtonStyle)}
                            >
                                ⚡ Priorities
                            </button>
                        </>
                    )}

                    <button 
                        onClick={hundleLogout}
                        style={logoutButtonStyle}
                        onMouseEnter={(e) => Object.assign(e.currentTarget.style, logoutButtonHoverStyle)}
                        onMouseLeave={(e) => Object.assign(e.currentTarget.style, logoutButtonStyle)}
                    >
                        🚪 Logout
                    </button>
                </div>
            </div>
            }
        </nav>
    );
}


export default Narbar