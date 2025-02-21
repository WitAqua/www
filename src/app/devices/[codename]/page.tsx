import DevicePage from "../../../components/device-page";
import type { Metadata } from "next";

interface Props {
  params: Promise<{ codename: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { codename } = await params;
  return {
    title: `${codename}`,
  };
}

export async function generateStaticParams() {
  try {
    const response = await fetch(
      "https://raw.githubusercontent.com/WitAqua/WitAquaOTA/refs/heads/main/data/devices.json",
    );
    const data = await response.json();

    if (!Array.isArray(data.devices)) {
      throw new Error("JSON data is not an array");
    }

    return data.devices.map((device: { codename: string }) => ({
      codename: device.codename,
    }));
  } catch (error) {
    console.error("Error fetching or processing JSON data:", error);
    return [];
  }
}

export default async function DeviceDetailPage({ params }: Props) {
  const { codename } = await params;
  return <DevicePage codename={codename} />;
}
