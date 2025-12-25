function Footer() {
    return (
        <footer className="graffiti-footer" style={{
            background: 'linear-gradient(135deg, #1a1a1a 0%, #2a2a2a 50%, #1a1a1a 100%)',
            borderTop: '4px solid #ff006e',
            boxShadow: 'inset 0 10px 30px rgba(255, 0, 110, 0.1), 0 -5px 20px rgba(0, 0, 0, 0.8)',
            color: '#ffffff',
            padding: '3em 2em',
            marginTop: '4em',
            position: 'relative',
            overflow: 'hidden'
        }}>
            {/* Graffiti background effect */}
            <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                opacity: 0.03,
                backgroundImage: 'repeating-linear-gradient(45deg, #ff006e, #ff006e 2px, transparent 2px, transparent 10px)',
                pointerEvents: 'none'
            }}></div>

            <div style={{
                maxWidth: '1200px',
                margin: '0 auto',
                position: 'relative',
                zIndex: 1
            }}>
                {/* Main grid layout */}
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                    gap: '2.5em',
                    marginBottom: '2em'
                }}>
                    {/* Branding Section */}
                    <div style={{
                        borderBottom: '3px dashed #00d9ff',
                        paddingBottom: '1.5em'
                    }}>
                        <h3 style={{
                            fontSize: '1.8em',
                            color: '#ff006e',
                            fontWeight: 900,
                            letterSpacing: '2px',
                            margin: '0 0 0.5em 0',
                            textTransform: 'uppercase'
                        }}>
                            🎫 Ticket Tracker
                        </h3>
                        <p style={{
                            color: 'rgba(255, 255, 255, 0.8)',
                            fontSize: '0.95em',
                            margin: '0.5em 0 0 0'
                        }}>
                            מערכת ניהול טיקטים מודרנית עם סגנון גרפיטי מגניב
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 style={{
                            color: '#00d9ff',
                            fontSize: '1.1em',
                            fontWeight: 900,
                            textTransform: 'uppercase',
                            letterSpacing: '1px',
                            marginBottom: '1em',
                            borderBottom: '2px solid #00d9ff',
                            paddingBottom: '0.5em'
                        }}>
                            קישורים
                        </h4>
                        <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                            <li style={{ marginBottom: '0.7em' }}>
                                <a href="/*" style={{
                                    color: '#00ff88',
                                    textDecoration: 'none',
                                    fontWeight: 700,
                                    transition: 'all 0.3s ease',
                                    borderBottom: '2px solid transparent'
                                }} onMouseEnter={(e) => {
                                    e.currentTarget.style.color = '#ff006e';
                                    e.currentTarget.style.borderBottom = '2px solid #ff006e';
                                }} onMouseLeave={(e) => {
                                    e.currentTarget.style.color = '#00ff88';
                                    e.currentTarget.style.borderBottom = '2px solid transparent';
                                }}>
                                    🔒 Privacy Policy
                                </a>
                            </li>
                            <li style={{ marginBottom: '0.7em' }}>
                                <a href="/*" style={{
                                    color: '#00ff88',
                                    textDecoration: 'none',
                                    fontWeight: 700,
                                    transition: 'all 0.3s ease',
                                    borderBottom: '2px solid transparent'
                                }} onMouseEnter={(e) => {
                                    e.currentTarget.style.color = '#ff006e';
                                    e.currentTarget.style.borderBottom = '2px solid #ff006e';
                                }} onMouseLeave={(e) => {
                                    e.currentTarget.style.color = '#00ff88';
                                    e.currentTarget.style.borderBottom = '2px solid transparent';
                                }}>
                                    📋 Terms of Service
                                </a>
                            </li>
                            <li>
                                <a href="/*" style={{
                                    color: '#00ff88',
                                    textDecoration: 'none',
                                    fontWeight: 700,
                                    transition: 'all 0.3s ease',
                                    borderBottom: '2px solid transparent'
                                }} onMouseEnter={(e) => {
                                    e.currentTarget.style.color = '#ff006e';
                                    e.currentTarget.style.borderBottom = '2px solid #ff006e';
                                }} onMouseLeave={(e) => {
                                    e.currentTarget.style.color = '#00ff88';
                                    e.currentTarget.style.borderBottom = '2px solid transparent';
                                }}>
                                    ℹ️ About Us
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h4 style={{
                            color: '#9b2e7f',
                            fontSize: '1.1em',
                            fontWeight: 900,
                            textTransform: 'uppercase',
                            letterSpacing: '1px',
                            marginBottom: '1em',
                            borderBottom: '2px solid #9b2e7f',
                            paddingBottom: '0.5em'
                        }}>
                            יצירת קשר
                        </h4>
                        <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                            <li style={{
                                marginBottom: '0.8em',
                                color: 'rgba(255, 255, 255, 0.9)',
                                fontSize: '0.95em'
                            }}>
                                📧 <strong>Email:</strong> support@tickettracker.com
                            </li>
                            <li style={{
                                marginBottom: '0.8em',
                                color: 'rgba(255, 255, 255, 0.9)',
                                fontSize: '0.95em'
                            }}>
                                📱 <strong>Phone:</strong> 123-456-7890
                            </li>
                            <li style={{
                                color: 'rgba(255, 255, 255, 0.9)',
                                fontSize: '0.95em'
                            }}>
                                🌐 <strong>Website:</strong> www.tickettracker.com
                            </li>
                        </ul>
                    </div>

                    {/* Social Links */}
                    <div>
                        <h4 style={{
                            color: '#00d9ff',
                            fontSize: '1.1em',
                            fontWeight: 900,
                            textTransform: 'uppercase',
                            letterSpacing: '1px',
                            marginBottom: '1em',
                            borderBottom: '2px solid #00d9ff',
                            paddingBottom: '0.5em'
                        }}>
                            עקוב אחרינו
                        </h4>
                        <div style={{
                            display: 'flex',
                            gap: '1em',
                            flexWrap: 'wrap'
                        }}>
                            <a href="https://www.facebook.com/tickettracker" style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                width: '45px',
                                height: '45px',
                                backgroundColor: 'rgba(255, 0, 110, 0.2)',
                                border: '2px solid #ff006e',
                                color: '#ff006e',
                                textDecoration: 'none',
                                fontWeight: 900,
                                fontSize: '1.2em',
                                transition: 'all 0.3s ease',
                                cursor: 'pointer'
                            }} onMouseEnter={(e) => {
                                e.currentTarget.style.backgroundColor = '#ff006e';
                                e.currentTarget.style.color = '#000';
                                e.currentTarget.style.boxShadow = '0 0 20px rgba(255, 0, 110, 0.6)';
                            }} onMouseLeave={(e) => {
                                e.currentTarget.style.backgroundColor = 'rgba(255, 0, 110, 0.2)';
                                e.currentTarget.style.color = '#ff006e';
                                e.currentTarget.style.boxShadow = 'none';
                            }}>
                                f
                            </a>
                            <a href="https://twitter.com/tickettracker" style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                width: '45px',
                                height: '45px',
                                backgroundColor: 'rgba(0, 217, 255, 0.2)',
                                border: '2px solid #00d9ff',
                                color: '#00d9ff',
                                textDecoration: 'none',
                                fontWeight: 900,
                                fontSize: '1.2em',
                                transition: 'all 0.3s ease',
                                cursor: 'pointer'
                            }} onMouseEnter={(e) => {
                                e.currentTarget.style.backgroundColor = '#00d9ff';
                                e.currentTarget.style.color = '#000';
                                e.currentTarget.style.boxShadow = '0 0 20px rgba(0, 217, 255, 0.6)';
                            }} onMouseLeave={(e) => {
                                e.currentTarget.style.backgroundColor = 'rgba(0, 217, 255, 0.2)';
                                e.currentTarget.style.color = '#00d9ff';
                                e.currentTarget.style.boxShadow = 'none';
                            }}>
                                𝕏
                            </a>
                            <a href="https://www.instagram.com/tickettracker" style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                width: '45px',
                                height: '45px',
                                backgroundColor: 'rgba(155, 46, 127, 0.2)',
                                border: '2px solid #9b2e7f',
                                color: '#9b2e7f',
                                textDecoration: 'none',
                                fontWeight: 900,
                                fontSize: '1.2em',
                                transition: 'all 0.3s ease',
                                cursor: 'pointer'
                            }} onMouseEnter={(e) => {
                                e.currentTarget.style.backgroundColor = '#9b2e7f';
                                e.currentTarget.style.color = '#fff';
                                e.currentTarget.style.boxShadow = '0 0 20px rgba(155, 46, 127, 0.6)';
                            }} onMouseLeave={(e) => {
                                e.currentTarget.style.backgroundColor = 'rgba(155, 46, 127, 0.2)';
                                e.currentTarget.style.color = '#9b2e7f';
                                e.currentTarget.style.boxShadow = 'none';
                            }}>
                                📷
                            </a>
                        </div>
                    </div>
                </div>

                {/* Divider */}
                <div style={{
                    borderTop: '2px dashed #00d9ff',
                    marginTop: '2em',
                    paddingTop: '2em'
                }}>
                    {/* Bottom Section */}
                    <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        flexWrap: 'wrap',
                        gap: '1.5em'
                    }}>
                        <p style={{
                            margin: 0,
                            color: 'rgba(255, 255, 255, 0.7)',
                            fontSize: '0.9em',
                            fontWeight: 700
                        }}>
                            © 2025 Ticket Tracker. All rights reserved.
                        </p>
                        <div style={{
                            fontSize: '1.2em'
                        }}>
                            🎯 Made with ❤️ and 💪
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;