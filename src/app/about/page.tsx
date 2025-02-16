import AboutPage from "../../components/about-page";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description: "About WitAqua.",
};

export default function About() {
  return <AboutPage lang="en" />;
}
