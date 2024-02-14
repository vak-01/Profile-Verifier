"use client";

import { useState } from "react";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { cn } from "@/lib/utils";
import { Icons } from "@/components/ui/icons";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

const formSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
});

//   // 1. Define your form.
export default function UserAuthForm({
  className,
  ...props
}: UserAuthFormProps) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [status, setStatus] = useState<String>("");
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    // setIsLoading(true);
    //
    // setTimeout(() => {
    //   setIsLoading(false);
    // }, 3000);
    setIsLoading(true);
    fetch(`http://localhost:5000/user/${values.username}`)
      .then((response) => response.json())
      .then((data) => {
        setStatus(data.prediction ? "fake" : "real");
        setIsLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setStatus("error");
        setIsLoading(false);
      });
    console.log(values);
  }

  return (
    <div className={cn("flex flex-col", className)} {...props}>
      <Card className="mx-auto min-w-[23rem] sm:w-[30rem]">
        <CardHeader>
        <CardTitle className="text-center">Profile Verifier</CardTitle>
          <CardDescription className="text-center">Enter the username of the Instagram profile to be checked</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    {/* <FormLabel className="mb-4">Username</FormLabel> */}
                    <FormControl>
                      <Input placeholder="Enter Username" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="grid gap-2 mt-6">
                <Button disabled={isLoading}>
                  {isLoading && (
                    <Icons.spinner className="mr-2 w-4 h-4 animate-spin" />
                  )}
                  Check Account
                </Button>
              </div>
            </form>
            <div className="text-2xl text-center">
              {status === "fake" && "Fake Account"}
              {status === "real" && "Real Account"}
              {status === "error" && "Server Error"}
            </div>
            <div className="relative">
              <div className="flex absolute inset-0 items-center">
                <span className="w-full border-t" />
              </div>
              <div className="flex relative justify-center text-xs uppercase">
                <span className="px-2 bg-background text-muted-foreground">
                  Or continue with
                </span>
              </div>
            </div>
            <Button
              variant="outline"
              type="button"
              className="w-full"
              disabled={isLoading}
            >
              {isLoading ? (
                <Icons.spinner className="mr-2 w-4 h-4 animate-spin" />
              ) : (
                <Icons.instagram className="mr-2 w-4 h-4" />
              )}{" "}
              <div className="ml-2">Instagram</div>
            </Button>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
