export type ProjectStatus = 'Все'|'Обсуждение' | 'В работе' | 'На паузе' | 'Завершен'
export const statuses: ProjectStatus[] = ['Обсуждение', 'В работе', 'На паузе', 'Завершен'];
export const filter: ProjectStatus[] = ['Все', 'Обсуждение', 'В работе', 'На паузе', 'Завершен'];

export interface Project {
  id: number
  // ownerId: number
  client: string
  title: string
  description: string
  status: ProjectStatus
  budgetTotal: number
  budgetPaid: number
  deadline?: string | null
  isArchived: boolean
  createdAt?: string
  updatedAt?: string
  guestToken?: string | null;
}