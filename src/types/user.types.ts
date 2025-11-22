// API Response Types
export interface UserRole {
    id: string;
    name: string;
}

export interface UserApiResponse {
    id: string;
    email: string;
    username: string;
    role: UserRole;
    phone_number: string | null;
    address: string | null;
    city: string | null;
    state: string | null;
    postal_code: string | null;
    country: string | null;
    profilepic: string | null;
    created_at: string;
    updated_at: string;
}

export interface UserListApiResponse {
    data: UserApiResponse[];
}

// Component Data Types
export interface UserMember {
    id: string;
    email: string;
    username: string;
    role: string;
    joinDate: string;
    phone: string;
    address: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
    profilePic: string;
}

// Role mapping
export const ROLE_MAP: Record<string, string> = {
    "550e8400-e29b-41d4-a716-446655440001": "User",
    "550e8400-e29b-41d4-a716-446655440002": "Staff",
};

// Update request type
export interface UserUpdateRequest {
    username?: string;
    phone_number?: string;
    address?: string;
    city?: string;
    state?: string;
    postal_code?: string;
    country?: string;
    profilepic?: string;
}
