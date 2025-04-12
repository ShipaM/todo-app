import { useEffect, useState } from "react";
import "./App.css";
import { TodoItem } from "./components/TodoItem";
import { Todo } from "./types";
import { AddTodo } from "./components/AddTodo";
import { ToggleTheme } from "./components/ToggleTheme";
import { getInitialTheme } from "./helpers/getInitialTheme";
import { toggleTheme } from "./helpers/toggleTheme";
import { API_URL, LOCAL_STORAGE_KEY } from "./constants";

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [theme, setTheme] = useState<"light" | "dark" | string>(
    getInitialTheme
  );

  useEffect(() => {
    const loadInitialDate = async () => {
      const savedTodos = JSON.parse(
        localStorage.getItem(LOCAL_STORAGE_KEY) || "[]"
      );

      setTodos(savedTodos);

      try {
        const response = await fetch(API_URL);
        if (response.ok) {
          const fetchedTodos = await response.json();
          setTodos(fetchedTodos);
          localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(fetchedTodos));
        }
      } catch (error) {
        console.error("Error fetching todos:", error);
      }
    };
    loadInitialDate();
  }, []);

  const onAddTodo = async (text: string, deadline?: string): Promise<void> => {
    const newTodo: Todo = {
      id: `temp_${Date.now()}`, // Use the current timestamp as the ID.Date.now(),
      text,
      isCompleted: false,
      createdAt: new Date().toISOString(),
      deadline: deadline,
      order: todos.length + 1,
    };

    const updatedTodos = [...todos, newTodo].sort((a, b) => a.order - b.order);

    setTodos(updatedTodos);

    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedTodos));

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newTodo),
      });
      const createdTodo = await response.json();

      const syncedTodos = updatedTodos.map((todo) =>
        todo.id === createdTodo.id ? createdTodo : todo
      );
      setTodos(syncedTodos);
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(syncedTodos));
    } catch (error) {
      console.error("Error creating todo:", error);
      setTodos(todos);
    }
  };

  const onDelete = async (id: number | string): Promise<void> => {
    const previousTodos = todos;
    const updatedTodos = todos.filter((todo) => todo.id !== id);
    setTodos(updatedTodos);

    try {
      await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
      });
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedTodos));
    } catch (error) {
      console.error("Error deleting todo:", error);
      setTodos(previousTodos);
    }
  };

  const onToggleComplete = async (id: number): Promise<void> => {
    const todoToUpdate = todos.find((todo) => todo.id === id);

    if (!todoToUpdate) return;

    const updatedTodo = {
      ...todoToUpdate,
      isCompleted: !todoToUpdate.isCompleted,
    };

    const updatedTodos = todos.map((todo) =>
      todo.id === id ? updatedTodo : todo
    );

    setTodos(updatedTodos);

    try {
      await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedTodo),
      });
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedTodos));
    } catch (error) {
      console.error("Error updating todo:", error);
      setTodos(todos);
    }
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
            <TodoItem
              key={todo.id}
              todo={todo}
              onDelete={onDelete}
              onToggleComplete={onToggleComplete}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
