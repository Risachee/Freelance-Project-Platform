import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import type { Project } from '@/types/project';
import { useClients } from './ClientsContext';
import { projectService } from '@/api/projectService';

export type ProjectWithClientName = Project & { clientName: string };

type ProjectsContextType = {
  projects: ProjectWithClientName[];
  filteredProjects: ProjectWithClientName[];
  activeFilter: string;
  setActiveFilter: (value: string) => void;
  search: string;
  setSearch: (value: string) => void;

  addProject: (newProject: Project) => void;
  updateProject: (updatedProject: Project) => void;

  getProjectById: (id: number) => ProjectWithClientName | undefined;
};

const ProjectsContext = createContext<ProjectsContextType | undefined>(undefined);

export const ProjectProvider = ({ children }: { children: React.ReactNode }) => {
  const { clients } = useClients();
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    const token = localStorage.getItem('access_token');

    if (!token) {
      return;
    }

    const loadProjects = async () => {
      try {
        const data = await projectService.getAll();
        setProjects(data);
        console.log("Проекты получены", projects);
      } catch (error) {
        console.error('Ошибка при загрузке проектов с бэкенда:', error);
      } finally {
      }
    };

    loadProjects();
  }, []);

  const [activeFilter, setActiveFilter] = useState('Все');
  const [search, setSearch] = useState('');

  const projectsWithClients = useMemo<ProjectWithClientName[]>(() => {
    return projects.map((project) => {
      const client = clients.find((c) => c.id === project.client);
      return {
        ...project,
        clientName: client?.name ?? 'Неизвестный клиент',
      };
    });
  }, [projects, clients]);

  const filteredProjects = useMemo<ProjectWithClientName[]>(() => {
    return projectsWithClients.filter((project) => {
      const matchStatus =
        activeFilter === 'Все' || project.status === activeFilter;

      const matchSearch = project.title
        .toLowerCase()
        .includes(search.toLowerCase());

      return matchStatus && matchSearch;
    });
  }, [projectsWithClients, activeFilter, search]);

  const getProjectById = (id: number) => {
    return projectsWithClients.find((p) => p.id === id);
  };

  const addProject = (newProject: Project) => {
    setProjects((prev) => [...prev, newProject]);
    console.log('Project added:', newProject);
  };

  const updateProject = (updatedProject: Project) => {

    console.log('Project updated:', updatedProject);
  };

  return (
    <ProjectsContext.Provider
      value={{
        projects: projectsWithClients,
        filteredProjects,
        activeFilter,
        setActiveFilter,
        search,
        setSearch,
        addProject,
        updateProject,
        getProjectById,
      }}
    >
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