"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useInviteWorkspace } from "@/features/workspaces/api/use-invite-workspace";
import { useInviteCode } from "@/features/workspaces/hooks/use-invite-code";
import { useWorkspaceId } from "@/features/workspaces/hooks/use-workspace-id";

interface InviteWorkspaceFormProps {
  initialValues: {
    name: string;
  };
}

const InviteWorkspaceForm = ({ initialValues }: InviteWorkspaceFormProps) => {
  const router = useRouter();
  const { mutate, isPending } = useInviteWorkspace();
  const inviteCode = useInviteCode();
  const workspaceId = useWorkspaceId();

  const onSubmit = () => {
    mutate(
      {
        param: { workspaceId },
        json: { code: inviteCode },
      },
      {
        onSuccess: ({ data }) => {
          router.push(`/workspaces/${data.$id}`);
        },
      },
    );
  };

  return (
    <Card className="h-full w-full border-none shadow-none">
      <CardHeader className="p-7">
        <CardTitle className="text-xl font-bold">Join Workspace</CardTitle>

        <CardDescription className="py-4">
          You&apos;ve been invited to join <strong>{initialValues.name}</strong>
          workspace.
        </CardDescription>
      </CardHeader>

      <CardContent>
        <div className="flex flex-col items-center justify-end gap-2 lg:flex-row">
          <Button
            type="button"
            variant="secondary"
            size="lg"
            asChild
            className="w-full lg:w-fit"
            disabled={isPending}
          >
            <Link href="/">Cancel</Link>
          </Button>
          <Button
            type="button"
            className="w-full lg:w-fit"
            size="lg"
            onClick={onSubmit}
            disabled={isPending}
          >
            Join Workspace
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default InviteWorkspaceForm;
