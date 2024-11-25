import * as React from "react";

import { cn } from "@/lib/utils";

import { Icons } from "@/components/icons";
import { buttonVariants } from "@/components/ui/button";
import { signInWithGoogle } from "../firebase/auth";
import { useRouter } from "next/navigation";

interface Props {
  disabled?: boolean;
}
function GoogleSignin({ disabled }: Props) {
  const router = useRouter();
  const [isGoogleLoading, setIsGoogleLoading] = React.useState<boolean>(false);
  return (
    <button
      type="button"
      className={cn(buttonVariants({ variant: "outline" }))}
      onClick={async () => {
        setIsGoogleLoading(true);
        const idToken = await signInWithGoogle();

        await fetch("/api/login", {
          headers: {
            Authorization: `Bearer ${idToken}`,
          },
        });

        router.push("/");
      }}
      disabled={disabled || isGoogleLoading}
    >
      {isGoogleLoading ? (
        <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
      ) : (
        <Icons.google className="mr-2 h-4 w-4" />
      )}{" "}
      Google
    </button>
  );
}

export default GoogleSignin;
