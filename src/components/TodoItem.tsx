import React from "react";
import { Todo } from "../types";

type TodoItemProps = {
  todo: Todo;
  onDelete: (id: number | string) => void;
  onToggleComplete: (id: number) => void;
};

export const TodoItem: React.FC<TodoItemProps> = ({
  todo,
  onDelete,
  onToggleComplete,
}) => {
  const handleComplete = () => {
    onToggleComplete(todo.id);
  };
  return (
    <div
      className="group flex items-center 
    justify-between p-4 gap-3 bg-white dark:bg-page-dark rounded-lg h-12 shadow-sm hover:shadow-md transition-shadow duration-300 border border-gray-100"
    >
      <div className="flex items-center gap-3">
        <button
          onClick={handleComplete}
          className={`p-1 rounded-full border-2 cursor-pointer ${
            todo.isCompleted
              ? "border-green-500 bg-green-500"
              : "border-gray-300 hover:border-gray-400"
          } transition-colors duration-300`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className={`h-4 w-4 ${
              todo.isCompleted ? "text-white" : "text-transparent"
            }`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
        </button>
        <span
          className={`text-1 ${
            todo.isCompleted
              ? "line-through text-gray-400"
              : "text-gray-700 dark:text-gray-300"
          }`}
        >
          {todo.text}
        </span>
        <div className="flex flex-col gap-1">
          <span className="text-xs text-gray-400 dark:text-gray-300">
            Created:&nbsp;
            {new Date(todo.createdAt).toLocaleString("ru-Ru", {
              day: "numeric",
              month: "long",
              year: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            })}
          </span>
          {todo.deadline && (
            <span
              className={`text-xs ${
                todo.isCompleted
                  ? "text-gray-400"
                  : new Date(todo.deadline) < new Date()
                  ? "text-red-500"
                  : "text-gray-500 dark:text-gray-300"
              }`}
            >
              Dedline:&nbsp;
              {new Date(todo.deadline).toLocaleString("ru-Ru", {
                day: "numeric",
                month: "long",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              })}
            </span>
          )}
        </div>
      </div>
      <button
        onClick={() => onDelete(todo.id)}
        className="cursor-pointer opacity-0 group-hover:opacity-100 text-gray-400 hover:text-red-500 transition-all duration-300"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
          />
        </svg>
      </button>
    </div>
  );
};
