import AddTaskDialog from './AddTaskDialog'
import SectionHeader from '../SectionHeader'
import Filtered from '@/components/ui/Filtered'
import TaskList from './TaskList'
import { useTasks } from '@/context/TasksContext';
import { useState } from 'react';
import { ProjectProvider } from '@/context/ProjectContext';
import { TasksProvider } from '@/context/TasksContext';

export default function TasksHub() {
  const { filteredTasks, activeFilter, setActiveFilter } = useTasks();
  const [search, setSearch] = useState('')
  const statuses = ['Все', 'Активные', 'Приостановленные', 'Завершенные']
  return (
    <div>
      <SectionHeader
        title="Задачи"
        searchPlaceholder="Поиск задачи..."
        search={search}
        setSearch={setSearch}
        action={
          <ProjectProvider>
            <TasksProvider>
              <AddTaskDialog />
            </TasksProvider>
          </ProjectProvider>
        }
      />
      <Filtered
        filteredType={statuses}
        activeFilter={activeFilter}
        setActiveFilter={setActiveFilter}
        className="justify-center"
      />
      <TaskList filteredTasks={filteredTasks} />
    </div>
  )
}