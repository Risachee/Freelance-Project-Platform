import { SquareCheckBig } from 'lucide-react';
import type { Task } from '@/types/task';
import TaskItem from '../tasks/TaskItem';

interface ProjectTasksProps {
    tasksproject: Task[]
}
const ProjectTasks: React.FC<ProjectTasksProps> = ({ tasksproject }) => (
    <div className="rounded-2xl border border-slate-100 bg-slate-50 p-4">
        <p className="mb-3 text-xs font-medium uppercase tracking-wide text-slate-500">
            Задачи
        </p>
        <div className="inline-flex items-center gap-2 rounded-full bg-indigo-50 px-3 py-1 text-sm font-medium text-indigo-700">
            <SquareCheckBig size={14} />
            Активных задач: {tasksproject.filter(t => t.status !== 'Завершенные').length}
        </div>

        <div className="mt-6 space-y-6">
            {tasksproject.map((task) => (
                <TaskItem key={task.id} task={task} />
            ))}
        </div>
    </div>
);


export default ProjectTasks;