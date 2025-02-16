import DevicePage from "../../../../components/device-page";
import type { Metadata } from "next";

interface Props {
  params: Promise<{ codename: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { codename } = await params;
  return {
    title: `デバイス: ${codename} | WitAqua`,
  };
}

export default async function DeviceDetailPage({ params }: Props) {
  const { codename } = await params;
  return <DevicePage codename={codename} />;
}
