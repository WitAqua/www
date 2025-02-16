import HomePage from "../../components/homepage";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "ホーム | WitAqua",
  description:
    "WitAqua - 日本のAndroid愛好家によって開発されたカスタムAndroid ROM。",
};

export default function Home() {
  return <HomePage />;
}
