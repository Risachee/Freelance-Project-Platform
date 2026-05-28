import React from 'react';
import type { Task } from '@/types/task';
import { useTasks } from '@/context/TasksContext';
import { useEditableForm } from '@/hooks/useEditableForm';
import Field from '@/components/ui/Field';
import { useDelete } from '@/hooks/useDelete';
interface TaskEditModalProps {
  task: Task;
  onClose: () => void;
}

const TaskEditModal: React.FC<TaskEditModalProps> = ({ task, onClose }) => {
  const { updateTask, deleteTask } = useTasks();

  const {
    formData,
    handleChange,
    error,
  } = useEditableForm<Task>(async (data) => {
    await updateTask(data);
    onClose();
  }, task);

  const { handleDelete } = useDelete(deleteTask, task, onClose);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="mb-4 text-xl font-bold text-slate-900">Редактирование задачи</h2>

        {error && <p className="mb-4 text-sm text-red-500">{error}</p>}

        <div className="space-y-4">
          <Field
            editing={true}
            label="Название задачи"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Введите название..."
          />

          <Field
            editing={true}
            as="textarea"
            label="Описание"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Опишите задачу..."
          />
        </div>

        <div className="mt-8 flex items-center justify-between">
          <button
            onClick={handleDelete}
            className="rounded-lg px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50"
          >
            Удалить задачу
          </button>

          <div className="flex gap-3">
            <button
              onClick={onClose}
              className="rounded-lg px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100"
            >
              Отмена
            </button>
            <button
              onClick={() => updateTask(formData).then(onClose)}
              className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700"
            >
              Сохранить
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskEditModal;