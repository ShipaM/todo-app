import { useState } from "react";
import "./App.css";
import { TodoItem } from "./components/TodoItem";
import { Todo } from "./types";
import { AddTodo } from "./components/AddTodo";
import { ToggleTheme } from "./components/ToggleTheme";
import { getInitialTheme } from "./helpers/getInitialTheme";
import { toggleTheme } from "./helpers/toggleTheme";

function App() {
  const initialTodos: Todo[] = [
    {
      id: 1,
      text: "Study React",
    },
    {
      id: 2,
      text: "Create Todo App",
    },
    {
      id: 3,
      text: "Create deploy",
    },
  ];

  const [todos, setTodos] = useState<Todo[]>(initialTodos);
  const [theme, setTheme] = useState<"light" | "dark" | string>(
    getInitialTheme
  );

  const onAddTodo = (text: string): void => {
    setTodos([...todos, { id: Date.now(), text }]);
  };

  const onDelete = (id: number | string): void => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  return (
    <div
      data-theme={theme}
      className="flex flex-col min-h-screen justify-center items-center bg-page-light dark:bg-page-dark p-6"
    >
      <ToggleTheme toggleTheme={() => toggleTheme(setTheme)} theme={theme} />
      <div className="mx-auto flex flex-col gap-3">
        <h1 className="text-4xl font-bold text-center text-gray-800 dark:text-white mb-8">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500">
            My Todo App
          </span>
        </h1>
        <AddTodo onAddTodo={onAddTodo} />
        <div className="flex flex-col gap-3">
          {todos.map((todo) => (
            <TodoItem key={todo.id} todo={todo} onDelete={onDelete} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
