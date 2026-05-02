import React, { createContext, useContext, useMemo, useState } from 'react';
import type { Task, TaskStatus } from '@/types/task';

type TasksContextType = {
  tasks: Task[];
  filteredTasks: Task[];
  activeFilter: TaskStatus;
  setActiveFilter: (value: TaskStatus) => void;
  toggleTaskComplete: (id: string | number) => void;
};

const TasksContext = createContext<TasksContextType | undefined>(undefined);

const initialTasks: Task[] = [{
  id: '1',
  title: 'Сделать страницу задач',
  description: 'Собрать красивую Kanban-логику.',
  status: 'Активные',
  priority: 'high',
  dueDate: '25 апр',
  projectId: 'АК',
  completed: false,
  order: 2,
},
{
  id: '2',
  title: 'Подключить фильтры',
  description: 'Показ задач по статусу.',
  status: 'Активные',
  priority: 'medium',
  dueDate: '27 апр',
  projectId: 'МК',
  completed: false,
  order: 3,
},
{
  id: '3',
  title: 'Drag and Drop',
  description: 'Сделать перетаскивание карточек.',
  status: 'Завершенные',
  priority: 'urgent',
  dueDate: '29 апр',
  projectId: 'АК',
  completed: true,
  order: 1,
},
{
  id: '4',
  title: 'Сверстать карточку Done',
  description: 'Проверить внешний вид завершённых задач.',
  status: 'Приостановленные',
  priority: 'low',
  dueDate: 'Вчера',
  projectId: 'МК',
  completed: false,
  order: 4,
},
{
  id: '5',
  title: 'Сверстать карточку Client',
  description: 'Проверить внешний вид завершённых задач.',
  status: 'Активные',
  priority: 'urgent',
  dueDate: 'Вчера',
  projectId: 'МК',
  completed: false,
  order: 1,
},];

export const TasksProvider = ({ children }: { children: React.ReactNode }) => {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [activeFilter, setActiveFilter] = useState<TaskStatus>('Активные');

  const toggleTaskComplete = (id: string | number) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const filteredTasks = useMemo(() => {
    return [...tasks]
      .filter((task) => task.status === activeFilter)
      .sort((a, b) => a.order - b.order)
  }, [tasks, activeFilter]);

  return (
    <TasksContext.Provider
      value={{
        tasks,
        filteredTasks,
        activeFilter,
        setActiveFilter,
        toggleTaskComplete,
      }}
    >
      {children}
    </TasksContext.Provider>
  );
};

export const useTasks = () => {
  const context = useContext(TasksContext);
  if (!context) {
    throw new Error('useTasks must be used within TasksProvider');
  }
  return context;
};