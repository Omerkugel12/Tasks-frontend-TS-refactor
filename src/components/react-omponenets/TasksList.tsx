import TaskItem from "./TaskItem";
import { Task } from "@/pages/TasksPage";

function TasksList({ loggedInUserTasks }: { loggedInUserTasks: Task[] }) {
  return (
    <ul className="flex  flex-wrap gap-4">
      {loggedInUserTasks.map((task) => (
        <TaskItem key={task._id} task={task} />
      ))}
    </ul>
  );
}

export default TasksList;
