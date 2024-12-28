import AnalyticsCard from "@/components/ui/analytics-card";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { ProjectAnalyticsResponseType } from "@/features/projects/api/use-get-project-analytics";

const Analytics = ({ data }: ProjectAnalyticsResponseType) => {
  return (
    <ScrollArea className="w-full shrink-0 whitespace-nowrap rounded-lg border">
      <div className="flex w-full flex-row">
        <div className="flex flex-1 items-center">
          <AnalyticsCard
            title="Total Tasks"
            value={data.taskCount}
            variant={data.taskDifference > 0 ? "up" : "down"}
            increaseValue={data.taskDifference}
          />
          <Separator orientation="vertical" />
        </div>

        <div className="flex flex-1 items-center">
          <AnalyticsCard
            title="Assignee Tasks"
            value={data.assigneeTaskCount}
            variant={data.assigneeTaskDifference > 0 ? "up" : "down"}
            increaseValue={data.assigneeTaskDifference}
          />
          <Separator orientation="vertical" />
        </div>

        <div className="flex flex-1 items-center">
          <AnalyticsCard
            title="Completed Tasks"
            value={data.completedTaskCount}
            variant={data.completedTaskDifference > 0 ? "up" : "down"}
            increaseValue={data.completedTaskDifference}
          />
          <Separator orientation="vertical" />
        </div>

        <div className="flex flex-1 items-center">
          <AnalyticsCard
            title="Overdue Tasks"
            value={data.overdueTaskCount}
            variant={data.overdueTaskDifference > 0 ? "up" : "down"}
            increaseValue={data.overdueTaskDifference}
          />
          <Separator orientation="vertical" />
        </div>

        <div className="flex flex-1 items-center">
          <AnalyticsCard
            title="Incomplete Tasks"
            value={data.incompleteTaskCount}
            variant={data.incompleteTaskDifference > 0 ? "up" : "down"}
            increaseValue={data.incompleteTaskDifference}
          />
        </div>
      </div>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  );
};

export default Analytics;
