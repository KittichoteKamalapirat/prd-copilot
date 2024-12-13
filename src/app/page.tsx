import LandingPage from "./LandingPage";

// if isAuth => redirect to app
export default function Home() {
  return <LandingPage isAuth={false} isPro={false} />;
}
