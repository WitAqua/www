"use client";

import { useState, useEffect } from "react";
import { LuDownload, LuGithub } from "react-icons/lu";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog";
import type { Device } from "@/types/device";
import { useLanguage } from "../contexts/LanguageContext";

const translations = {
  en: {
    loading: "Loading device information...",
    error: "Error: ",
    errorTryAgain: "Please try again later or contact support.",
    changelog: "Changelog",
    latest: "Latest",
    archive: "Archive",
    images: "Images",
    installInstructions: "Install Instructions",
    maintainer: "Maintainer:",
    androidVersion: "Android",
    latestBuild: "Latest build:",
    deprecated: "Deprecated",
    deviceNotFound: "Device not found",
    fileSize: "File Size:",
  },
  ja: {
    loading: "デバイス情報を読み込んでいます...",
    error: "エラー: ",
    errorTryAgain:
      "後でもう一度お試しいただくか、サポートにお問い合わせください。",
    changelog: "変更履歴",
    latest: "最新",
    archive: "アーカイブ",
    images: "イメージ",
    installInstructions: "インストール手順",
    maintainer: "メンテナー：",
    androidVersion: "Android",
    latestBuild: "最新ビルド：",
    deprecated: "非推奨",
    deviceNotFound: "デバイスが見つかりません",
    fileSize: "ファイルサイズ:",
  },
};

interface DevicePageProps {
  codename: string;
}

export default function DevicePage({ codename }: DevicePageProps) {
  const [device, setDevice] = useState<Device | null>(null);
  const [changelog, setChangelog] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { language } = useLanguage();
  const t = translations[language];

  useEffect(() => {
    const fetchDeviceData = async () => {
      try {
        const response = await fetch(
          "https://raw.githubusercontent.com/WitAqua/WitAquaOTA/refs/heads/main/data/devices.json",
        );
        if (!response.ok) {
          throw new Error(
            `Failed to fetch devices data. Status: ${response.status}`,
          );
        }
        const data = await response.json();
        const foundDevice = data.devices.find(
          (d: Device) => d.codename === codename,
        );
        if (foundDevice) {
          setDevice(foundDevice);
        } else {
          setError(t.deviceNotFound);
        }
      } catch (e) {
        console.error("Error loading device:", e);
        setError("Failed to load device data");
      } finally {
        setLoading(false);
      }
    };

    fetchDeviceData();
  }, [codename, t.deviceNotFound]);

  const handleFetchChangelog = async () => {
    try {
      const response = await fetch(
        `https://raw.githubusercontent.com/WitAqua/WitAquaOTA/refs/heads/main/changelog/${codename}`,
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const text = await response.text();
      setChangelog(text);
    } catch (error) {
      console.error("Error fetching changelog:", error);
      setChangelog(
        `Failed to load changelog for ${device?.name} (${codename}). Please try again later.`,
      );
    }
  };

  const handleButtonClick = (url: string) => {
    window.open(url, "_blank");
  };

  if (loading) return <div className="text-center py-8">{t.loading}</div>;
  if (error)
    return (
      <div className="text-center text-red-500 py-8">
        {t.error} {error}. {t.errorTryAgain}
      </div>
    );
  if (!device)
    return <div className="text-center py-8">{t.deviceNotFound}</div>;

  return (
    <div className="container py-6 px-4 sm:px-6 lg:px-8 mx-auto">
      <div className="bg-card p-8 rounded-lg shadow-md">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <div>
            <h1 className="text-4xl font-bold mb-2 flex items-center">
              {device.name}
              {device.deprecated && (
                <span className="ml-3 text-sm bg-yellow-200 text-yellow-800 py-1 px-3 rounded-full">
                  {t.deprecated}
                </span>
              )}
            </h1>
            <p className="text-xl text-muted-foreground">{device.codename}</p>
          </div>
        </div>
        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-2">{t.maintainer}</h2>
          <p className="text-lg flex items-center">
            {device.maintainer.name}
            {device.maintainer.github && (
              <a
                href={`https://github.com/${device.maintainer.github}`}
                target="_blank"
                rel="noopener noreferrer"
                className="ml-2 text-primary hover:text-primary-focus"
              >
                <LuGithub className="inline h-5 w-5 text-cyan-400" />
              </a>
            )}
          </p>
        </div>
        <div className="mb-6">
          <p className="text-l font-bold">
            {t.fileSize}
            <span className="font-normal">
              {(device.size / 1024 ** 3).toPrecision(2)} GB
            </span>
          </p>
          <p className="text-l font-bold break-all">
            {"MD5: "}
            <span className="font-mono font-normal select-all break-all">
              {device.md5}
            </span>
          </p>

          <p className="text-l font-bold">
            {t.androidVersion}
            {": "}
            <span className="font-bold">
              {device.latestAndroidVersion.toString().includes(".")
                ? `${device.latestAndroidVersion.toString().split(".")[0]} (QPR${device.latestAndroidVersion.toString().split(".")[1]})`
                : device.latestAndroidVersion}
            </span>
          </p>
          <p className="text-l font-bold">
            {t.latestBuild}{" "}
            <span className="font-normal">
              {new Date(device.datetime * 1000).toLocaleDateString(
                window.location.pathname.startsWith("/ja") ? "ja-JP" : "en-US",
                {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                },
              )}
            </span>
          </p>
        </div>
        <div className="flex flex-wrap gap-4">
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" onClick={handleFetchChangelog}>
                {t.changelog}
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>{t.changelog}</DialogTitle>
                <DialogDescription asChild>
                  <div className="mt-2">
                    <pre className="whitespace-pre-wrap font-mono text-sm">
                      {changelog}
                    </pre>
                  </div>
                </DialogDescription>
              </DialogHeader>
            </DialogContent>
          </Dialog>
          <Button
            onClick={() => handleButtonClick(device.downloadUrl)}
            className="bg-cyan-400 hover:bg-cyan-600 flex items-center max-w-[300px] sm:max-w-[200px] lg:max-w-[250px] overflow-hidden"
          >
            <div className="overflow-hidden whitespace-nowrap flex-1 min-w-0 relative">
              <span className="inline-block animate-marquee">
                {device.filename}
              </span>
            </div>
            <LuDownload className="flex-shrink-0 ml-2 h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            onClick={() => handleButtonClick(device.archiveUrl)}
          >
            <LuDownload className="mr-2 h-4 w-4" />
            {t.archive}
          </Button>
          <Button
            variant="outline"
            onClick={() => handleButtonClick(device.imgsUrl)}
          >
            <LuDownload className="mr-2 h-4 w-4" />
            {t.images}
          </Button>
          {device.installUrl && (
            <Button
              variant="outline"
              onClick={() => handleButtonClick(device.installUrl)}
            >
              {t.installInstructions}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
