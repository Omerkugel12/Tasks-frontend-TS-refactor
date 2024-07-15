import ArchiveItem from "./ArchiveItem";

function ArchivesList({
  archives,
  deleteModal,
  setDeleteModal,
  handleReturnToTasks,
}) {
  return (
    <ul className="flex  flex-wrap gap-4">
      {archives.map((archive) => (
        <ArchiveItem
          key={archive._id}
          deleteModal={deleteModal}
          archive={archive}
          setDeleteModal={setDeleteModal}
          handleReturnToTasks={handleReturnToTasks}
        />
      ))}
    </ul>
  );
}

export default ArchivesList;
