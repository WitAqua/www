import DevicesPage from "@/components/devices";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Supported Devices",
};

export default function Devices() {
  return <DevicesPage lang="en" />;
}
