import React from 'react';
import TaskItem from './TaskItem';
import type { Task } from '@/types/task';

interface TaskListProps {
  filteredTasks: Task[];
}

const TaskList: React.FC<TaskListProps> = ({ filteredTasks, }) => {

  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {filteredTasks.map((task) => (
          <TaskItem key={task.id} task={task} />
        ))}
      </div>
    </>
  );
};

export default TaskList;