"use client";

import { useCallback } from "react";
import { Loader, PlusIcon } from "lucide-react";
import { useQueryState } from "nuqs";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useBulkUpdateTasks } from "@/features/tasks/api/use-bulk-update-tasks";
import { useGetTasks } from "@/features/tasks/api/use-get-tasks";
import { columns } from "@/features/tasks/components/columns";
import DataCalendar from "@/features/tasks/components/data-calendar";
import DataFilters from "@/features/tasks/components/data-filters";
import DataKanban from "@/features/tasks/components/data-kanban";
import { DataTable } from "@/features/tasks/components/data-table";
import { useCreateTaskModal } from "@/features/tasks/hooks/use-create-task-modal";
import { useTaskFilters } from "@/features/tasks/hooks/use-task-filters";
import { TaskStatus } from "@/features/tasks/types";
import { useWorkspaceId } from "@/features/workspaces/hooks/use-workspace-id";

interface TaskViewSwitcherProps {
  hideProjectFilter?: boolean;
}

const TaskViewSwitcher = ({ hideProjectFilter }: TaskViewSwitcherProps) => {
  const [{ status, assigneeId, projectId, dueDate }] = useTaskFilters();

  const [view, setView] = useQueryState("task-view", {
    defaultValue: "table",
  });

  const workspaceId = useWorkspaceId();
  const { data: tasks, isLoading: isLoadingTasks } = useGetTasks({
    workspaceId,
    status,
    assigneeId,
    projectId,
    dueDate,
  });

  const { setIsOpen } = useCreateTaskModal();

  const { mutate: bulkUpdate } = useBulkUpdateTasks();

  const onKanbanChange = useCallback(
    (tasks: { $id: string; status: TaskStatus; position: number }[]) => {
      bulkUpdate({
        json: { tasks },
      });
    },
    [bulkUpdate],
  );

  return (
    <Tabs
      defaultValue={view}
      onValueChange={setView}
      className="w-full flex-1 rounded-lg border"
    >
      <div className="flex h-full flex-col overflow-auto p-4">
        <div className="flex flex-col items-center justify-between gap-y-2 lg:flex-row">
          <TabsList className="w-full lg:w-auto">
            <TabsTrigger value="table" className="h-8 w-full lg:w-auto">
              Table
            </TabsTrigger>

            <TabsTrigger value="kanban" className="h-8 w-full lg:w-auto">
              Kanban
            </TabsTrigger>

            <TabsTrigger value="calendar" className="h-8 w-full lg:w-auto">
              Calendar
            </TabsTrigger>
          </TabsList>

          <Button
            size="sm"
            className="w-full lg:w-auto"
            title="Create new task"
            onClick={() => setIsOpen(true)}
          >
            <PlusIcon className="size-4" />
            New
          </Button>
        </div>

        <Separator className="my-4" />

        <DataFilters hideProjectFilter={hideProjectFilter} />

        <Separator className="my-4" />

        {isLoadingTasks ? (
          <div className="flex h-[200px] w-full flex-col items-center justify-center rounded-lg border">
            <Loader className="size-5 animate-spin text-muted-foreground" />
          </div>
        ) : (
          <>
            <TabsContent value="table" className="mt-0">
              <DataTable columns={columns} data={tasks?.documents ?? []} />
            </TabsContent>
            <TabsContent value="kanban" className="mt-0">
              <DataKanban
                data={tasks?.documents ?? []}
                onChange={onKanbanChange}
              />
            </TabsContent>
            <TabsContent value="calendar" className="mt-0 h-full pb-4">
              <DataCalendar data={tasks?.documents ?? []} />
            </TabsContent>
          </>
        )}
      </div>
    </Tabs>
  );
};

export default TaskViewSwitcher;
