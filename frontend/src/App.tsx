import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import ProjectsHub from './components/pages/projects/ProjectsHub';
import ClientsHub from './components/pages/clients/ClientsHub';
import TasksHub from './components/pages/tasks/TasksHub';
import ClientCard from './components/pages/clients/ClientCard';
import ProjectCard from './components/pages/projects/ProjectCard';
import AuthScreen from './components/layout/AuthScreen';
import GuestScreen from './components/layout/GuestScreen';
import ProtectedRoute from './ProtectedRoute';
import { AuthProvider } from './context/AuthContext';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AuthProvider><AuthScreen /></AuthProvider>} />
        <Route path="/guest" element={<GuestScreen />} />
        <Route element={<AuthProvider><Layout /></AuthProvider>}>
          <Route path="/projects" element={
            <ProtectedRoute>
              <ProjectsHub />
            </ProtectedRoute>
          } />
          <Route path="/clients" element={
            // <ProtectedRoute>
              <ClientsHub />
            // {/* </ProtectedRoute> */}
          } />
          <Route path="/tasks" element={
            // <ProtectedRoute>
              <TasksHub />
            // {/* </ProtectedRoute> */}
          }/>
          <Route
            path="/clients/:id"
            element={
              // <ProtectedRoute>
                <ClientCard />
              // {/* </ProtectedRoute> */}
            }/>
          <Route
            path="/projects/:id"
            element={
              // <ProtectedRoute>
                <ProjectCard />
              // {/* </ProtectedRoute> */}
            }
          />
        </Route>
      </Routes>
    </BrowserRouter >
  );
}

export default App;