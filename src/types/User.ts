// Define the User type
export interface User {
    id: number;           // Unique identifier for the user
    email: string;        // User's email address
    is_admin: boolean;     // Indicates if the user is an admin
    createdAt?: string;   // Optional: Date when the user was created
    updatedAt?: string;   // Optional: Date when the user was last updated
  }