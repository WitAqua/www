import AboutPage from "../../../components/about-page";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "私たちについて",
  description: "WitAquaについて。",
};

export default function About() {
  return <AboutPage lang="ja" />;
}
