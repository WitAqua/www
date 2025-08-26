"use client";

import React, { useEffect, useState, useCallback } from "react";
import { LuDownload } from "react-icons/lu";
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
import { useLanguage } from "@/contexts/LanguageContext";

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
  initialDevice?: Device;
}

export default function DevicePage({ codename, initialDevice }: DevicePageProps) {
  const [device, setDevice] = useState<Device | null>(initialDevice || null);
  const [changelog, setChangelog] = useState("");
  const [loading, setLoading] = useState(!initialDevice);
  const [error, setError] = useState<string | null>(null);
  const { language } = useLanguage();
  const t = translations[language];
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (initialDevice) return;
    const fetchDeviceData = async () => {
      try {
        const { fetchDevicesData } = await import("@/lib/devices");
        const devices = await fetchDevicesData();
        const foundDevice = devices.find(
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
  }, [codename, t.deviceNotFound, initialDevice]);

  const fetchChangelog = useCallback(async () => {
    try {
      const response = await fetch("https://api.witaqua.org/api/v2/changes");
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const changes = await response.json();
      
      // Get the device's last build datetime and Android version
      const lastBuildTime = device?.datetime || 0;
      const deviceBranch = device?.latestAndroidVersion?.toString() || "";
      
      // Filter changes that are newer than the last build and from the same branch
      const recentChanges = changes
        .filter((change: { submitted: number; branch: string; subject: string }) => 
          change.submitted > lastBuildTime && 
          change.branch === deviceBranch
        )
        .map((change: { subject: string }) => change.subject)
        .join('\n');
      
      if (recentChanges.length > 0) {
        setChangelog(recentChanges);
      } else {
        setChangelog("No new changes since the last build.");
      }
    } catch (error) {
      console.error("Error fetching changelog:", error);
      setChangelog(
        `Failed to load changelog for ${device?.name} (${codename}). Please try again later.`,
      );
    }
  }, [codename, device?.name, device?.datetime, device?.latestAndroidVersion]);

  useEffect(() => {
    if (typeof window !== "undefined" && window.location.hash === "#changelog") {
      setOpen(true);
      fetchChangelog();
    }
  }, [fetchChangelog]);

  const handleFetchChangelog = async () => {
    await fetchChangelog();
    if (typeof window !== "undefined") {
      window.location.hash = "changelog";
    }
    setOpen(true);
  };

  const handleButtonClick = (url: string) => {
    if (typeof window !== "undefined") {
      window.open(url, "_blank");
    }
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
  
  // Check if device has no builds available
  const hasBuilds = device.datetime > 0;

  return (
    <div className="lg:w-[68%] md:w-[70%] py-28 px-4 sm:px-6 lg:px-8 mx-auto">
      <div className="bg-white dark:bg-[#212121] p-8 rounded-lg shadow-md">
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
        {hasBuilds ? (
          <>
            <div className="mb-6">
              <p className="text-l font-bold">
                {t.fileSize}
                <span className="font-normal">
                  {(device.size / 1024 ** 3).toPrecision(2)} GB
                </span>
              </p>
                        <p className="text-l font-bold break-all">
            {"SHA256: "}
            <span className="font-mono font-normal select-all break-all">
              {device.sha256}
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
                typeof window !== "undefined" && window.location.pathname.startsWith("/ja") ? "ja-JP" : "en-US",
                {
                  weekday: "short",
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                },
              )}
                </span>
              </p>
            </div>
          </>
        ) : (
          <div className="mb-6">
            <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4">
              <p className="text-yellow-800 dark:text-yellow-200 font-medium">
                No builds available for this device yet. Check back later for updates.
              </p>
            </div>
          </div>
        )}
        {hasBuilds && (
          <div className="flex flex-wrap gap-4">
            <Dialog
              open={open}
                          onOpenChange={(isOpen) => {
              setOpen(isOpen);
              if (!isOpen && typeof window !== "undefined") {
                window.history.replaceState(null, "", window.location.pathname);
              }
            }}
            >
              <DialogTrigger asChild>
                <Button
                  variant="ghost"
                  className="bg-[#e8eced] dark:bg-[#404040] hover:bg-[#cdd2d4] hover:dark:bg-[#303030] transition-colors duration-300"
                  onClick={handleFetchChangelog}
                >
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
              className="bg-[#00c8ff] hover:bg-[#00aeff] transition-colors duration-300 flex items-center max-w-[300px] sm:max-w-[200px] lg:max-w-[250px] overflow-hidden"
            >
              <div className="overflow-hidden whitespace-nowrap flex-1 min-w-0 relative">
                <span className="inline-block animate-marquee">
                  {device.filename}
                </span>
              </div>
              <LuDownload className="flex-shrink-0 ml-2 h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              className="bg-[#e8eced] dark:bg-[#404040] hover:bg-[#cdd2d4] hover:dark:bg-[#303030] transition-colors duration-300"
              onClick={() => handleButtonClick(device.archiveUrl)}
            >
              <LuDownload className="mr-2 h-4 w-4" />
              {t.archive}
            </Button>
            <Button
              variant="ghost"
              className="bg-[#e8eced] dark:bg-[#404040] hover:bg-[#cdd2d4] hover:dark:bg-[#303030] transition-colors duration-300"
              onClick={() => handleButtonClick(device.imgsUrl)}
            >
              <LuDownload className="mr-2 h-4 w-4" />
              {t.images}
            </Button>
            {device.installUrl && (
              <Button
                variant="ghost"
                className="bg-[#e8eced] dark:bg-[#404040] hover:bg-[#cdd2d4] hover:dark:bg-[#303030] transition-colors duration-300"
                onClick={() => handleButtonClick(device.installUrl)}
              >
                {t.installInstructions}
              </Button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
