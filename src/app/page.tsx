import HomePage from "../components/homepage";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Home | WitAqua",
  description:
    "WitAqua - A custom Android ROM developed by Japanese Android enthusiasts.",
};

export default function Home() {
  return <HomePage />;
}
