"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useRef } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeftIcon, ImageIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { useDeleteProject } from "@/features/projects/api/use-delete-project";
import { useUpdateProject } from "@/features/projects/api/use-update-project";
import { Project } from "@/features/projects/types";
import { updateProjectSchema } from "@/features/projects/validations";
import { useConfirm } from "@/hooks/use-confirm";
import { cn } from "@/lib/utils";

interface EditProjectFormProps {
  onCancel?: () => void;
  initialValues: Project;
}

const EditProjectForm = ({ onCancel, initialValues }: EditProjectFormProps) => {
  const router = useRouter();
  const { mutate, isPending } = useUpdateProject();
  const { mutate: deleteProject, isPending: isDeletingProject } =
    useDeleteProject();

  const [DeleteDialog, confirmDelete] = useConfirm(
    "Delete Project",
    "Are you sure you want to delete this project?",
    "destructive",
  );

  const inputRef = useRef<HTMLInputElement>(null);

  const form = useForm<z.infer<typeof updateProjectSchema>>({
    resolver: zodResolver(updateProjectSchema),
    defaultValues: {
      ...initialValues,
      image: initialValues.imageUrl ?? "",
    },
  });

  const onSubmit = (values: z.infer<typeof updateProjectSchema>) => {
    const finalValues = {
      ...values,
      image: values.image instanceof File ? values.image : "",
    };

    mutate(
      { form: finalValues, param: { projectId: initialValues.$id } },
      // {
      //   onSuccess: () => {
      //     form.reset();
      //   },
      // },
    );
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      form.setValue("image", file);
    }
  };

  const handleDelete = async () => {
    const ok = await confirmDelete();
    if (!ok) return;

    deleteProject(
      {
        param: { projectId: initialValues.$id },
      },
      {
        onSuccess: () => {
          window.location.href = `/workspace/${initialValues.workspaceId}`;
        },
      },
    );
  };

  return (
    <div className="flex flex-col gap-y-4">
      <DeleteDialog />

      <Card className="h-full w-full border-none shadow-none">
        <CardHeader className="flex flex-row items-center gap-x-4 space-y-0 p-7">
          <Button
            size="sm"
            variant="secondary"
            onClick={
              onCancel
                ? onCancel
                : () =>
                    router.push(
                      `/workspaces/${initialValues.workspaceId}/projects/${initialValues.$id}`,
                    )
            }
          >
            <ArrowLeftIcon className="size-4" />
            Back
          </Button>

          <CardTitle className="text-xl font-bold">
            {`Edit ${initialValues.name}`}
          </CardTitle>
        </CardHeader>

        <div className="px-7">
          <Separator />
        </div>

        <CardContent className="p-7">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className="flex flex-col gap-y-4">
                <FormField
                  name="name"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Project Name</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="Enter project name" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  name="image"
                  control={form.control}
                  render={({ field }) => (
                    <div className="my-4 flex flex-col gap-y-2">
                      <div className="flex items-center gap-x-5">
                        {field.value ? (
                          <div className="relative size-[72px] overflow-hidden rounded-md">
                            <Image
                              fill
                              className="object-cover"
                              src={
                                field.value instanceof File
                                  ? URL.createObjectURL(field.value)
                                  : field.value
                              }
                              alt="Logo"
                            />
                          </div>
                        ) : (
                          <Avatar
                            className="size-[72px] cursor-pointer"
                            onClick={() => inputRef.current?.click()}
                          >
                            <AvatarFallback>
                              <ImageIcon className="size-[37px] text-neutral-400" />
                            </AvatarFallback>
                          </Avatar>
                        )}
                        <div className="flex flex-col">
                          <p className="text-sm">Project Icon</p>
                          <p className="text-sm text-muted-foreground">
                            .jpg, .png, .svg, max 1MB
                          </p>
                          <input
                            ref={inputRef}
                            disabled={isPending}
                            onChange={handleImageChange}
                            type="file"
                            className="hidden"
                            accept=".image/jpeg, .image/png, .image/svg"
                          />

                          {field.value ? (
                            <Button
                              type="button"
                              disabled={isPending}
                              variant="destructive"
                              size="xs"
                              className="mt-2 w-fit"
                              onClick={() => {
                                field.onChange(null);
                                if (inputRef.current) {
                                  inputRef.current.value = "";
                                }
                              }}
                            >
                              Remove Image
                            </Button>
                          ) : (
                            <Button
                              type="button"
                              disabled={isPending}
                              variant="teritary"
                              size="xs"
                              className="mt-2 w-fit"
                              onClick={() => inputRef.current?.click()}
                            >
                              Upload Image
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                />
                <Separator />

                <div className="flex items-center justify-end gap-x-4 pt-7">
                  <Button
                    type="button"
                    size="lg"
                    variant="secondary"
                    onClick={onCancel}
                    disabled={isPending}
                    className={cn(!onCancel && "hidden")}
                  >
                    Cancel
                  </Button>

                  <Button type="submit" size="lg" disabled={isPending}>
                    Save
                  </Button>
                </div>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>

      <Card className="h-full w-full border-none shadow-none">
        <CardContent className="p-7">
          <div className="flex flex-col">
            <h3 className="mb-2 text-xl font-bold text-red-600">Danger Zone</h3>
            <p className="text-sm text-muted-foreground">
              Deleting a project is irreversible and will remove all associated
              data.
            </p>
            <Button
              size="sm"
              variant="destructive"
              className="ml-auto mt-6 w-fit"
              type="button"
              disabled={isPending || isDeletingProject}
              onClick={() => handleDelete()}
            >
              Delete Project
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default EditProjectForm;
