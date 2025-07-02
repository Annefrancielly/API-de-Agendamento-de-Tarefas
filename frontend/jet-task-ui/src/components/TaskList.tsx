import React from "react";
import { Task } from "../types";

interface TaskListProps {
  tasks: Task[];
}

export function TaskList({ tasks }: TaskListProps) {
  if (tasks.length === 0) {
    return (
      <p className="text-center text-gray-500 mt-8">
        Nenhuma tarefa agendada.
      </p>
    );
  }
  return (
    <div className="space-y-6">
      {tasks.map((task) => (
        <div
          key={task.id}
          className="bg-white/90 rounded-2xl shadow-lg p-5 transition hover:scale-[1.02] hover:shadow-2xl duration-200"
        >
          <div className="flex flex-col md:flex-row justify-between items-center mb-2">
            <h3 className="text-lg font-bold text-indigo-700">{task.title}</h3>
            <span className="text-xs text-gray-400 ml-2">
              {new Date(task.executeAt).toLocaleString()}
            </span>
          </div>
          {task.description && (
            <p className="text-gray-700 mb-1">{task.description}</p>
          )}
          <span className="block text-xs text-gray-400 break-all">
            Webhook: {task.webhookUrl}
          </span>
        </div>
      ))}
    </div>
  );
}
