"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";

import { EyeClosedIcon, EyeIcon } from "lucide-react";
import Link from "next/link";
import { signIn } from "next-auth/react";
import * as z from "zod";

import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const formSchema = z.object({
  email: z
    .string({
      required_error: "Email is required",
      invalid_type_error: "Email must be a string",
    })
    .email({
      message: "Invalid email address",
    }),
  password: z
    .string({
      required_error: "Password is required",
      invalid_type_error: "Password must be a string",
    })
    .min(8, {
      message: "Password must be at least 8 characters long",
    }),
});

export default function HeroFormSignInForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    signIn("credentials", {
      email: values.email,
      password: values.password,
      callbackUrl: "/dashboard",
    });
  }

  const [passwordVisible, setPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  return (
    <>
      {/* Hero Sign-In Form */}
      <div className="relative bg-gradient-to-bl from-primary-foreground via-primary-foreground to-background">
        <div className="container py-24 sm:py-32">
          {/* Grid */}
          <div className="grid items-center md:grid-cols-2 gap-8 lg:gap-12">
            <div>
              <p className="inline-block text-sm font-medium bg-clip-text bg-gradient-to-l from-blue-600 to-violet-500 text-transparent dark:from-blue-400 dark:to-violet-400">
                Welcome back to Qwizelt
              </p>
              {/* Title */}
              <div className="mt-4 md:mb-12 max-w-2xl">
                <h1 className="mb-4 scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
                  Sign in and Access Your Quizzes Instantly
                </h1>
                <p className="text-xl text-muted-foreground">
                  Log in to manage, create, and share smarter quizzes
                  effortlessly.
                </p>
              </div>
              {/* End Title */}
            </div>
            {/* End Col */}
            <div>
              {/* Form */}
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                  <div className="lg:max-w-lg lg:mx-auto lg:me-0 ms-auto">
                    {/* Card */}
                    <Card>
                      <CardHeader className="text-center">
                        <h2 className="text-2xl font-semibold leading-none tracking-tight">
                          Sign in to your account
                        </h2>
                        <CardDescription>
                          Don’t have an account?{" "}
                          <Link
                            className="text-primary hover:underline underline-offset-4"
                            href="/auth/signup"
                          >
                            Sign up here
                          </Link>
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="mt-5">
                          {/* Grid */}
                          <div className="space-y-4">
                            <FormField
                              control={form.control}
                              name="email"
                              render={({ field }) => (
                                <FormItem>
                                  <FormControl>
                                    <Input {...field} placeholder="Email" />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            <FormField
                              control={form.control}
                              name="password"
                              render={({ field }) => (
                                <FormItem className="relative">
                                  <FormControl>
                                    <div className="relative">
                                      <Input
                                        {...field}
                                        type={
                                          passwordVisible ? "text" : "password"
                                        }
                                        placeholder="Password"
                                        className="pr-10" // Add padding for the eye icon
                                      />
                                      <button
                                        type="button"
                                        onClick={togglePasswordVisibility}
                                        className="absolute inset-y-0 right-2 flex items-center text-muted-foreground"
                                      >
                                        {passwordVisible ? (
                                          <EyeClosedIcon className="w-5 h-5" />
                                        ) : (
                                          <EyeIcon className="w-5 h-5" />
                                        )}
                                      </button>
                                    </div>
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            <div className="flex items-center space-x-2 mt-3">
                              <Label htmlFor="remember">
                                <input
                                  type="checkbox"
                                  id="remember"
                                  className="mr-2"
                                />
                                Remember me
                              </Label>
                            </div>
                            <Button className="mt-3 w-full">Sign In</Button>
                            <div className="text-center mt-3 text-sm">
                              <a
                                className="text-primary hover:underline"
                                href="#"
                              >
                                Forgot your password?
                              </a>
                            </div>
                          </div>
                          {/* Grid End */}
                        </div>
                      </CardContent>
                    </Card>
                    {/* End Card */}
                  </div>
                </form>
              </Form>
              {/* End Form */}
            </div>
            {/* End Col */}
          </div>
          {/* End Grid */}
        </div>
      </div>
      {/* End Hero Sign-In Form */}
    </>
  );
}
