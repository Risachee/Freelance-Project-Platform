import { useState } from 'react';
import { Plus, Folder, AlignLeft, Calendar, CircleDollarSign } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useProjects } from '@/context/ProjectContext';
import { useClients } from '@/context/ClientsContext';
import { useEditableForm } from '@/hooks/useEditableForm';
import Field from '@/components/ui/Field';
import SelectField from '@/components/ui/SelectField';
import type { Project } from '@/types/project';
import { Button } from '@/components/ui/button';

export default function AddProjectDialog() {
  const { clients } = useClients();
  const { addProject } = useProjects();
  const [open, setOpen] = useState(false);

  const {
    formData,
    setFormData,
    handleChange,
    handleSave,
    handleReset,
  } = useEditableForm<Project>((data) => {
    addProject(data);
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
        Новый проект
      </Button>

      <Dialog open={open} onOpenChange={(val) => !val && closeDialog()}>
        <DialogContent className="sm:max-w-[600px] rounded-3xl p-9">
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold">Создание проекта</DialogTitle>
          </DialogHeader>

          <div className="grid gap-5 py-6">
            <Field
              label="Название проекта"
              editing
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Например: Сайт для салона красоты"
              icon={<Folder size={16} className="text-slate-400" />}
            />

            <Field
              label="Описание"
              editing
              name="description"
              value={formData.description}
              onChange={handleChange}
              as="textarea"
              placeholder="Кратко опишите задачу и ключевые требования"
              icon={<AlignLeft size={16} className="text-slate-400" />}
            />

            <SelectField
              label="Заказчик"
              value={formData.clientName ?? ''}
              onValueChange={(selectedId) => {
                const id = Number(selectedId);
                const client = clients.find(c => c.id === id);

                setFormData(prev => ({
                  ...prev,
                  client_id: client ? client.id : null,
                  clientName: client ? client.name : '',
                }));
              }}
              placeholder="Выберите клиента из списка"
              items={clients.map((c) => ({
                value: c.id.toString(),
                label: c.name,
              }))}
            />

            <div className="grid grid-cols-2 gap-4">
              <Field
                label="Дедлайн"
                editing
                name="deadline"
                value={formData.deadline}
                onChange={handleChange}
                type="date"
                icon={<Calendar size={16} className="text-slate-400" />}
              />

              <Field
                label="Общий бюджет (₽)"
                editing
                name="budget"
                value={formData.budget ?? ''}
                onChange={handleChange}
                type="number"
                placeholder="150000"
                icon={<CircleDollarSign size={16} className="text-slate-400" />}
              />
            </div>
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