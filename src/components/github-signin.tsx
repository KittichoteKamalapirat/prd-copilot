import * as React from "react";

import { cn } from "@/lib/utils";

import { Icons } from "@/components/icons";
import { buttonVariants } from "@/components/ui/button";
import { signInWithGithub } from "../firebase/auth";
import { useRouter } from "next/navigation";
interface Props {
  disabled?: boolean;
}

function GithubSignin({ disabled }: Props) {
  const router = useRouter();
  const [isGitHubLoading, setIsGitHubLoading] = React.useState<boolean>(false);
  return (
    <button
      type="button"
      className={cn(buttonVariants({ variant: "outline" }))}
      onClick={async () => {
        setIsGitHubLoading(true);
        const idToken = await signInWithGithub();

        await fetch("/api/login", {
          headers: {
            Authorization: `Bearer ${idToken}`,
          },
        });

        router.push("/");
      }}
      disabled={disabled || isGitHubLoading}
    >
      {isGitHubLoading ? (
        <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
      ) : (
        <Icons.gitHub className="mr-2 h-4 w-4" />
      )}{" "}
      Github
    </button>
  );
}

export default GithubSignin;
