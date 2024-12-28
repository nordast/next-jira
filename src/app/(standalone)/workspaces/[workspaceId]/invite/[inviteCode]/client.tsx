"use client";

import PageError from "@/components/page-error";
import PageLoader from "@/components/page-loader";
import { useGetWorkspaceInfo } from "@/features/workspaces/api/use-get-workspace-info";
import InviteWorkspaceForm from "@/features/workspaces/components/invite-workspace-form";
import { useWorkspaceId } from "@/features/workspaces/hooks/use-workspace-id";

const WorkspaceIdInviteClient = () => {
  const workspaceId = useWorkspaceId();
  const { data, isLoading } = useGetWorkspaceInfo({ workspaceId });

  if (isLoading) return <PageLoader />;
  if (!data) return <PageError message="Workspace info not found" />;

  return (
    <div className="w-full max-w-xl">
      <InviteWorkspaceForm initialValues={data} />
    </div>
  );
};

export default WorkspaceIdInviteClient;
