"use client";

import { useSubIsPro } from "../hooks/useSubIsPro";
import LandingPage from "./LandingPage";

interface HomePageProps {
  userId: string;
  email?: string;
}

export default function HomePage({ userId, email }: HomePageProps) {
  const { isPro, loading } = useSubIsPro({ userId });
  return (
    <>
      <LandingPage isAuth isPro={isPro} />
    </>
  );
}
