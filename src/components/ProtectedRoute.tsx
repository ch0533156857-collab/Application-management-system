//בודקת האם המשתמש מחובר ואם יש לו הרשאות לראות את הדף- route guard

import { useAuth } from "../context/AuthContext";
import {Navigate} from 'react-router-dom';
import type { userRole } from "../types/User";

interface ProtectedRouteProps {
    children: React.ReactNode;
    allowedRoles?: userRole[];
}

function ProtectedRoute({ children, allowedRoles }: ProtectedRouteProps) {
    const {isAuthenticated, user} = useAuth();

    if (!isAuthenticated) {
        return <Navigate to="/login" />;
    }


    if (allowedRoles && !allowedRoles.includes(user!.role)) {
        return <Navigate to="/dashboard"></Navigate>;
    }

    return <>{children}</>;
}

export default ProtectedRoute