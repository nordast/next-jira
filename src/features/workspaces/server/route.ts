import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { ID } from "node-appwrite";
import { BUCKET_ID, DATABASE_ID, WORKSPACES_ID } from "@/config";
import { createWorkspaceSchema } from "@/features/workspaces/validations";
import { sessionMiddleware } from "@/lib/session-middleware";

const app = new Hono()

  .get("/", sessionMiddleware, async (c) => {
    const databases = c.get("databases");

    const workspaces = await databases.listDocuments(
      DATABASE_ID,
      WORKSPACES_ID,
    );

    return c.json({ data: workspaces });
  })
  .post(
    "/",
    zValidator("form", createWorkspaceSchema),
    sessionMiddleware,
    async (c) => {
      const databases = c.get("databases");
      const storage = c.get("storage");
      const user = c.get("user");

      const { name, image } = c.req.valid("form");

      let uploadeImageUrl: string | undefined;

      if (image instanceof File) {
        const file = await storage.createFile(BUCKET_ID, ID.unique(), image);
        const arrayBuffer = await storage.getFilePreview(BUCKET_ID, file.$id);
        uploadeImageUrl = `data:image/png;base64,${Buffer.from(arrayBuffer).toString("base64")}`;
      }

      const workspace = await databases.createDocument(
        DATABASE_ID,
        WORKSPACES_ID,
        ID.unique(),
        {
          name,
          userId: user.$id,
          imageUrl: uploadeImageUrl,
        },
      );

      return c.json({ data: workspace });
    },
  );

export default app;
