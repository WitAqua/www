"use client";

import { useState, useEffect } from "react";
import { LuSearch } from "react-icons/lu";
import { TbAlertTriangle } from "react-icons/tb";
import { Input } from "@/components/ui/input";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import type { Device } from "@/types/device";
import { useLanguage } from "../contexts/LanguageContext";
import { useRouter } from "next/navigation";
import type React from "react";

const translations = {
  en: {
    searchDevices: "Search devices...",
    loading: "Loading devices...",
    error: "Error: ",
    errorTryAgain: "Please try again later or contact support.",
    androidVersion: "Android",
    latestBuild: "Latest build:",
  },
  ja: {
    searchDevices: "デバイスを検索...",
    loading: "デバイスを読み込んでいます...",
    error: "エラー: ",
    errorTryAgain:
      "後でもう一度お試しいただくか、サポートにお問い合わせください。",
    androidVersion: "Android",
    latestBuild: "最新ビルド：",
  },
};

interface DevicesPageProps {
  lang?: string;
}

export default function DevicesPage({ lang }: DevicesPageProps) {
  const [devices, setDevices] = useState<Device[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { language } = useLanguage();
  const currentLang = lang || language;
  const t = translations[currentLang as keyof typeof translations];

  const [openSections, setOpenSections] = useState<string[]>([]);

  useEffect(() => {
    const fetchDevicesData = async () => {
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
        setDevices(data.devices);
      } catch (e) {
        console.error("Error loading devices:", e);
        setError("Failed to load data");
      } finally {
        setLoading(false);
      }
    };

    fetchDevicesData();
  }, []);

  useEffect(() => {
    if (searchQuery) {
      const matchedBrands = new Set(
        devices
          .filter(
            (device) =>
              device.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
              device.codename
                .toLowerCase()
                .includes(searchQuery.toLowerCase()) ||
              device.brand.toLowerCase().includes(searchQuery.toLowerCase()),
          )
          .map((device) => device.brand),
      );
      setOpenSections(Array.from(matchedBrands));
    } else {
      setOpenSections([]);
    }
  }, [searchQuery, devices]);

  const filteredDevices = devices.filter(
    (device) =>
      device.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      device.codename.toLowerCase().includes(searchQuery.toLowerCase()) ||
      device.brand.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const categorizedDevices = filteredDevices.reduce(
    (acc, device) => {
      if (!acc[device.brand]) {
        acc[device.brand] = [];
      }
      acc[device.brand].push(device);
      return acc;
    },
    {} as Record<string, Device[]>,
  );

  return (
    <div className="container py-6 px-4 sm:px-6 lg:px-8 mx-auto">
      <div className="flex flex-col gap-6">
        <div className="relative flex items-center">
          <LuSearch className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder={t.searchDevices}
            className="pl-10 w-full"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {loading ? (
          <div className="text-center">{t.loading}</div>
        ) : error ? (
          <div className="text-center text-red-500">
            {t.error} {error}. {t.errorTryAgain}
          </div>
        ) : (
          <Accordion
            type="multiple"
            className="w-full"
            value={openSections}
            onValueChange={setOpenSections}
          >
            {Object.entries(categorizedDevices).map(([brand, devices]) => (
              <AccordionItem key={brand} value={brand}>
                <AccordionTrigger className="text-lg">{brand}</AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-2">
                    {devices.map((device) => (
                      <DeviceListItem
                        key={device.codename}
                        device={device}
                        lang={currentLang}
                      />
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        )}
      </div>
    </div>
  );
}

interface DeviceListItemProps {
  device: Device;
  lang: string;
}

function DeviceListItem({ device, lang }: DeviceListItemProps) {
  const { language } = useLanguage();
  const currentLang = lang || language;
  const t = translations[currentLang as keyof typeof translations];
  const router = useRouter();

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    e.preventDefault();
    const path =
      currentLang === "en"
        ? `/devices/${device.codename}`
        : `/ja/devices/${device.codename}`;
    router.push(path);
  };

  return (
    <a
      href={`/devices/${device.codename}`}
      onClick={handleClick}
      className="block"
    >
      <div
        className={`flex flex-col sm:flex-row justify-between w-full p-4 rounded-lg ${
          device.deprecated
            ? "bg-yellow-100 dark:bg-yellow-900"
            : "hover:bg-accent"
        }`}
      >
        <div className="flex flex-col">
          <div className="flex items-center">
            <span className="font-medium">{device.name}</span>
            {device.deprecated && (
              <TbAlertTriangle className="ml-2 h-4 w-4 text-yellow-600 dark:text-yellow-400" />
            )}
          </div>
          <span className="text-sm text-muted-foreground">
            {device.codename}
          </span>
          <span className="text-sm text-muted-foreground">
            {t.androidVersion}{" "}
            {device.latestAndroidVersion.toString().includes(".")
              ? `${device.latestAndroidVersion.toString().split(".")[0]} (QPR${device.latestAndroidVersion.toString().split(".")[1]})`
              : device.latestAndroidVersion}{" "}
            | {t.latestBuild}{" "}
            {new Date(device.datetime * 1000).toLocaleDateString()}
          </span>
        </div>
      </div>
    </a>
  );
}
