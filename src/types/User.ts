export interface user{
    id: number,
    name: string,
    email: string,
    role: userRole,
    created_at: string
}

export interface AuthRequest{
    email: string,
    password: string
}

export interface AuthResponse{
    id: number
    token: string
    user: user
}

export interface RegisterRequest{
    name: string,
    email: string,
    password: string    
}

export interface CreateUserAdmin{
// description: Admin-only user creation (allowed roles: customer, agent, admin)
name: string,
email: string,
password: string,
role: userRole
}

// export type userRole = 'customer' | 'agent' | 'admin';

export enum userRole{
    customer = 'customer',
    agent = 'agent',
    admin = 'admin'
}