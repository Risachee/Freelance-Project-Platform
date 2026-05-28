import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import type { Task, TaskStatus } from '@/types/task';
import { taskService } from '@/api/taskService';
import { useAuth } from './AuthContext';

type TasksContextType = {
  tasks: Task[];
  filteredTasks: Task[];
  activeFilter: TaskStatus;
  setActiveFilter: (value: TaskStatus) => void;
  toggleTaskComplete: (id: string | number) => void;
  addTask: (projectId: number, newTask: Task) => Promise<void>;
  updateTask: (taskData: Task) => Promise<void>;
  projectTasks: (projectId: number) => Task[];
  deleteTask: (taskToDeleted: Task) => Promise<void>;
};

const TasksContext = createContext<TasksContextType | undefined>(undefined);

export const TasksProvider = ({ children }: { children: React.ReactNode }) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const { isAuthenticated } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState<TaskStatus>('Активные');

  useEffect(() => {
    if (!isAuthenticated) {
      setIsLoading(false);
      setTasks([]);
      return;
    }

    const loadProjects = async () => {
      try {
        setIsLoading(true);
        const data = await taskService.getAllTasks();
        console.log("Задачи получены", data);
        setTasks(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error('Ошибка при загрузке задач:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadProjects();
  }, [isAuthenticated]);

  const projectTasks = useCallback((projectId: number | string) => {
    return tasks.filter((item) => Number(item.project) === Number(projectId));
  }, [tasks]);

  const filteredTasks = useMemo(() => {
    return [...tasks]
      .filter((task) => task.status === activeFilter)
      .sort((a, b) => a.order - b.order)
  }, [tasks, activeFilter]);

  const addTask = useCallback(async (projectId: number, newTask: Task) => {
    try {
      const created = await taskService.create(projectId, newTask);
      setTasks((prev) => [...prev, created]);
      console.log('Задача создана:', created);
    } catch (error) {
      console.error('Ошибка при создании задачи:', error);
      throw error;
    }
  }, []);

  const updateTask = useCallback(async (taskData: Task) => {
    try {
      const { id, project: project, ...data } = taskData;

      const refreshed = await taskService.update(project, id, data);

      setTasks((prev) =>
        prev.map((p) => (p.id === id ? refreshed : p))
      );
      console.log('Задача успешно обновлена');
    } catch (error) {
      console.error('Ошибка при обновлении задачи:', error);
      throw error;
    }
  }, []);

  const deleteTask = useCallback(async (taskToDelete: Task) => {
    try {
      await taskService.delete(taskToDelete.project, taskToDelete.id);

      setTasks((prev) => prev.filter(t => t.id !== taskToDelete.id));
      console.log('Задача успешно удалена', taskToDelete);
    } catch (error) {
      console.log('Ошибка при удалении задачи:', error);
      throw error;
    }
  }, []);

  const toggleTaskComplete = useCallback((id: string | number) => {

    const task = tasks.find(t => t.id === id);
    if (!task) return;

    const isNowCompleted = !task.completed;
    const updatedTask = {
      ...task,
      completed: isNowCompleted,
      status: isNowCompleted ? 'Завершенные' : 'Активные',
    };

    updateTask(updatedTask);
    setTasks((prev) =>
      prev.map((t) => t.id === id ? updatedTask : t)
    );
  }, [tasks, updateTask]);

  const contextValue = useMemo(() => ({
    tasks,
    filteredTasks,
    activeFilter,
    setActiveFilter,
    toggleTaskComplete,
    updateTask,
    addTask,
    projectTasks,
    deleteTask,
    isLoading,
  }), [
    tasks,
    filteredTasks,
    activeFilter,
    toggleTaskComplete,
    updateTask,
    addTask,
    projectTasks,
    deleteTask,
  ]);
  return (
    <TasksContext.Provider
      value={
        contextValue
      }
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