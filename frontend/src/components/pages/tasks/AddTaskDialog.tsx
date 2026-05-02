import { useState } from 'react'
import { Plus } from 'lucide-react'
import InputType from '@/components/ui/InputType'
import AddButton from '../../ui/AddButton'
import BackButton from '../../ui/BackButton'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import InputTextarea from '@/components/ui/InputTextarea'
import InputSelect from '@/components/ui/InputSelect'
import { useProjects } from '@/context/ProjectContext'

const taskPriorities = ['low', 'medium', 'high', 'urgent']

export default function AddTaskDialog() {
  const [open, setOpen] = useState(false)
  const { projects } = useProjects()

  return (
    <>
      <AddButton icon={<Plus size={18} />} onClick={() => setOpen(true)}>
        Новая задача
      </AddButton>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-[600px] rounded-3xl p-9">
          <DialogHeader>
            <DialogTitle>Добавление задачи</DialogTitle>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            <InputType
              id="task-tittle"
              textLabel="Название"
              placeholder="Придумать дизайн"
            />
            <InputTextarea
              id="task-description"
              textLabel="Описание"
              placeholder="Кратко опишите задачу"
            />

            <InputSelect
              id='task-client'
              textLabel='Проект'
              items={projects.map((project) => project.title)}
            />
            <InputSelect
              id='task-client'
              textLabel='Приоритет'
              items={taskPriorities}
            />
            <InputType
              id="task-deadline"
              textLabel="Дедлайн"
              type="date"
            />
            <InputType
              id="task-budget"
              textLabel="Общий бюджет"
              placeholder="150000"
              type="number"
            />
          </div>

          <div className="flex justify-end gap-3">
            <BackButton onClick={() => setOpen(false)}>
              Отмена
            </BackButton>
            <AddButton onClick={() => setOpen(false)}>
              Создать
            </AddButton>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}