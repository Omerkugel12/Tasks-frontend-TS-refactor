import { Archive } from "@/pages/ArchivePage";
import ArchiveItem from "./ArchiveItem";

interface PropsTypes {
  archives: Archive[];
  deleteModal: boolean | string;
  setDeleteModal: React.Dispatch<React.SetStateAction<boolean | string>>;
  handleReturnToTasks: (archive: Archive, archiveId: String) => Promise<void>;
}

function ArchivesList({
  archives,
  setDeleteModal,
  handleReturnToTasks,
}: PropsTypes) {
  return (
    <ul className="flex  flex-wrap gap-4">
      {archives.map((archive) => (
        <ArchiveItem
          key={archive._id}
          archive={archive}
          setDeleteModal={setDeleteModal}
          handleReturnToTasks={handleReturnToTasks}
        />
      ))}
    </ul>
  );
}

export default ArchivesList;
