import { useState } from 'react'
import { Plus } from 'lucide-react'
import InputType from '@/components/ui/InputType'
import AddButton from '../../ui/AddButton'
import BackButton from '../../ui/BackButton'
import InputSelect from '@/components/ui/InputSelect'
import InputTextarea from '@/components/ui/InputTextarea'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { useClients } from '@/context/ClientsContext'

export default function AddProjectDialog() {
  const { clients } = useClients();
  const [open, setOpen] = useState(false)

  return (
    <>
      <AddButton icon={<Plus size={18} />} onClick={() => setOpen(true)}>
        Новый проект
      </AddButton>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-[600px] rounded-3xl p-9">
          <DialogHeader>
            <DialogTitle>Создание проекта</DialogTitle>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            <InputType
              id="project-name"
              textLabel="Название"
              placeholder="Например: Сайт для салона красоты"
            />

            <InputTextarea
              id="project-description"
              textLabel="Описание"
              placeholder="Кратко опишите задачу"
            />

            <InputSelect
              id='project-client'
              textLabel='Заказчик'
              items={clients.map((client)=> client.name)}
            />
            
            <InputType
              id="project-deadline"
              textLabel="Дедлайн"
              type="date"
            />

            <InputType
              id="project-budget"
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