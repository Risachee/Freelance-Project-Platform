import EditButton from '@/components/ui/EditButton';
import Field from '@/components/ui/Field';
import type { Project } from '@/types/project';
import { useEditableForm } from '@/hooks/useEditableForm';
import { useProjects } from '@/context/ProjectContext';



const ProjectInfo = ({project}:{project:Project}) => {
  const {updateProject} = useProjects();
  const {
    formData,
    isEditing,
    setIsEditing,
    handleChange,
    handleSave,
    handleReset,
  } = useEditableForm<Project>(project, updateProject);

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
    </div>
  );
};

export default ProjectInfo;