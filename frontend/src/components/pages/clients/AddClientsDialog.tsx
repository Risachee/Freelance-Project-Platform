import { useState } from 'react';
import { Plus, User, Phone, Mail, Send, MessageSquare } from 'lucide-react';
import Field from '@/components/ui/Field';

import { useEditableForm } from '@/hooks/useEditableForm';
import { useClients } from '@/context/ClientsContext';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import type { Client } from '@/types/client';

export default function AddClientDialog() {
  const [open, setOpen] = useState(false);
  const { addClient } = useClients();

  const {
    formData,
    handleChange,
    handleSave,
    handleReset
  } = useEditableForm<Client>((data) => {
    console.log('Создаем клиента:', data);
    addClient(data);
    setOpen(false);
    handleReset();
  });

  const closeDialog = () => {
    setOpen(false);
    handleReset();
  };

  return (
    <>
      <Button variant='indigo' onClick={() => setOpen(true)}>
        <Plus size={18} />
        Новый клиент
      </Button>

      <Dialog open={open} onOpenChange={(val) => !val && closeDialog()}>
        <DialogContent className="sm:max-w-[600px] rounded-3xl p-9">
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold">Добавление клиента</DialogTitle>
          </DialogHeader>

          <div className="grid gap-5 py-6">
            <Field
              label="Фамилия Имя"
              name="name"
              placeholder="Иванова Анна"
              value={formData.name}
              onChange={handleChange}
              editing={true}
              icon={<User size={16} className="text-slate-400" />}
            />

            <div className="grid grid-cols-2 gap-4">
              <Field
                label="Номер телефона"
                name="phone"
                type="tel"
                value={formData.phone}
                onChange={handleChange}
                editing={true}
                icon={<Phone size={16} className="text-slate-400" />}
              />
              <Field
                label="E-mail"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                editing={true}
                icon={<Mail size={16} className="text-slate-400" />}
              />
            </div>

            <Field
              label="Telegram"
              name="telegram"
              value={formData.telegram}
              onChange={handleChange}
              editing={true}
              icon={<Send size={16} className="text-slate-400" />}
            />

            <Field
              label="Комментарий"
              name="note"
              as="textarea"
              value={formData.note}
              onChange={handleChange}
              editing={true}
              icon={<MessageSquare size={16} className="text-slate-400" />}
            />
          </div>

          <div className="flex justify-end gap-3 mt-4">
            <Button variant="secondary" onClick={closeDialog}>
              Отмена
            </Button>
            <Button variant="indigo" onClick={handleSave}>
              Создать проект
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}