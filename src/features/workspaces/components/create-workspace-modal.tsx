"use client";

import ResponsiveModal from "@/components/responsive-modal";
import CreateWorkspaceForm from "@/features/workspaces/components/create-workspace-form";
import { useCreateWorkspaceModal } from "@/features/workspaces/hooks/use-create-workspace-modal";

const CreateWorkspaceModal = () => {
  const { isOpen, setIsOpen } = useCreateWorkspaceModal();

  return (
    <ResponsiveModal open={isOpen} onOpenChange={setIsOpen}>
      <CreateWorkspaceForm onCancel={() => setIsOpen(false)} />
    </ResponsiveModal>
  );
};

export default CreateWorkspaceModal;
