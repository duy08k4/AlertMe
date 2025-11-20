// API Response Types
export interface StaffProfile {
  id: string;
  username: string;
  phone_number: string;
  address: string;
  city: string;
  state: string;
  postal_code: string;
  country: string;
  profilepic: string;
}

export interface StaffApiResponse {
  id: string;
  email: string;
  name: string;
  role_id: string;
  is_new_user: boolean;
  profile: StaffProfile;
  task_given: number;
  task_completed: number;
  created_at: string;
  updated_at: string;
}

export interface StaffListApiResponse {
  data: StaffApiResponse[];
}

// Component Data Types
export interface StaffMember {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: string;
  status: string;
  joinDate: string;
  tasks: number;
  staffId: string;
  taskCompleted: number;
  address?: string;
  city?: string;
  state?: string;
  postalCode?: string;
  country?: string;
  profilePic?: string;
  username?: string;
}

// Role mapping (you can extend this based on your role_id values)
export const ROLE_MAP: Record<string, string> = {
  "550e8400-e29b-41d4-a716-446655440002": "Nhân viên",
  // Add more role mappings as needed
};

// Status mapping
export const STATUS_MAP = {
  ACTIVE: "Hoạt động",
  ON_LEAVE: "Nghỉ phép",
  SUSPENDED: "Bị đình chỉ",
} as const;

// Sign-up request type
export interface StaffSignUpRequest {
  email: string;
  name: string;
  password: string;
  username: string;
  phone_number: string;
  address: string;
  city: string;
  state: string;
  postal_code: string;
  country: string;
  profilepic: string;
}

// Sign-up response type
export interface StaffSignUpResponse {
  message: string;
  staff: {
    id: string;
    email: string;
    name: string;
    role: string;
    is_new_user: boolean;
    profile: {
      id: string;
      username: string;
      phone_number: string;
      address: string;
      city: string;
      state: string;
      postal_code: string;
      country: string;
      profilepic: string;
    };
    task_given: number;
    task_completed: number;
  };
  requiresEmailVerification: boolean;
}

// Update request type
export interface StaffUpdateRequest {
  email: string;
  name: string;
  username: string;
  phone_number: string;
  address?: string;
  city?: string;
  state?: string;
  postal_code?: string;
  country?: string;
  profilepic?: string;
}
