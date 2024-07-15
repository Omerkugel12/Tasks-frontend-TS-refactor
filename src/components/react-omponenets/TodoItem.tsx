import { Pencil, Trash2, Vote, X } from "lucide-react";
import { Input } from "../ui/input";
import { Task, Todo } from "@/pages/TasksPage";
import { Label } from "../ui/label";
import { Button } from "../ui/button";

interface PropsTypes {
  task: Task;
  todo: Todo;
  editTodoInput: boolean | string;
  setEditTodoInput: React.Dispatch<React.SetStateAction<boolean | string>>;
  handleTodoChecked: (todoId: string) => Promise<void>;
  handleDeleteTodo: (todoId: string, taskId: string) => Promise<void>;
  handleUpdateTodo: (
    e: React.FormEvent<HTMLFormElement>,
    todoId: string,
    taskId: string
  ) => Promise<void>;
  newTodoTitle: string;
  setNewTodoTitle: React.Dispatch<React.SetStateAction<string>>;
}

function TodoItem({
  task,
  todo,
  editTodoInput,
  setEditTodoInput,
  handleTodoChecked,
  handleDeleteTodo,
  handleUpdateTodo,
  newTodoTitle,
  setNewTodoTitle,
}: PropsTypes) {
  return (
    <li>
      {editTodoInput !== todo._id ? (
        <div className="flex justify-between w-100% bg-secondary p-1 rounded-lg px-4 border-b-2 border-primary">
          <div className="flex items-center justify-between">
            <input
              type="checkbox"
              checked={todo.isComplete}
              onChange={() => handleTodoChecked(todo._id)}
            />
            <Label
              className={todo.isComplete ? "line-through text-slate-500" : ""}
            >
              {todo.title}
            </Label>
          </div>
          <div className="flex">
            <Button
              onClick={() => handleDeleteTodo(todo._id, task._id)}
              variant="ghost"
              className="text-destructive transition-all hover:scale-110"
            >
              <Trash2 className="text-destructive " />
            </Button>
            <Button
              variant="ghost"
              className="text-primary transition-all  hover:scale-110"
              onClick={() => setEditTodoInput(todo._id)}
            >
              <Pencil className="text-primary" />
            </Button>
          </div>
        </div>
      ) : (
        <form
          onSubmit={(e) => handleUpdateTodo(e, todo._id, task._id)}
          className="flex items-center justify-between w-100% bg-secondary p-1 rounded-lg px-4 "
        >
          <Input
            className="w-[70%]"
            value={newTodoTitle}
            onChange={(e) => setNewTodoTitle(e.target.value)}
            type="text"
            placeholder="Enter new todo title..."
          />
          <div className="flex gap-2">
            <button type="submit" className="text-primary">
              <Vote size={20} className="text-primary" />
            </button>
            <button onClick={() => setEditTodoInput(false)}>
              <X color="#ff0000" className="size-5" />
            </button>
          </div>
        </form>
      )}
    </li>
  );
}

export default TodoItem;
