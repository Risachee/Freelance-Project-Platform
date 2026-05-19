import EditButton from '@/components/ui/EditButton';
import Field from '@/components/ui/Field';
import type { Project } from '@/types/project';
import { useEditableForm } from '@/hooks/useEditableForm';
import { useProjects } from '@/context/ProjectContext';
import StatusBadge from '@/components/ui/StatusBage';
import { Copy, RefreshCw } from 'lucide-react';
import { Button } from '@base-ui/react';
import { useGuestToken } from '@/hooks/useGuestToken';

const ProjectInfo = ({ project }: { project: Project },) => {
  const { updateProject } = useProjects();
  const {
    formData,
    isEditing,
    setIsEditing,
    handleChange,
    handleSave,
    handleReset,
  } = useEditableForm<Project>(updateProject, project);
  const { token, isCopied, copyToken } = useGuestToken(project.guestToken);

  return (
    <div className="rounded-2xl border border-slate-100 bg-slate-50 p-6 shadow-sm">
      <div className="flex flex-wrap items-start justify-center gap-2 my-3">
        <div className="flex-1">
          {isEditing ? (
            <Field
              editing
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full rounded-xl text-xl font-semibold text-black-900"
            />
          ) : (
            <h2 className="text-2xl font-semibold text-indigo-600">{project.title}</h2>
          )}
        </div>

        <div className="flex flex-col gap-2">
          {!isEditing ? (
            <EditButton onClick={() => setIsEditing(true)} />
          ) : (
            <div className="flex gap-2 mt-2">
              <button
                type="button"
                onClick={handleSave}
                className="rounded-full bg-emerald-50 px-3 py-2 text-xs font-medium text-emerald-700 hover:bg-emerald-100"
              >
                Сохранить
              </button>
              <button
                type="button"
                onClick={handleReset}
                className="rounded-full bg-slate-100 px-3 py-2 text-xs font-medium text-slate-600 hover:bg-slate-200"
              >
                Отмена
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="mt-7 grid grid-cols-1 gap-x-6 gap-y-3 sm:grid-cols-2">
        <Field
          label="Заказчик"
          editing={isEditing}
          name="client"
          value={formData.client}
          onChange={handleChange}
          placeholder="Имя клиента"
        />

        <Field
          label="Дедлайн"
          editing={isEditing}
          name="deadline"
          value={formData.deadline ?? ''}
          onChange={handleChange}
          type="date"
        />

        <Field
          label="Бюджет"
          editing={isEditing}
          name="budgetTotal"
          value={formData.budgetTotal}
          onChange={handleChange}
          type="number"
        />

        <Field
          label="Оплачено"
          editing={isEditing}
          name="budgetPaid"
          value={formData.budgetPaid}
          onChange={handleChange}
          type="number"
        />
      </div>

      <div className="mt-6">
        <Field
          label="Описание проекта"
          editing={isEditing}
          name="description"
          value={formData.description}
          onChange={handleChange}
          as="textarea"
        />
      </div>

      <div className="mt-4 mb-3 grid justify-end ">
        <p className="my-3 text-xs font-medium uppercase tracking-wide text-slate-500 text-right mr-3">
          Статус
        </p>
        <StatusBadge
          status={project.status}
          onStatusChange={(newStatus) => {
            updateProject({ ...project, status: newStatus });
          }}
        />
      </div>
      <div className="mt-6 rounded-xl border border-slate-200 bg-white p-4">
        <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
          Токен для заказчика
        </p>

        {!project.guestToken ? (
          <div className="mt-2">
            <button
              type="button"
              onClick={handleSave}
              className="flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700"
            >
              <RefreshCw size={16} />
              Создать токен
            </button>
            <p className="mt-2 text-xs text-slate-500">
              После создания токен можно будет отправить заказчику для просмотра статуса проекта.
            </p>
          </div>
        ) : (
          <div className="mt-2 flex items-center justify-between gap-3">
            <code className="rounded-lg bg-slate-50 px-3 py-2 text-sm font-mono text-indigo-700">
              {token}
            </code>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={copyToken}
                className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 hover:bg-slate-50"
                title="Копировать"
              >
                <Copy size={16} />
              </button>
              <button
                type="button"
                onClick={handleSave}
                className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 hover:bg-slate-50"
                title="Обновить токен"
              >
                <RefreshCw size={16} />
              </button>
            </div>
          </div>
        )}

        {isCopied && (
          <p className="mt-2 text-xs text-emerald-600">
            Токен скопирован в буфер обмена
          </p>
        )}
      </div>
    </div>
  );
};

export default ProjectInfo;