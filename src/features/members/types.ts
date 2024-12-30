import { Models } from "node-appwrite";

export enum MemberRole {
  ADMIN = "ADMIN",
  MEMBER = "MEMBER",
}

export type Member = Models.Document & {
  name: string;
  role: MemberRole;
  imageUrl: string;
  workspaceId: string;
};
