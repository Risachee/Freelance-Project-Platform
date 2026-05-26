import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import type { Task, TaskStatus } from '@/types/task';
import { taskService } from '@/api/taskService';

type TasksContextType = {
  tasks: Task[];
  filteredTasks: Task[];
  activeFilter: TaskStatus;
  setActiveFilter: (value: TaskStatus) => void;
  toggleTaskComplete: (id: string | number) => void;
  addTask: (projectId: number, newTask: Task) => Promise<void>;
  updateTask: (projectId: number | string, taskId: number | string, taskData: Task) => void;
  projectTasks: (projectId: number) => Task[];
};

const TasksContext = createContext<TasksContextType | undefined>(undefined);

const initialTasks: Task[] = [{
  id: 1,
  title: 'Сделать страницу задач',
  description: 'Собрать красивую Kanban-логику.',
  status: 'Активные',
  priority: 'high',
  deadline: '25 апр',
  project_id: 1,
  completed: false,
  order: 2,
},
{
  id: 2,
  title: 'Подключить фильтры',
  description: 'Показ задач по статусу.',
  status: 'Активные',
  priority: 'medium',
  deadline: '27 апр',
  project_id: 1,
  completed: false,
  order: 3,
},
{
  id: 3,
  title: 'Drag and Drop',
  description: 'Сделать перетаскивание карточек.',
  status: 'Завершенные',
  priority: 'urgent',
  deadline: '29 апр',
  project_id: 2,
  completed: true,
  order: 1,
},
{
  id: 4,
  title: 'Сверстать карточку Done',
  description: 'Проверить внешний вид завершённых задач.',
  status: 'Приостановленные',
  priority: 'low',
  deadline: 'Вчера',
  project_id: 3,
  completed: false,
  order: 4,
},
{
  id: 5,
  title: 'Сверстать карточку Client',
  description: 'Проверить внешний вид завершённых задач.',
  status: 'Активные',
  priority: 'urgent',
  deadline: 'Вчера',
  project_id: 3,
  completed: false,
  order: 1,
},];

export const TasksProvider = ({ children }: { children: React.ReactNode }) => {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [activeFilter, setActiveFilter] = useState<TaskStatus>('Активные');

  const projectTasks = (projectId: number) => {
    return tasks.filter((item) => item.project_id === projectId)
  }

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

  const addTask = useCallback(async (projectId: number, newTask: Task) => {
    try {
      const created = await taskService.create(projectId, newTask);
      // setTasks((prev) => [...prev, created]);
      console.log('Задача создана:', created);
    } catch (error) {
      console.error('Ошибка при создании задачи:', error);
      throw error;
    }
  }, []);

  const updateTask = useCallback(async (projectId: number | string, taskId: number | string, taskData: Task) => {
    try {
      const { id, ...data } = taskData;
      const refreshed = await taskService.update(projectId, taskId, data);
      // setTasks((prev) =>
      //   prev.map((p) => (p.id === id ? refreshed : p))
      // );
      console.log('Задача обновлёна:', refreshed);
    } catch (error) {
      console.error('Ошибка при обновлении задачи:', error);
      throw error;
    }
  }, []);

  return (
    <TasksContext.Provider
      value={{
        tasks,
        filteredTasks,
        activeFilter,
        setActiveFilter,
        toggleTaskComplete,
        updateTask,
        addTask,
        projectTasks,
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