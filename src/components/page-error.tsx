import { AlertTriangleIcon } from "lucide-react";

interface PageErrorProps {
  message?: string;
}

const PageError = ({ message = "Something went wrong" }: PageErrorProps) => {
  return (
    <div className="flex h-full flex-col items-center justify-center">
      <AlertTriangleIcon className="size-20 text-red-500" />
      <p className="text-sm font-medium text-muted-foreground">{message}</p>
    </div>
  );
};

export default PageError;
