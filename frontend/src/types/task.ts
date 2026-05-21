export type TaskStatus = 'Активные' | 'Приостановленные' |'Завершенные'

export type TaskPriority = 'low' | 'medium' | 'high' | 'urgent'

export const prioritys: TaskPriority[] = ['low', 'medium', 'high' , 'urgent']

export interface Task {
  id: number
  project_id: number
  title: string
  description?: string
  status: TaskStatus
  priority: TaskPriority
  order: number
  deadline: string | null
  createdAt?: string
  completed:boolean
}