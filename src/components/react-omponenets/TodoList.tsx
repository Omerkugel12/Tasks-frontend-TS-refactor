import { Input } from "../ui/input";
import { Button } from "../ui/button";
import TodoItem from "./TodoItem";
import { Task } from "@/pages/TasksPage";

interface PropsTypes {
  task: Task;
  editTodoInput: boolean | string;
  createNewTodoTitle: string;
  setEditTodoInput: React.Dispatch<React.SetStateAction<boolean | string>>;
  handleTodoChecked: (todoId: string) => Promise<void>;
  handleDeleteTodo: (todoId: string, taskId: string) => Promise<void>;
  handleUpdateTodo: (
    e: React.FormEvent<HTMLFormElement>,
    todoId: string,
    taskId: string
  ) => Promise<void>;
  handleCreateTodo: (
    e: React.FormEvent<HTMLFormElement>,
    taskId: string
  ) => Promise<void>;
  newTodoTitle: string;
  setCreateNewTodoTitle: React.Dispatch<React.SetStateAction<string>>;
  setNewTodoTitle: React.Dispatch<React.SetStateAction<string>>;
}

function TodoList({
  task,
  editTodoInput,
  createNewTodoTitle,
  setEditTodoInput,
  handleTodoChecked,
  handleDeleteTodo,
  handleUpdateTodo,
  handleCreateTodo,
  newTodoTitle,
  setCreateNewTodoTitle,
  setNewTodoTitle,
}: PropsTypes) {
  return (
    <div className="bg-secondary py-4 rounded-lg flex flex-col px-10 gap-4">
      {task.todoList.length > 0 ? (
        <ul className="flex flex-col space-y-4">
          {task.todoList.map((todo) => {
            return (
              <TodoItem
                key={todo._id}
                task={task}
                todo={todo}
                editTodoInput={editTodoInput}
                setEditTodoInput={setEditTodoInput}
                handleTodoChecked={handleTodoChecked}
                handleDeleteTodo={handleDeleteTodo}
                handleUpdateTodo={handleUpdateTodo}
                newTodoTitle={newTodoTitle}
                setNewTodoTitle={setNewTodoTitle}
              />
            );
          })}
        </ul>
      ) : (
        <p>No todos yet...</p>
      )}
      <form
        onSubmit={(e) => handleCreateTodo(e, task._id)}
        className="bg-secondary flex flex-col gap-2 p-3"
      >
        <h1 className="text-center font-bold">Add todo</h1>
        <Input
          type="text"
          value={createNewTodoTitle}
          onChange={(e) => setCreateNewTodoTitle(e.target.value)}
          placeholder="Enter new todo..."
        />
        <Button className={createNewTodoTitle ? "" : "read-only:opacity-50"}>
          Add
        </Button>
      </form>
    </div>
  );
}

export default TodoList;
