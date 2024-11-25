"use client";

import * as React from "react";

import * as z from "zod";

import { cn } from "@/lib/utils";

import EmailSignin from "./email-signin";
import EmailSignup from "./email-signup";
import GithubSignin from "./github-signin";
import GoogleSignin from "./google-signin";

export const userAuthSchema = z.object({
  email: z.string().email(),
});

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  isRegister?: boolean;
}

export function UserAuthForm({
  isRegister = true,
  className,
  ...props
}: Props) {
  return (
    <div className={cn("grid gap-6", className)} {...props}>
      {isRegister ? <EmailSignup /> : <EmailSignin />}

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            Or continue with
          </span>
        </div>
      </div>

      <GoogleSignin />
      <GithubSignin />
    </div>
  );
}
