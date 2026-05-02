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

export default function AddClientDialog() {
  const [open, setOpen] = useState(false)

  return (
    <>
      <AddButton icon={<Plus size={18} />} onClick={() => setOpen(true)}>
        Новый клиент
      </AddButton>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-[600px] rounded-3xl p-9">
          <DialogHeader>
            <DialogTitle>Добавление клиента</DialogTitle>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            <InputType
              id="client-name"
              textLabel="Фамилия Имя"
              placeholder="Иванова Анна"
            />
            <InputType
              id="client-phone"
              textLabel="Номер телефона"
              placeholder="+7(999)123-45-67"
              pattern="^\+\d{1,3}\s\d{1,4}-\d{1,4}-\d{4}$"
            />
            <InputType
              id="client-email"
              textLabel="E-mail"
              type='email'
              placeholder="index@mail.ru"
            />
            <InputType
              id="client-telegram"
              textLabel="Telegram"
              placeholder="@name"
            />
            <InputType
              id="client-note"
              textLabel="Заметка"
              placeholder="Предпочитает короткие созвоны по будням."
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