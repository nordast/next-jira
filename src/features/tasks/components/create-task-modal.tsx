"use client";

import ResponsiveModal from "@/components/responsive-modal";
import CreateTaskFormWrapper from "@/features/tasks/components/create-task-form-wrapper";
import { useCreateTaskModal } from "@/features/tasks/hooks/use-create-task-modal";

const CreateTaskModal = () => {
  const { isOpen, setIsOpen } = useCreateTaskModal();

  return (
    <ResponsiveModal open={isOpen} onOpenChange={setIsOpen}>
      <CreateTaskFormWrapper onCancel={() => setIsOpen(false)} />
    </ResponsiveModal>
  );
};

export default CreateTaskModal;
