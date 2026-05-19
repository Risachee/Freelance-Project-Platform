export interface User {
    id: number
    name: string
    email: string
    createdAt?: string
    updatedAt?: string
    password: string
    confirmPassword: string
}