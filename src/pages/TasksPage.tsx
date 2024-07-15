import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import api from "@/services/api.service";
import { Grid3X3, LayoutGrid } from "lucide-react";
import { useEffect, useState } from "react";
import { Outlet } from "react-router";
import { Link } from "react-router-dom";
import TasksTable from "@/components/react-omponenets/TasksTable";
import TasksCards from "@/components/react-omponenets/TasksCards";
import TasksTableSkeleton from "@/components/react-omponenets/TableSkeleton";
import CardsSkeleton from "@/components/react-omponenets/CardsSkeleton";

export interface Todo {
  _id: string;
  title: string;
  isComplete: boolean;
}

export interface Task {
  _id: string;
  title: string;
  description: string;
  body: string;
  todoList: Todo[];
  isPinned: boolean;
  user: string;
}

type TasksStateType = Task[];

function TasksPage() {
  const { loggedInUser } = useAuth();
  const [loggedInUserTasks, setLoggedInUserTasks] = useState<TasksStateType>(
    []
  );
  const [display, setDisplay] = useState("cards");
  const [loading, setLoading] = useState(false);

  const pinnedTasks = loggedInUserTasks.filter((task) => task.isPinned);
  const otherTasks = loggedInUserTasks.filter((task) => !task.isPinned);

  useEffect(() => {
    setLoading(true);
    async function fetchLoggedInUserTasks() {
      try {
        const res = await api.get("/task");
        setLoggedInUserTasks(res.data);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    }
    fetchLoggedInUserTasks();
  }, [display]);

  return (
    <>
      {loading && display === "cards" && <CardsSkeleton />}
      {loading && display === "table" && <TasksTableSkeleton />}
      {!loading && (
        <div className="flex flex-col justify-center items-center ">
          <Link
            to={"/tasks/create"}
            className="sm:absolute sm:top-28 sm:right-24  bg-primary p-4 rounded-xl text-secondary shadow-2xl hover:"
          >
            Create new task
          </Link>
          {display === "cards" ? (
            <Button
              onClick={() => setDisplay("table")}
              className=" absolute sm:top-28 sm:left-24"
            >
              <Grid3X3 size={32} color="#ffffff" />
            </Button>
          ) : (
            <Button
              onClick={() => setDisplay("cards")}
              className=" absolute sm:top-28 sm:left-24"
            >
              <LayoutGrid size={32} color="#ffffff" />
            </Button>
          )}
          <h1 className="text-5xl font-extrabold p-10">
            {loggedInUser && `${loggedInUser.firstName}'s Tasks`}
          </h1>
          {display === "cards" ? (
            <TasksCards loggedInUserTasks={loggedInUserTasks} />
          ) : (
            <TasksTable loggedInUserTasks={loggedInUserTasks} />
          )}
          {pinnedTasks.length === 0 && otherTasks.length === 0 && (
            <p>No Tasks yet...</p>
          )}
          <Outlet />
        </div>
      )}
    </>
  );
}

export default TasksPage;
