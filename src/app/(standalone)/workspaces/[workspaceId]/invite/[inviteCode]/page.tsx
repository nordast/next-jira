import { redirect } from "next/navigation";
import WorkspaceIdInviteClient from "@/app/(standalone)/workspaces/[workspaceId]/invite/[inviteCode]/client";
import { getCurrent } from "@/features/auth/queries";

const WorkspaceIdInvitePage = async () => {
  const user = await getCurrent();
  if (!user) redirect("/sign-in");

  return <WorkspaceIdInviteClient />;
};

export default WorkspaceIdInvitePage;
