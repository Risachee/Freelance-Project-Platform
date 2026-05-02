import AddProjectDialog from './AddProjectDialog'
import SectionHeader from '../SectionHeader'
import Filtered from '@/components/ui/FilteredButton'
import ProjectList from './ProjectList'
import { useProjects } from '@/context/ProjectContext'
import { ClientProvider } from '@/context/ClientsContext';

export default function ProjectsHub() {
  const { activeFilter, setActiveFilter, search, setSearch, filteredProjects } = useProjects();

  const statuses = ['Все', 'Обсуждение', 'В работе', 'На паузе', 'Завершен']

  return (
    <div>
      <SectionHeader
        title="Проекты"
        searchPlaceholder="Поиск проектов..."
        search={search}
        setSearch={setSearch}
        action={
        <ClientProvider>
          <AddProjectDialog />
        </ClientProvider>
        }/>

      <Filtered
        filteredType={statuses}
        activeFilter={activeFilter}
        setActiveFilter={setActiveFilter}
      />
      <ProjectList filteredProjects={filteredProjects} />
    </div>
  )
}