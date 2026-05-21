import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { ClientProvider } from './context/ClientsContext.tsx'
import { ProjectProvider } from './context/ProjectContext.tsx'
// import { AuthProvider } from './context/AuthContext.tsx'
import { TasksProvider } from './context/TasksContext.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <ClientProvider>
        <ProjectProvider>
          <TasksProvider>
            <App />
          </TasksProvider>
        </ProjectProvider>
      </ClientProvider>
  </StrictMode>,
)
