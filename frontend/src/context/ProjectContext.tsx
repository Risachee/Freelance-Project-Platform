import React, { createContext, useContext, useEffect, useMemo, useState, useCallback } from 'react';
import { type Project } from '@/types/project';
import { useClients } from './ClientsContext';
import { useAuth } from './AuthContext';
import { projectService } from '@/api/projectService';
import { useNavigate } from 'react-router-dom';

export type ProjectWithClientName = Project & { clientName: string };

type ProjectsContextType = {
  projects: ProjectWithClientName[];
  filteredProjects: ProjectWithClientName[];
  activeFilter: string;
  setActiveFilter: (value: string) => void;
  search: string;
  setSearch: (value: string) => void;
  addProject: (newProject: Omit<Project, 'id' | 'created_at'>) => Promise<void>;
  updateProject: (updatedProject: Project) => Promise<void>;
  getProjectById: (id: number) => ProjectWithClientName | undefined;
  deleteProject: (projectToDelete: Project) => Promise<void>;
  isLoading: boolean;
};

const ProjectsContext = createContext<ProjectsContextType | undefined>(undefined);

export const ProjectProvider = ({ children }: { children: React.ReactNode }) => {
  const { clients, } = useClients();
  const { isAuthenticated } = useAuth();
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState('Все');
  const [search, setSearch] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      setIsLoading(false);
      setProjects([]);
      return;
    }

    const loadProjects = async () => {
      try {
        setIsLoading(true);
        const data = await projectService.getAll();
        setProjects(data);
        console.log("Проекты получены", data.length);
      } catch (error) {
        console.error('Ошибка при загрузке проектов:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadProjects();
  }, [isAuthenticated]);

  const projectsWithClients = useMemo<ProjectWithClientName[]>(() => {
    if (projects.length === 0) {
      return [];
    }

    return projects.map((project) => {
      return {
        ...project,
        clientName: project.client?.name ?? 'Неизвестный клиент',
      };
    });
  }, [projects, clients]);


  const filteredProjects = useMemo<ProjectWithClientName[]>(() => {
    return projectsWithClients.filter((project) => {
      const matchStatus = activeFilter === 'Все' || project.status === activeFilter;
      const matchSearch = project.title.toLowerCase().includes(search.toLowerCase());
      return matchStatus && matchSearch;
    });
  }, [projectsWithClients, activeFilter, search]);

  const getProjectById = useCallback((id: number) => {
    return projectsWithClients.find((p) => p.id === id);
  }, [projectsWithClients]);

  const addProject = useCallback(async (newProject: Omit<Project, 'id' | 'created_at'>) => {
    try {
      const created = await projectService.create(newProject);
      setProjects((prev) => [...prev, created]);
      console.log('Проект создан:', created);
    } catch (error) {
      console.error('Ошибка при создании проекта:', error);
      throw error;
    }
  }, []);

  const updateProject = useCallback(async (updatedProject: Project) => {
    try {
      const { id, ...data } = updatedProject;
      const refreshed = await projectService.update(id, data);

      setProjects((prev) =>
        prev.map((p) => (p.id === id ? refreshed : p))
      );
    } catch (error) {
      console.error('Ошибка при обновлении проекта:', error);
      throw error;
    }
  }, []);

  const deleteProject = useCallback(async (projectToDelete: Project) => {
    try {
      await projectService.delete(projectToDelete.id);

      setProjects((prev) => prev.filter((p) => p.id !== projectToDelete.id));
      console.log('Проект удалён:', projectToDelete);

      navigate('/projects');
    } catch (error) {
      console.error(' Ошибка при удалении проекта:', error);
      throw error;
    }
  }, []);

  const contextValue = useMemo(() => ({
    projects: projectsWithClients,
    filteredProjects,
    activeFilter,
    setActiveFilter,
    search,
    setSearch,
    addProject,
    updateProject,
    getProjectById,
    deleteProject,
    isLoading,
  }), [
    projectsWithClients,
    filteredProjects,
    activeFilter,
    search,
    addProject,
    updateProject,
    getProjectById,
    isLoading,
  ]);

  return (
    <ProjectsContext.Provider value={contextValue}>
      {children}
    </ProjectsContext.Provider>
  );
};

export const useProjects = () => {
  const context = useContext(ProjectsContext);
  if (!context) {
    throw new Error('useProjects must be used within ProjectsProvider');
  }
  return context;
};