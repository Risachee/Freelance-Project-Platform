import { useState } from 'react';
import { Plus, Type, AlignLeft, Calendar, } from 'lucide-react';
import Field from '@/components/ui/Field';
import SelectField from '@/components/ui/SelectField';
import AddButton from '../../ui/AddButton';
import BackButton from '../../ui/BackButton';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useProjects } from '@/context/ProjectContext';

const taskPriorities = ['low', 'medium', 'high', 'urgent']


export default function AddTaskDialog() {
  const [open, setOpen] = useState(false);
  const { projects } = useProjects();

  const [form, setForm] = useState({
    title: '',
    description: '',
    projectId: '',
    priority: 'medium',
    deadline: '',
    budget: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name) => (value: string) => {
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleCreate = () => {
    console.log('Создана задача:', form);
    setOpen(false);
  };

  return (
    <>
      <AddButton icon={<Plus size={18} />} onClick={() => setOpen(true)}>
        Новая задача
      </AddButton>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-[600px] rounded-3xl p-9">
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold">Добавление задачи</DialogTitle>
          </DialogHeader>

          <div className="grid gap-5 py-6">
            <Field
              label="Название задачи"
              name="title"
              placeholder="Например: Разработать макет главной"
              value={form.title}
              onChange={handleInputChange}
              editing={true}
              icon={<Type size={16} className="text-slate-400" />}
            />

            <Field
              label="Описание"
              name="description"
              as="textarea"
              placeholder="Кратко опишите суть задачи..."
              value={form.description}
              onChange={handleInputChange}
              editing={true}
              icon={<AlignLeft size={16} className="text-slate-400" />}
            />

            <SelectField
              label="Проект"
              value={form.projectId}
              onValueChange={handleSelectChange('projectId')}
              items={projects.map((project) => ({
                value: project.title,
                label: project.title,
              }))}
            />
            <SelectField
              label="Приоритет"
              value={form.priority}
              onValueChange={handleSelectChange('priority')}
              items={taskPriorities.map((priorety) => ({
                value: priorety,
                label: priorety,
              }))}
            />

            <Field
              label="Дедлайн"
              name="deadline"
              type="date"
              value={form.deadline}
              onChange={handleInputChange}
              editing={true}
              icon={<Calendar size={16} className="text-slate-400" />}
            />
          </div>

          <div className="flex justify-end gap-3">
            <BackButton onClick={() => setOpen(false)}>
              Отмена
            </BackButton>
            <AddButton onClick={handleCreate}>
              Создать задачу
            </AddButton>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}