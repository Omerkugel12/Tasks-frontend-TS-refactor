import { Archive } from "@/pages/ArchivePage";
import { Button } from "../ui/button";
import { Trash2 } from "lucide-react";

interface PropsTypes {
  archive: Archive;
  setDeleteModal: React.Dispatch<React.SetStateAction<boolean | string>>;
  handleReturnToTasks: (archive: Archive, archiveId: String) => Promise<void>;
}

function ArchiveItem({
  archive,
  setDeleteModal,
  handleReturnToTasks,
}: PropsTypes) {
  return (
    <li
      className={
        "relative flex flex-col border border-ring p-2 overflow-scroll min-w-[300px] w-80 h-40 overflow-x-visible bg-secondary rounded-lg shadow-2xl space-y-4"
      }
    >
      <div>
        <h1 className="text-2xl font-bold">{archive.title}</h1>
        <p>{archive.description}</p>
      </div>
      <div className="flex justify-evenly">
        <Button
          onClick={() => setDeleteModal(archive._id)}
          variant="outline"
          className="text-destructive border border-destructive hover:bg-destructive/90 "
        >
          <Trash2 className="text-destructive hover:text-secondary" />
        </Button>
        <Button
          onClick={() => handleReturnToTasks(archive, archive._id)}
          variant="outline"
          className="text-primary border border-primary hover:bg-primary/90 "
        >
          return to tasks
        </Button>
      </div>
    </li>
  );
}

export default ArchiveItem;
