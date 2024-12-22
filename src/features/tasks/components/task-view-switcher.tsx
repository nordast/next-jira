"use client";

import { PlusIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useCreateTaskModal } from "@/features/tasks/hooks/use-create-task-modal";

const TaskViewSwitcher = () => {
  const { setIsOpen } = useCreateTaskModal();

  return (
    <Tabs className="w-full flex-1 rounded-lg border">
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
        {/* Filters */}
        Filters
        <Separator className="my-4" />
        <>
          <TabsContent value="table" className="mt-0">
            Data table
          </TabsContent>
          <TabsContent value="kanban" className="mt-0">
            Data kanban
          </TabsContent>
          <TabsContent value="calendar" className="mt-0">
            Data calendar
          </TabsContent>
        </>
      </div>
    </Tabs>
  );
};

export default TaskViewSwitcher;
