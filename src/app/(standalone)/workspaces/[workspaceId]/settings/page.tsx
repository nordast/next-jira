import { redirect } from "next/navigation";
import WorkspaceIdSettingsClient from "@/app/(standalone)/workspaces/[workspaceId]/settings/client";
import { getCurrent } from "@/features/auth/queries";

const WorkspaceIdSettingsPage = async () => {
  const user = await getCurrent();
  if (!user) redirect("/sign-in");

  return <WorkspaceIdSettingsClient />;
};

export default WorkspaceIdSettingsPage;
