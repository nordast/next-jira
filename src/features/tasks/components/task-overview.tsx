import { PencilIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import MemberAvatar from "@/features/members/components/member-avatar";
import OverviewProperty from "@/features/tasks/components/overview-property";
import TaskDate from "@/features/tasks/components/task-date";
import { useEditTaskModal } from "@/features/tasks/hooks/use-edit-task-modal";
import { Task } from "@/features/tasks/types";
import { snakeCaseToTitleCase } from "@/lib/utils";

interface TaskOverviewProps {
  task: Task;
}

const TaskOverview = ({ task }: TaskOverviewProps) => {
  const { setTaskId } = useEditTaskModal();

  return (
    <div className="col-span-1 flex flex-col gap-y-4">
      <div className="rounded-lg bg-muted p-4">
        <div className="flex items-center justify-between">
          <p className="text-lg font-semibold">Overview</p>

          <Button
            size="sm"
            variant="secondary"
            onClick={() => setTaskId(task.$id)}
          >
            <PencilIcon className="size-4" />
            Edit
          </Button>
        </div>

        <Separator className="my-4" />

        <div className="flex flex-col gap-y-4">
          <OverviewProperty label="Assignee">
            <MemberAvatar name={task.assignee.name} className="size-6" />
            <p className="text-sm font-medium">{task.assignee.name}</p>
          </OverviewProperty>

          <OverviewProperty label="Due Date">
            <TaskDate value={task.dueDate} className="text-sm font-medium" />
          </OverviewProperty>

          <OverviewProperty label="Status">
            <Badge variant={task.status}>
              {snakeCaseToTitleCase(task.status)}
            </Badge>
          </OverviewProperty>
        </div>
      </div>
    </div>
  );
};

export default TaskOverview;
