import React, { createContext, useContext, useState } from 'react';
import type { Project } from '@/types/project';

type ProjectsContextType = {
  projects: Project[];
  filteredProjects: Project[];
  activeFilter: string;
  setActiveFilter: (value: string) => void;
  search: string;
  setSearch: (value: string) => void;
  addProject: (newProject: Project) => void
  updateProject: (updatedProject: Project) => void
  getProjectById: (id: number) => Project

};

const ProjectsContext = createContext<ProjectsContextType | undefined>(undefined);

const initialProjects: Project[] = [
  {
    id: 1,
    client: 'Алексей Морозов',
    title: 'Сайт для студии дизайна',
    description: 'Лендинг с формой заявки, портфолио и блоком услуг.',
    status: 'Обсуждение',
    budgetTotal: 180000,
    budgetPaid: 30000,
    deadline: '2026-05-10',
    isArchived: false,
    createdAt: '2026-04-01',
    updatedAt: '2026-04-12',
  },
  {
    id: 2,
    client: 'Илья Соколов',
    title: 'Личный кабинет клиента',
    description: 'Интерфейс для просмотра заказов и статуса работ.',
    status: 'В работе',
    budgetTotal: 240000,
    budgetPaid: 120000,
    deadline: '2026-05-18',
    isArchived: false,
    createdAt: '2026-04-03',
    updatedAt: '2026-04-20',
  },
  {
    id: 3,
    client: 'Илья Соколов',
    title: 'Редизайн корпоративного сайта',
    description: 'Обновление структуры страниц и визуального стиля.',
    status: 'На паузе',
    budgetTotal: 150000,
    budgetPaid: 50000,
    deadline: '2026-05-05',
    isArchived: false,
    createdAt: '2026-04-05',
    updatedAt: '2026-04-16',
  },
  {
    id: 4,
    client: 'ООО Ромашка',
    title: 'Сайт компании',
    description: 'Многостраничный корпоративный сайт с каталогом услуг.',
    status: 'Завершен',
    budgetTotal: 320000,
    budgetPaid: 320000,
    deadline: '2026-04-15',
    isArchived: false,
    createdAt: '2026-03-20',
    updatedAt: '2026-04-15',
  },
  {
    id: 5,
    client: 'Екатерина Лебедева',
    title: 'MVP сервиса бронирования',
    description: 'Прототип сервиса с выбором даты, времени и заявки.',
    status: 'В работе',
    budgetTotal: 400000,
    budgetPaid: 180000,
    deadline: '2026-06-01',
    isArchived: false,
    createdAt: '2026-04-08',
    updatedAt: '2026-04-22',
  },
  {
    id: 6,
    client: 'Дмитрий Орлов',
    title: 'Архивный проект для старого клиента',
    description: 'Поддержка завершённого проекта без активной работы.',
    status: 'Завершен',
    budgetTotal: 90000,
    budgetPaid: 90000,
    deadline: '2026-03-30',
    isArchived: true,
    createdAt: '2026-03-01',
    updatedAt: '2026-04-01',
  },
]

export const ProjectProvider = ({ children }: { children: React.ReactNode }) => {
  const [projects, setProjects] = useState<Project[]>(initialProjects)

  const [activeFilter, setActiveFilter] = useState('Все')
  const [search, setSearch] = useState('')
  const filteredProjects = projects.filter((project) => {
    const matchStatus =
      activeFilter === 'Все' || project.status === activeFilter

    const matchSearch = project.title
      .toLowerCase()
      .includes(search.toLowerCase())

    return matchStatus && matchSearch
  })


  const getProjectById = (id: number ) => {
    return projects.find(p => p.id === id);
  };

  const addProject = (newProject: Project) => {

    console.log('Project added:', newProject);
  };

  const updateProject = (updatedProject: Project) => {
    setProjects((prev) =>
      prev.map((p) => (p.id === updatedProject.id ? { ...updatedProject, updatedAt: new Date().toISOString().split('T')[0] } : p))
    );
    console.log('Project updated:', updatedProject);
  };

  return (
    <ProjectsContext.Provider
      value={{
        projects,
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