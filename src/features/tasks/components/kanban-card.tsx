import { MoreHorizontalIcon } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import MemberAvatar from "@/features/members/components/member-avatar";
import ProjectAvatar from "@/features/projects/components/project-avatar";
import TaskActions from "@/features/tasks/components/task-actions";
import TaskDate from "@/features/tasks/components/task-date";
import { Task } from "@/features/tasks/types";

interface KanbanCardProps {
  task: Task;
}

const KanbanCard = ({ task }: KanbanCardProps) => {
  return (
    <div className="mb-1.5 space-y-3 rounded bg-white p-2.5 shadow-sm">
      <div className="flex items-start justify-between gap-x-2">
        <p className="line-clamp-2 text-sm">{task.name}</p>
        <TaskActions id={task.$id} projectId={task.projectId}>
          <MoreHorizontalIcon className="text-neutral-7 00 size-[18px] shrink-0 cursor-pointer stroke-1 transition hover:opacity-75" />
        </TaskActions>
      </div>

      <Separator />

      <div className="flex items-center gap-x-1.5">
        <MemberAvatar
          name={task.assignee.name}
          fallbackClassName="text-[10px]"
        />

        <div className="size-1 rounded-full bg-neutral-300"></div>

        <TaskDate value={task.dueDate} className="text-xs" />
      </div>

      <div className="flex items-center gap-x-1.5">
        <ProjectAvatar
          name={task.project.name}
          image={task.project.imageUrl}
          fallbackClassName="text-[10px]"
        />
        <span className="text-xs font-medium">{task.project.name}</span>
      </div>
    </div>
  );
};

export default KanbanCard;
