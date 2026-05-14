export type TaskStatus = 'Активные' | 'Приостановленные' |'Завершенные'

export type TaskPriority = 'low' | 'medium' | 'high' | 'urgent'

export interface Task {
  id: number
  projectId: number
  title: string
  description?: string
  status: TaskStatus
  priority: TaskPriority
  order: number
  dueDate?: string | null
  // isVisibleToClient: boolean
  createdAt?: string
  updatedAt?: string
  completed:boolean
}