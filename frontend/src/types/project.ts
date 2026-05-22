import type { Client } from "./client";

export type ProjectStatus = 'Все'|'Обсуждение' | 'В работе' | 'На паузе' | 'Завершен'
export const statuses: ProjectStatus[] = ['Обсуждение', 'В работе', 'На паузе', 'Завершен'];
export const filter: ProjectStatus[] = ['Все', 'Обсуждение', 'В работе', 'На паузе', 'Завершен'];

export interface Project {
  id: number
  client: Client
  client_id?: number
  clientName?: string
  owner?: number
  title: string
  description: string
  status: ProjectStatus
  budget: number
  deadline: string
  isArchived?: boolean
  created_at: string
  token?: string | null
}