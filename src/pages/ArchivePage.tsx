import ArchivesList from "@/components/react-omponenets/ArchivesList";
import CardsSkeleton from "@/components/react-omponenets/CardsSkeleton";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import api from "@/services/api.service";
import { useEffect, useState } from "react";
import { Todo } from "./TasksPage";

export interface Archive {
  _id: string;
  title: string;
  description: string;
  body: string;
  todoList: Todo[];
  isPinned: boolean;
  user: string;
}

function ArchivePage() {
  const { loggedInUser } = useAuth();
  const [archives, setArchives] = useState<Archive[]>([]);
  const [loading, setloading] = useState(false);
  const [deleteModal, setDeleteModal] = useState<boolean | string>(false);

  useEffect(() => {
    setloading(true);
    async function getArchives() {
      try {
        const { data: fetchedArchives } = await api.get("/archive");
        setArchives(fetchedArchives);
        setloading(false);
      } catch (error) {
        console.log(error);
      }
    }
    getArchives();
  }, []);

  async function deleteArchive(archiveId: string | boolean) {
    try {
      await api.delete(`/archive/${archiveId}`);
      setArchives(archives.filter((archive) => archive._id !== archiveId));
      setDeleteModal(false);
    } catch (error) {
      console.log(error);
    }
  }

  async function handleReturnToTasks(archive: Archive, archiveId: String) {
    try {
      await api.post("/task", archive);
    } catch (error) {
      console.log(error);
    }

    try {
      await api.delete(`archive/${archive._id}`);
      setArchives(archives.filter((archive) => archive._id !== archiveId));
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      {deleteModal ? (
        <>
          <div className="fixed top-0 bottom-0 right-0 left-0 bg-slate-700 opacity-80"></div>
          <div className=" fixed top-1/2 -translate-y-1/2 left-1/2 transform -translate-x-1/2 z-50 flex flex-col gap-5 border border-ring p-10 bg-secondary rounded-2xl ">
            <p className="text-xl">Are yo sure you want to delete this task?</p>
            <div className="flex justify-center gap-4">
              <Button
                variant="destructive"
                onClick={() => deleteArchive(deleteModal)}
              >
                Delete
              </Button>
              <Button onClick={() => setDeleteModal(false)}>Cancel</Button>
            </div>
          </div>
        </>
      ) : null}
      {loading ? (
        <CardsSkeleton />
      ) : (
        <div>
          <h1 className="text-5xl text-center font-extrabold my-8">
            {loggedInUser && loggedInUser.firstName}'s Archive
          </h1>
          <ArchivesList
            archives={archives}
            deleteModal={deleteModal}
            setDeleteModal={setDeleteModal}
            handleReturnToTasks={handleReturnToTasks}
          />
        </div>
      )}
    </>
  );
}

export default ArchivePage;
