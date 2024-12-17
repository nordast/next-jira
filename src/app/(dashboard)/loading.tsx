import { Loader } from "lucide-react";

const DashboardLoading = () => {
  return (
    <div className="flex h-full items-center justify-center">
      <Loader className="size-10 animate-spin text-muted-foreground" />
    </div>
  );
};

export default DashboardLoading;
