import { redirect } from "next/navigation";
import { getCurrent } from "@/features/auth/queries";
import InviteWorkspaceForm from "@/features/workspaces/components/invite-workspace-form";
import { getWorkspaceInfo } from "@/features/workspaces/queries";

interface WorkspaceIdInvitePageProps {
  params: {
    workspaceId: string;
  };
}

const WorkspaceIdInvitePage = async ({
  params,
}: WorkspaceIdInvitePageProps) => {
  const user = await getCurrent();
  if (!user) redirect("/sign-in");

  const { workspaceId } = await params;

  const initialValues = await getWorkspaceInfo({
    workspaceId: workspaceId,
  });

  if (!initialValues) redirect("/");

  return (
    <div className="w-full max-w-xl">
      <InviteWorkspaceForm initialValues={initialValues} />
    </div>
  );
};

export default WorkspaceIdInvitePage;
