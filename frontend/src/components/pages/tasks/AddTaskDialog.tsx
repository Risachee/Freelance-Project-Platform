import { useState } from 'react';
import { Plus, Type, AlignLeft, Calendar, } from 'lucide-react';
import Field from '@/components/ui/Field';
import SelectField from '@/components/ui/SelectField';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useProjects } from '@/context/ProjectContext';
import { useTasks } from '@/context/TasksContext';
import { useEditableForm } from '@/hooks/useEditableForm';
import { Button } from '@/components/ui/button';
import type { Task } from '@/types/task';

const taskPriorities = ['low', 'medium', 'high', 'urgent']

export default function AddTaskDialog() {
  const [open, setOpen] = useState(false);
  const { projects, getProjectById } = useProjects();
  const { addTask } = useTasks();

  const {
    formData,
    handleChange,
    handleSave,
    handleValueChange,
    handleReset,
  } = useEditableForm<Task>((data) => {
    console.log('Создаем задачу:', data);
    addTask(formData.project, data);
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
        Новая Задача
      </Button>

      <Dialog open={open} onOpenChange={(val) => !val && closeDialog()}>
        <DialogContent className="sm:max-w-[600px] rounded-3xl p-9">
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold">Добавление задачи</DialogTitle>
          </DialogHeader>

          <div className="grid gap-5 py-6">
            <Field
              label="Название задачи"
              name="title"
              placeholder="Например: Разработать макет главной"
              value={formData.title}
              onChange={handleChange}
              editing={true}
              icon={<Type size={16} className="text-slate-400" />}
            />

            <Field
              label="Описание"
              name="description"
              as="textarea"
              placeholder="Кратко опишите суть задачи..."
              value={formData.description}
              onChange={handleChange}
              editing={true}
              icon={<AlignLeft size={16} className="text-slate-400" />}
            />

            <SelectField
              label="Проект"
              value={getProjectById(formData.project)?.title ?? ''}
              onValueChange={(val) => {
                const project = projects.find(p => p.title === val);
                if (project) handleValueChange('project', project.id);
              }}
              items={projects.map((project) => ({
                value: project.title,
                label: project.title,
              }))}
            />
            <SelectField
              label="Приоритет"
              value={formData.priority}
              onValueChange={(val) => handleValueChange('priority', val)}
              items={taskPriorities.map((priorety) => ({
                value: priorety,
                label: priorety,
              }))}
            />
          </div>

          <div className="flex justify-end gap-3">
            <Button variant="secondary" onClick={closeDialog}>
              Отмена
            </Button>
            <Button variant="indigo" onClick={handleSave}>
              Создать задачу
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}

