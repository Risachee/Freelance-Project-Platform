import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import ProjectsHub from './components/pages/projects/ProjectsHub';
import ClientsHub from './components/pages/clients/ClientsHub';
import TasksHub from './components/pages/tasks/TasksHub';
import ClientCard from './components/pages/clients/ClientCard';
import { TasksProvider } from '@/context/TasksContext';
import { ProjectProvider } from '@/context/ProjectContext';
import { ClientProvider } from './context/ClientsContext';
import ProjectCard from './components/pages/projects/ProjectCard';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={
            <ProjectProvider>
              <ProjectsHub />
            </ProjectProvider>} />
          <Route path="/projects" element={
            <ProjectProvider>
              <ProjectsHub />
            </ProjectProvider>} />
          <Route path="/clients" element={
            <ClientProvider>
              <ClientsHub />
            </ClientProvider>} />
          <Route path="/tasks" element={
            <TasksProvider>
              <TasksHub />
            </TasksProvider>} />
          <Route
            path="/clients/:id"
            element={
              <ClientProvider>
                <ProjectProvider>
                  <ClientCard />
                </ProjectProvider>
              </ClientProvider>
            }
          />
          <Route
            path="/projects/:id"
            element={
              <ProjectProvider>
                <ProjectCard />
              </ProjectProvider>
            }
          />
      </Route>
    </Routes>
    </BrowserRouter >
  );
}

export default App;