import type { Task } from '@/types/task';
import React, { useState } from 'react';
import { Check } from 'lucide-react';
import PriorityIndicator from '@/components/ui/PriorityIndicator';
import { useTasks } from '@/context/TasksContext';
import { useProjects } from '@/context/ProjectContext';
import TaskEditModal from './TaskEditModal';

interface TaskItemProps {
  task: Task;
}

const TaskItem: React.FC<TaskItemProps> = ({ task }) => {
  const { updateTask, toggleTaskComplete } = useTasks();
  const { getProjectById } = useProjects();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const taskProject = getProjectById(task.project)?.title || 'Без проекта';

  return (
    <>
      <div
        onClick={() => setIsModalOpen(true)}
        className={`cursor-pointer group rounded-3xl border p-5 transition-all duration-300 ${task.completed
            ? 'border-emerald-200 bg-emerald-50/70 shadow-sm'
            : 'bg-white border-slate-200 hover:border-indigo-300 hover:shadow-lg'
          }`}
      >
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="min-w-0">
            <h3
              className={`text-lg font-semibold mb-1 transition-all ${task.completed
                  ? 'text-slate-500 line-through decoration-emerald-400'
                  : 'text-slate-900 group-hover:text-indigo-700'
                }`}
            >
              {task.title}
            </h3>
            <p className={`text-sm ${task.completed ? 'text-slate-400' : 'text-slate-600'}`}>
              {task.description}
            </p>
          </div>

          <div onClick={(e) => e.stopPropagation()}>
            <PriorityIndicator
              priority={task.priority}
              onPriorityChange={(newPriority) => {
                updateTask({ ...task, priority: newPriority });
              }}
            />
          </div>
        </div>

        <div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-4 text-xs text-slate-500">
          <div className='text-m'>
            <p>Проект: {taskProject}</p>
          </div>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              toggleTaskComplete(task.id);
            }}
            className={`group/status flex items-center gap-2 rounded-full px-3 py-2 text-xs font-medium transition-all ${task.completed
                ? 'bg-emerald-100 text-emerald-700 hover:bg-emerald-200'
                : 'bg-slate-100 text-slate-700 hover:bg-indigo-100 hover:text-indigo-700'
              }`}
          >
            <span
              className={`flex h-5 w-5 items-center justify-center rounded-full transition-all ${task.completed
                  ? 'bg-emerald-500 text-white'
                  : 'bg-white border border-slate-300 group-hover/status:border-indigo-400'
                }`}
            >
              {task.completed ? <Check size={13} /> : <span className="h-2 w-2 rounded-full bg-slate-400 group-hover/status:bg-indigo-500" />}
            </span>
            <span>{task.completed ? 'Вернуть' : 'Выполнить'}</span>
          </button>
        </div>
      </div>

      {isModalOpen && (
        <TaskEditModal
          task={task}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </>
  );
};

export default TaskItem;