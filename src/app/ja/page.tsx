import HomePage from "../../components/homepage";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "ホーム | WitAqua",
  description: "Minimal, Liquid, Android",
};

export default function Home() {
  return <HomePage />;
}
