"use client";

import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { useRegister } from "@/features/auth/api/use-register";
import { registerSchema } from "@/features/auth/validations";

export const SignUpCard = () => {
  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const { mutate, isPending } = useRegister();

  const onSubmit = (values: z.infer<typeof registerSchema>) => {
    mutate({ json: values });
  };

  return (
    <Card className="h-full w-full border-none shadow-none md:w-[487px]">
      <CardHeader className="flex items-center justify-center p-7 text-center">
        <CardTitle className="text-2xl">Sign Up</CardTitle>

        <CardDescription className="text-sm">
          By signing up, you agree to our{" "}
          <Link href="/privacy">
            <span className="link">Privacy Policy</span>
          </Link>{" "}
          and{" "}
          <Link href="/terms">
            <span className="link">Terms of Service</span>
          </Link>
        </CardDescription>
      </CardHeader>

      <div className="px-7">
        <Separator />
      </div>

      <CardContent className="p-7">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              name="name"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input {...field} type="text" placeholder="Full Name" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              name="email"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      {...field}
                      type="email"
                      placeholder="Email Address"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              name="password"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input {...field} type="password" placeholder="Password" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button disabled={isPending} size="lg" className="w-full">
              Register
            </Button>

            <div className="px-7">
              <Separator />
            </div>

            <CardContent className="flex flex-col gap-y-4 p-7">
              <Button
                variant="secondary"
                disabled={isPending}
                size="lg"
                className="w-full"
              >
                <FcGoogle className="mr-1 size-5" />
                Register with Google
              </Button>

              <Button
                variant="secondary"
                disabled={isPending}
                size="lg"
                className="w-full"
              >
                <FaGithub className="mr-1 size-5" />
                Register with GitHub
              </Button>
            </CardContent>

            <div className="px-7">
              <Separator />
            </div>

            <CardContent className="flex items-center justify-center px-7">
              <p>
                Already have an account?{" "}
                <Link href="/sign-in">
                  <span className="link">Sign In</span>
                </Link>
              </p>
            </CardContent>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};
