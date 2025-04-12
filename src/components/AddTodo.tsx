import React, { useState } from "react";

type AddTodoProps = {
  onAddTodo: (text: string, deadline?: string) => void;
};
export const AddTodo: React.FC<AddTodoProps> = ({ onAddTodo }) => {
  const [text, setText] = useState<string>("");
  const [deadline, setDeadline] = useState<string>("");
  const [isShowDeadlineInput, setIsShowDeadlineInput] =
    useState<boolean>(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (text.trim()) {
      onAddTodo(text, deadline);
    }
    setText("");
    setDeadline("");
    setIsShowDeadlineInput(false);
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6">
      <div className="flex items-center bg-white rounded-lg shadow-sm overflow-hidden border border-gray-100 focus-within:ring-2 focus-within:ring-blue-500">
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Add a new todo..."
          className="flex-1 p-3 text-gray-700 dark:bg-page-dark dark:text-txt-dark outline-none placeholder-gray-400"
        />
        <button
          type="submit"
          className="p-3 bg-btn-light hover:bg-btn-light-hv text-white dark:bg-btn-dark hover:dark:bg-btn-dark-hv transition-colors duration-300 cursor-pointer"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 4v16m8-8H4"
            />
          </svg>
        </button>
      </div>
      {isShowDeadlineInput ? (
        <div className="flex items-center gap-2 text-gray-500 mt-4">
          <input
            className="p-2 border-blue-500 rounded flex-1"
            type="datetime-local"
            value={deadline}
            onChange={(event) => setDeadline(event.target.value)}
          />
          <button
            type="button"
            className="p-2 text-gray-500 hover:text-gray-700 cursor-pointer duration-300 transition-colors"
            onClick={() => {
              setDeadline("");
              setIsShowDeadlineInput(false);
            }}
          >
            Cancel
          </button>
        </div>
      ) : (
        <button
          type="button"
          className="mt-2 self-start text-sm text text-blue-500 hover:text-blue-700 cursor-pointer duration-300 transition-colors"
          onClick={() => {
            setIsShowDeadlineInput(true);
          }}
        >
          + Add deadline
        </button>
      )}
    </form>
  );
};
