export type Todo = {
  id: number | string;
  text: string;
  isCompleted: boolean;
  createdAt: string;
  deadline?: string;
  order: number;
};
