import { useRouter } from "next/navigation";
import React from "react";
import { ExternalLinkIcon, PencilIcon, TrashIcon } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useDeleteTask } from "@/features/tasks/api/use-delete-task";
import { useEditTaskModal } from "@/features/tasks/hooks/use-edit-task-modal";
import { useWorkspaceId } from "@/features/workspaces/hooks/use-workspace-id";
import { useConfirm } from "@/hooks/use-confirm";

interface TaskActionsProps {
  id: string;
  projectId: string;
  children: React.ReactNode;
}

const TaskActions = ({ id, projectId, children }: TaskActionsProps) => {
  const workspaceId = useWorkspaceId();
  const router = useRouter();

  const { setTaskId } = useEditTaskModal();

  const [ConfirmDialog, confirm] = useConfirm(
    "Delete Task",
    "Are you sure you want to delete this task?",
    "destructive",
  );

  const { mutate, isPending } = useDeleteTask();

  const onDelete = async () => {
    const ok = await confirm();
    if (!ok) return;

    mutate({ param: { taskId: id } });
  };

  const onOpenTask = () => {
    router.push(`/workspaces/${workspaceId}/tasks/${id}`);
  };

  const onOpenProject = () => {
    router.push(`/workspaces/${workspaceId}/projects/${projectId}`);
  };

  return (
    <div className="flex justify-end">
      <ConfirmDialog />

      <DropdownMenu modal={false}>
        <DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-48">
          <DropdownMenuItem
            onClick={onOpenTask}
            className="p-[10px] font-medium"
          >
            <ExternalLinkIcon className="mr-2 size-4 stroke-2" />
            Details
          </DropdownMenuItem>

          <DropdownMenuItem
            onClick={onOpenProject}
            className="p-[10px] font-medium"
          >
            <ExternalLinkIcon className="mr-2 size-4 stroke-2" />
            Open Project
          </DropdownMenuItem>

          <DropdownMenuItem
            onClick={() => setTaskId(id)}
            className="p-[10px] font-medium"
          >
            <PencilIcon className="mr-2 size-4 stroke-2" />
            Edit
          </DropdownMenuItem>

          <DropdownMenuItem
            onClick={onDelete}
            disabled={isPending}
            className="p-[10px] font-medium text-red-600 focus:text-red-600"
          >
            <TrashIcon className="mr-2 size-4 stroke-2" />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default TaskActions;
