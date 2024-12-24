import { Loader } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { useGetMembers } from "@/features/members/api/use-get-members";
import { useGetProjects } from "@/features/projects/api/use-get-projects";
import { useGetTask } from "@/features/tasks/api/use-get-task";
import EditTaskForm from "@/features/tasks/components/edit-task-form";
import { useWorkspaceId } from "@/features/workspaces/hooks/use-workspace-id";

interface EditTaskFormWrapperProps {
  onCancel: () => void;
  id: string;
}

const EditTaskFormWrapper = ({ onCancel, id }: EditTaskFormWrapperProps) => {
  const workspaceId = useWorkspaceId();

  const { data: initialValues, isLoading: isLoadingTask } = useGetTask({
    taskId: id,
  });

  const { data: projects, isLoading: isLoadingProjects } = useGetProjects({
    workspaceId,
  });

  const { data: members, isLoading: isLoadingMembers } = useGetMembers({
    workspaceId,
  });

  const projectOptions = projects?.documents.map((project) => ({
    id: project.$id,
    name: project.name,
    imageUrl: project.imageUrl,
  }));

  const memberOptions = members?.documents.map((member) => ({
    id: member.$id,
    name: member.name,
  }));

  const isLoading = isLoadingProjects || isLoadingMembers || isLoadingTask;

  if (isLoading)
    return (
      <Card className="h-[714px] w-full border-none shadow-none">
        <CardContent className="flex h-full items-center justify-center">
          <Loader className="size-5 animate-spin text-muted-foreground" />
        </CardContent>
      </Card>
    );

  if (!initialValues) return null;

  return (
    <EditTaskForm
      onCancel={onCancel}
      projectOptions={projectOptions ?? []}
      memberOptions={memberOptions ?? []}
      initialValues={initialValues}
    />
  );
};

export default EditTaskFormWrapper;
