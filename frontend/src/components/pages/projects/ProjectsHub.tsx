import AddProjectDialog from './AddProjectDialog'
import SectionHeader from '../SectionHeader'
import Filtered from '@/components/ui/FilteredButton'
import ProjectList from './ProjectList'
import { useProjects } from '@/context/ProjectContext'
import { ClientProvider } from '@/context/ClientsContext';
import { statuses } from '@/types/project'

export default function ProjectsHub() {
  const { activeFilter, setActiveFilter, search, setSearch, filteredProjects } = useProjects();

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