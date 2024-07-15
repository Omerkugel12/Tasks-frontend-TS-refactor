import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import api from "@/services/api.service";
import { X } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
// import { Todo } from "./TasksPage";

function CreateTaskPage() {
  const navigate = useNavigate();

  interface TodowithoutId {
    title: string;
    isComplete: boolean;
  }

  async function handleCreateTask(ev: React.FormEvent<HTMLFormElement>) {
    ev.preventDefault();
    const formData = new FormData(ev.currentTarget);
    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const body = formData.get("body") as string;
    const todosString = formData.get("todos") as string;
    const todoTitles = todosString.split(", ").map((todo) => todo.trim());
    const todoList: TodowithoutId[] = todoTitles.map((title) => ({
      title,
      isComplete: false,
    }));
    const data = { title, description, body, todoList };

    try {
      await api.post("/task", data);

      navigate("/tasks");
    } catch (error) {
      console.log(error);
    }
    try {
      const newActivity = {
        operation: "CREATE",
        description: `${data.title} created`,
      };
      await api.post("/activity", newActivity);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <div className="fixed top-0 bottom-0 right-0 left-0 bg-slate-700 opacity-80"></div>
      <div className="fixed top-1/2 -translate-y-1/2 left-1/2 transform -translate-x-1/2 z-50 flex flex-col border border-ring p-10 sm:w-96  bg-secondary rounded-lg shadow-2xl space-y-4 min-w-72">
        <Link className="fixed top-2 left-2" to={"/tasks"}>
          <X color="#ff0000" />
        </Link>
        <h1 className="text-center text-3xl font-extrabold ">
          Create new task
        </h1>
        <form
          onSubmit={(ev) => handleCreateTask(ev)}
          className="flex flex-col space-y-4"
        >
          <div>
            <Label htmlFor="title">Task title:</Label>
            <Input
              id="title"
              name="title"
              type="text"
              placeholder="Enter task title..."
            />
          </div>
          <div>
            <Label htmlFor="description">Task description:</Label>
            <Input
              id="description"
              name="description"
              type="text"
              placeholder="Enter task description..."
            />
          </div>
          <div>
            <Label htmlFor="body">Task body:</Label>
            <Input
              id="body"
              name="body"
              type="text"
              placeholder="Enter task body..."
            />
          </div>
          <div>
            <Label htmlFor="todos">Task todos:</Label>
            <Input
              id="todos"
              name="todos"
              type="text"
              placeholder="Enter task todos..."
            />
          </div>
          <Button>Create</Button>
        </form>
      </div>
    </>
  );
}

export default CreateTaskPage;
