//הקומפוננטה מציגה תפריט עליון שמופיע בכל דף אחרי התחברות לוגות שם משתמש, תפריט ניווט

import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

function Narbar(){
    const {user, logout} = useAuth();
    const navigate = useNavigate();

    const hundleLogout = async () => {
        await logout();
        navigate('/login');
    }

    return (
        <nav>

            <h1>HELPDESK</h1>
            { user && 
            <div>
                <p>{user?.name}</p>
                <button onClick={() => navigate('/dashboard')}>Dashboard</button>
                <button onClick={() => navigate('/tickets')}>Tickets</button>

                {user?.role === 'admin' && (
                    <>
                        <button onClick={() => navigate('/users')}>Users</button>
                        <button onClick={() => navigate('/status')}>Status</button>
                        <button onClick={() => navigate('/priorities')}>Priorities</button>
                    </>
                )}

                <button onClick={hundleLogout}>Logout</button>
            </div>
            }
        </nav>
    );
}


export default Narbar