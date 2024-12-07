/**
 * v0 by Vercel.
 * @see https://v0.dev/t/UpKvctprgSY
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import Link from "next/link";
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import {
  BriefcaseIcon,
  DollarSignIcon,
  HomeIcon,
  MailIcon,
  MenuIcon,
  MountainIcon,
  UserIcon,
} from "lucide-react";

export default function Component() {
  return (
    <header className="flex flex-col justify-between w-full bg-white dark:bg-gray-950 shadow-sm">
      <div className="flex items-center justify-between h-16 px-4 md:px-6">
        <Link href="#" className="flex items-center" prefetch={false}>
          <MountainIcon className="h-6 w-6" />
          <span className="sr-only">Acme Inc</span>
        </Link>
        <nav className="hidden md:flex gap-6">
          <Link
            href="#"
            className="text-sm font-medium hover:underline"
            prefetch={false}
          >
            Home
          </Link>
          <Link
            href="#"
            className="text-sm font-medium hover:underline"
            prefetch={false}
          >
            About
          </Link>
          <Link
            href="#"
            className="text-sm font-medium hover:underline"
            prefetch={false}
          >
            Features
          </Link>
          <Link
            href="#"
            className="text-sm font-medium hover:underline"
            prefetch={false}
          >
            Pricing
          </Link>
          <Link
            href="#"
            className="text-sm font-medium hover:underline"
            prefetch={false}
          >
            Contact
          </Link>
        </nav>
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="md:hidden">
              <MenuIcon className="h-6 w-6" />
              <span className="sr-only">Toggle navigation menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left">
            <div className="flex flex-col items-start gap-6 p-6">
              <Link
                href="#"
                className="text-lg font-medium hover:underline"
                prefetch={false}
              >
                Home
              </Link>
              <Link
                href="#"
                className="text-lg font-medium hover:underline"
                prefetch={false}
              >
                About
              </Link>
              <Link
                href="#"
                className="text-lg font-medium hover:underline"
                prefetch={false}
              >
                Features
              </Link>
              <Link
                href="#"
                className="text-lg font-medium hover:underline"
                prefetch={false}
              >
                Pricing
              </Link>
              <Link
                href="#"
                className="text-lg font-medium hover:underline"
                prefetch={false}
              >
                Contact
              </Link>
            </div>
          </SheetContent>
        </Sheet>
      </div>
      <div className="md:hidden">
        <nav className="flex justify-around bg-white dark:bg-gray-950 py-2 shadow-t">
          <Link
            href="#"
            className="flex flex-col items-center gap-1 text-sm font-medium"
            prefetch={false}
          >
            <HomeIcon className="h-5 w-5" />
            Home
          </Link>
          <Link
            href="#"
            className="flex flex-col items-center gap-1 text-sm font-medium"
            prefetch={false}
          >
            <UserIcon className="h-5 w-5" />
            About
          </Link>
          <Link
            href="#"
            className="flex flex-col items-center gap-1 text-sm font-medium"
            prefetch={false}
          >
            <BriefcaseIcon className="h-5 w-5" />
            Features
          </Link>
          <Link
            href="#"
            className="flex flex-col items-center gap-1 text-sm font-medium"
            prefetch={false}
          >
            <DollarSignIcon className="h-5 w-5" />
            Pricing
          </Link>
          <Link
            href="#"
            className="flex flex-col items-center gap-1 text-sm font-medium"
            prefetch={false}
          >
            <MailIcon className="h-5 w-5" />
            Contact
          </Link>
        </nav>
      </div>
    </header>
  );
}
