"use client";

import ResponsiveModal from "@/components/responsive-modal";
import CreateProjectForm from "@/features/projects/components/create-project-form";
import { useCreateProjectModal } from "@/features/projects/hooks/use-create-project-modal";

const CreateProjectModal = () => {
  const { isOpen, setIsOpen } = useCreateProjectModal();

  return (
    <ResponsiveModal open={isOpen} onOpenChange={setIsOpen}>
      <CreateProjectForm onCancel={() => setIsOpen(false)} />
    </ResponsiveModal>
  );
};

export default CreateProjectModal;
