"use client";

import ResponsiveModal from "@/components/responsive-modal";
import EditTaskFormWrapper from "@/features/tasks/components/edit-task-form-wrapper";
import { useEditTaskModal } from "@/features/tasks/hooks/use-edit-task-modal";

const EditTaskModal = () => {
  const { taskId, setTaskId } = useEditTaskModal();

  return (
    <ResponsiveModal open={!!taskId} onOpenChange={() => setTaskId(null)}>
      {taskId && (
        <EditTaskFormWrapper id={taskId} onCancel={() => setTaskId(null)} />
      )}
    </ResponsiveModal>
  );
};

export default EditTaskModal;
