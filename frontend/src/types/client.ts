export interface Client {
  id: number
  name: string
  email?: string
  phone: string
  telegram?: string
  note?: string
  createdAt?: string
  updatedAt?: string
  projectsCount: number
}