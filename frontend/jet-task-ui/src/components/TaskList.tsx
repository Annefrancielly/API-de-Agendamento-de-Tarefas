import React from 'react';
import { Task } from '../types';

interface TaskListProps {
  tasks: Task[];
}

export function TaskList({ tasks }: TaskListProps) {
  if (tasks.length === 0) {
    return <p className="text-center text-gray-500 mt-8">Nenhuma tarefa agendada.</p>;
  }
  return (
    <div className="space-y-6">
      {tasks.map(task => (
        <div
          key={task.id}
          className="bg-white p-5 rounded-lg shadow hover:shadow-lg transition"
        >
          <h3 className="text-xl font-semibold text-gray-800">{task.title}</h3>
          {task.description && <p className="mt-2 text-gray-600">{task.description}</p>}
          <p className="mt-3 text-sm text-gray-500">Agendado para: {new Date(task.executeAt).toLocaleString()}</p>
        </div>
      ))}
    </div>
  );
}
