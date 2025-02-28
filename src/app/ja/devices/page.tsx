import DevicesPage from "@/components/devices";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "サポートされているデバイス",
};

export default function Devices() {
  return <DevicesPage lang="ja" />;
}
