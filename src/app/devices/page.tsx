import DevicesPage from "@/components/devices";
import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "Supported Devices",
};

export default async function Devices() {
  const { fetchDevicesData } = await import("@/lib/devices");
  const devices = await fetchDevicesData();
  return <DevicesPage lang="en" initialDevices={devices} />;
}
