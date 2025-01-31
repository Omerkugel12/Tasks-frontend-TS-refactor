import TodoList from "@/components/react-omponenets/TodoList";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import api from "@/services/api.service";
import { Pencil, Pin, PinOff, Trash2, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { Link } from "react-router-dom";
import { Task } from "./TasksPage";

function TaskDetailsPage() {
  const [task, setTask] = useState<Task | null>(null);
  const { taskId } = useParams();
  const navigate = useNavigate();
  const [editTodoInput, setEditTodoInput] = useState<boolean | string>(false);
  const [newTodoTitle, setNewTodoTitle] = useState<string>("");
  const [createNewTodoTitle, setCreateNewTodoTitle] = useState<string>("");
  const [editTaskInputs, setEditTaskInputs] = useState<boolean>(false);

  useEffect(() => {
    async function fetchTask() {
      try {
        const { data: taskFetched } = await api.get(`task/${taskId}`);
        setTask(taskFetched);
      } catch (error) {
        console.log(error);
      }
    }
    fetchTask();
  }, []);

  if (!task) {
    return null;
  }

  async function handleEditTask(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const newTitle = formData.get("title");
    const newDescription = formData.get("description");
    const newBody = formData.get("body");

    try {
      const { data: updatedTask } = await api.patch(`task/${taskId}`, {
        title: newTitle === "" ? task?.title : newTitle,
        description: newDescription === "" ? task?.description : newDescription,
        body: newBody === "" ? task?.body : newBody,
      });
      setTask(updatedTask);
      setEditTaskInputs(false);
    } catch (error) {
      console.log(error);
    }

    try {
      const newActivity = {
        operation: "PATCH",
        description: `${task?.title} updated`,
      };
      await api.post("/activity", newActivity);
    } catch (error) {
      console.log(error);
    }
  }

  async function handleDelete() {
    try {
      await api.delete(`task/${taskId}`);
      navigate("/tasks");
    } catch (error) {
      console.log(error);
    }

    try {
      await api.post("/archive", task);
    } catch (error) {
      console.log(error);
    }

    try {
      const newActivity = {
        operation: "DELETE",
        description: `${task?.title} deleted`,
      };
      await api.post("/activity", newActivity);
    } catch (error) {
      console.log(error);
    }
  }

  async function handlePinnedChange(taskId: string) {
    try {
      const res = await api.patch(`task/${taskId}`, {
        isPinned: !task?.isPinned,
      });
      const updatedTask = res.data;
      setTask(updatedTask);
    } catch (error) {
      console.log(error);
    }
    try {
      const newActivity = task?.isPinned
        ? {
            operation: "Pin removed",
            description: `${task.title} pinned removed`,
          }
        : {
            operation: "Pin",
            description: `${task?.title} - pinned`,
          };
      await api.post("/activity", newActivity);
    } catch (error) {
      console.log(error);
    }
  }

  async function handleTodoChecked(todoId: string) {
    const todo = task?.todoList.find((todo) => todo._id === todoId);
    try {
      const updatedTodoList = task?.todoList.map((todo) =>
        todo._id === todoId ? { ...todo, isComplete: !todo.isComplete } : todo
      );

      const res = await api.patch(`task/${task?._id}`, {
        todoList: updatedTodoList,
      });

      const updatedTask = res.data;
      setTask(updatedTask);
    } catch (error) {
      console.log(error);
    }
    try {
      const newActivity = todo?.isComplete
        ? {
            operation: "UNCHECKED",
            description: `Task: ${task?.title} - ${todo.title} unchecked`,
          }
        : {
            operation: "CHECKED",
            description: `Task: ${task?.title} - ${todo?.title} checked`,
          };

      await api.post("/activity", newActivity);
    } catch (error) {
      console.log(error);
    }
  }

  async function handleDeleteTodo(todoId: string, taskId: string) {
    const todo = task?.todoList.find((todo) => todo._id === todoId);
    try {
      const updatedTodoList = task?.todoList.filter(
        (todo) => todo._id !== todoId
      );
      const res = await api.patch(`task/${taskId}`, {
        todoList: updatedTodoList,
      });
      const updatedTask = res.data;
      setTask(updatedTask);
    } catch (error) {
      console.log(error);
    }
    try {
      const newActivity = {
        operation: "DELETE",
        description: `Task: ${task?.title} - ${todo?.title} deleted`,
      };
      await api.post("/activity", newActivity);
    } catch (error) {
      console.log(error);
    }
  }

  async function handleUpdateTodo(
    e: React.FormEvent<HTMLFormElement>,
    todoId: string,
    taskId: string
  ) {
    const todo = task?.todoList.find((todo) => todo._id === todoId);
    e.preventDefault();

    try {
      const updatedTodoList = task?.todoList.map((todo) =>
        todo._id === todoId
          ? {
              ...todo,
              isComplete: false,
              title: newTodoTitle ? newTodoTitle : todo.title,
            }
          : todo
      );

      const res = await api.patch(`task/${taskId}`, {
        todoList: updatedTodoList,
      });

      const updatedTask = res.data;
      setTask(updatedTask);
      setEditTodoInput(false);
      setNewTodoTitle("");
    } catch (error) {
      console.log(error);
    }
    try {
      const newActivity = {
        operation: "EDIT",
        description: `Task: ${task?.title} - ${todo?.title}'s title changed`,
      };
      await api.post("/activity", newActivity);
    } catch (error) {
      console.log(error);
    }
  }

  async function handleCreateTodo(
    e: React.FormEvent<HTMLFormElement>,
    taskId: string
  ) {
    e.preventDefault();
    const newTodo = { title: createNewTodoTitle, isComplete: false };
    try {
      const updatedTodoList = [...task!.todoList!, newTodo];

      const res = await api.patch(`task/${taskId}`, {
        todoList: updatedTodoList,
      });

      const updatedTask = res.data;
      setTask(updatedTask);
      setCreateNewTodoTitle("");
    } catch (error) {
      console.log(error);
    }
    try {
      const newActivity = {
        operation: "CREATE",
        description: `Task: ${task?.title} - ${newTodo.title} created`,
      };
      await api.post("/activity", newActivity);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <div className="fixed top-0 bottom-0 right-0 left-0 bg-slate-700 opacity-80"></div>
      <div
        className={
          "fixed top-1/2 -translate-y-1/2 left-1/2 transform -translate-x-1/2 z-10 flex flex-col border border-ring p-10 sm:w-[512px] min-w-64 bg-secondary rounded-lg shadow-2xl space-y-4 max-h-[70%] overflow-y-scroll"
        }
      >
        <Link className="fixed top-2 left-2" to={"/tasks"}>
          <X color="#ff0000" />
        </Link>
        <div className="space-y-8 pb-12">
          <form onSubmit={(e) => handleEditTask(e)}>
            {!editTaskInputs ? (
              <h1 className="text-2xl">{task.title}</h1>
            ) : (
              <div>
                <Label>Title</Label>
                <Input
                  type="text"
                  name="title"
                  placeholder="Enter new task title..."
                />
              </div>
            )}
            {!editTaskInputs ? (
              <p>
                <span className="font-bold">Description:</span>{" "}
                {task.description}
              </p>
            ) : (
              <div>
                <Label className="font-bold">Description:</Label>
                <Input
                  name="description"
                  type="text"
                  placeholder="Enter new task description..."
                />
              </div>
            )}
            {!editTaskInputs ? (
              <p>
                <span className="font-bold">Body:</span> {task.description}
              </p>
            ) : (
              <div>
                <Label className="font-bold">Body:</Label>
                <Input
                  type="text"
                  name="body"
                  placeholder="Enter new task body..."
                />
              </div>
            )}
            {editTaskInputs ? <Button>Apply</Button> : null}
          </form>
          <TodoList
            task={task}
            editTodoInput={editTodoInput}
            createNewTodoTitle={createNewTodoTitle}
            setEditTodoInput={setEditTodoInput}
            handleTodoChecked={handleTodoChecked}
            handleDeleteTodo={handleDeleteTodo}
            handleUpdateTodo={handleUpdateTodo}
            handleCreateTodo={handleCreateTodo}
            newTodoTitle={newTodoTitle}
            setCreateNewTodoTitle={setCreateNewTodoTitle}
            setNewTodoTitle={setNewTodoTitle}
          />
        </div>
        <div className="flex gap-4 absolute top-0 right-4">
          <Button
            onClick={handleDelete}
            variant="outline"
            className="text-destructive border border-destructive hover:bg-destructive/90"
          >
            <Trash2 className="text-destructive" />
          </Button>
          <Button
            variant="outline"
            className="text-destructive border border-primary hover:bg-primary/90"
            onClick={() => setEditTaskInputs(!editTaskInputs)}
          >
            <Pencil className="text-primary" />
          </Button>
          <div>
            <input
              id="pinned"
              className="hidden"
              type="checkbox"
              checked={task.isPinned}
              onChange={() => {
                handlePinnedChange(task._id);
              }}
            />
            {task.isPinned ? (
              <label htmlFor="pinned">
                <div>
                  <PinOff className="text-primary size-10 border border-primary rounded-sm px-1 py-1.5 hover:bg-primary/90 cursor-pointer" />
                </div>
              </label>
            ) : (
              <label htmlFor="pinned">
                <div className={""}>
                  <Pin className="text-primary size-10 border border-primary rounded-md px-1 py-1.5 hover:bg-primary/90 cursor-pointer" />
                </div>
              </label>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default TaskDetailsPage;
