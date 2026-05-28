export type TaskStatus = 'Активные' | 'В процессе' |'Завершенные'

export type TaskPriority = 'low' | 'medium' | 'high' | 'urgent'

export const prioritys: TaskPriority[] = ['low', 'medium', 'high' , 'urgent']

export interface Task {
  id: number
  project: number
  title: string
  description?: string
  status: string
  priority: string
  order: number
  deadline: string | null
  createdAt?: string
  completed:boolean
}