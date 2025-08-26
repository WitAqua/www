import DevicePage from "@/components/codename";
import type { Metadata } from "next";

interface Props {
  params: Promise<{ codename: string }>;
}

export const dynamic = "force-static";

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { codename } = await params;
  return {
    title: `${codename}`,
  };
}

export async function generateStaticParams() {
  try {
    const { fetchDevicesData } = await import("@/lib/devices");
    const devices = await fetchDevicesData();

    return devices.map((device: { codename: string }) => ({
      codename: device.codename,
    }));
  } catch (error) {
    console.error("Error fetching or processing JSON data:", error);
    return [];
  }
}

export default async function DeviceDetailPage({ params }: Props) {
  const { codename } = await params;
  const { fetchDevicesData } = await import("@/lib/devices");
  const devices = await fetchDevicesData();
  const device = devices.find(d => d.codename === codename);
  return <DevicePage codename={codename} initialDevice={device} />;
}
