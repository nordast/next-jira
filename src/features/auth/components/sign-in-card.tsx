import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { useLogin } from "@/features/auth/api/use-login";
import { loginSchema } from "@/features/auth/validations/auth";

export const SignInCard = () => {
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { mutate } = useLogin();

  const onSubmit = (values: z.infer<typeof loginSchema>) => {
    mutate({ json: values });
  };

  return (
    <Card className="h-full w-full border-none shadow-none md:w-[487px]">
      <CardHeader className="flex items-center justify-center p-7 text-center">
        <CardTitle className="text-2xl">Sign In</CardTitle>
      </CardHeader>
      <div className="px-7">
        <Separator />
      </div>
      <CardContent className="p-7">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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

            <Button disabled={false} size="lg" className="w-full">
              Login
            </Button>

            <div className="px-7">
              <Separator />
            </div>

            <CardContent className="flex flex-col gap-y-4 p-7">
              <Button
                variant="secondary"
                disabled={false}
                size="lg"
                className="w-full"
              >
                <FcGoogle className="mr-1 size-5" />
                Login with Google
              </Button>

              <Button
                variant="secondary"
                disabled={false}
                size="lg"
                className="w-full"
              >
                <FaGithub className="mr-1 size-5" />
                Login with GitHub
              </Button>
            </CardContent>

            <div className="px-7">
              <Separator />
            </div>

            <CardContent className="flex items-center justify-center px-7">
              <p>
                Don&apos;t have an account?{" "}
                <Link href="/sign-up">
                  <span className="link">Sign Up</span>
                </Link>
              </p>
            </CardContent>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};
