import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChevronRightIcon, TrashIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import ProjectAvatar from "@/features/projects/components/project-avatar";
import { Project } from "@/features/projects/types";
import { useDeleteTask } from "@/features/tasks/api/use-delete-task";
import { Task } from "@/features/tasks/types";
import { useWorkspaceId } from "@/features/workspaces/hooks/use-workspace-id";
import { useConfirm } from "@/hooks/use-confirm";

interface TaskBreadcrumbsProps {
  project: Project;
  task: Task;
}

const TaskBreadcrumbs = ({ project, task }: TaskBreadcrumbsProps) => {
  const router = useRouter();
  const workspaceId = useWorkspaceId();
  const { mutate, isPending } = useDeleteTask();
  const [ConfirmDialog, confirm] = useConfirm(
    "Delete Task",
    "Are you sure you want to delete this task?",
    "destructive",
  );

  const handleDeleteTask = async () => {
    const ok = await confirm();
    if (!ok) return;

    mutate(
      { param: { taskId: task.$id } },
      {
        onSuccess: () => {
          router.push(`/workspaces/${workspaceId}/tasks`);
        },
      },
    );
  };

  return (
    <div className="flex items-center gap-x-2">
      <ConfirmDialog />

      <ProjectAvatar
        name={project.name}
        image={project.imageUrl}
        className="size-6 lg:size-8"
      />

      <Link href={`/workspaces/${workspaceId}/projects/${project.$id}`}>
        <p className="cursor-pointer text-sm font-semibold text-muted-foreground transition hover:opacity-75 lg:text-lg">
          {project.name}
        </p>
      </Link>

      <ChevronRightIcon className="size-4 text-muted-foreground lg:size-5" />

      <p className="text-sm font-semibold lg:text-lg">{task.name}</p>

      <Button
        variant="destructive"
        size="sm"
        className="ml-auto"
        onClick={handleDeleteTask}
        disabled={isPending}
      >
        <TrashIcon className="size-4" />
        <span className="hidden lg:block">Delete</span>
      </Button>
    </div>
  );
};

export default TaskBreadcrumbs;
