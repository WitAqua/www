"use client";

import { useState, useEffect } from "react";
import { Download, Github, Search, AlertTriangle } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog";
import type { Device } from "@/types/device";

export default function DevicesPage() {
  const [devices, setDevices] = useState<Device[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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
        setDevices(data.devices); // Assuming the JSON contains an array of devices under 'devices'
      } catch (e) {
        console.error("Error loading devices:", e);
        setError("Failed to load devices data");
      } finally {
        setLoading(false);
      }
    };

    fetchDevicesData();
  }, []);

  const filteredDevices = devices.filter(
    (device) =>
      device.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      device.codename.toLowerCase().includes(searchQuery.toLowerCase()) ||
      device.brand.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const { deprecatedDevices, activeDevices } = filteredDevices.reduce(
    (acc, device) => {
      if (device.deprecated) {
        acc.deprecatedDevices.push(device);
      } else {
        if (!acc.activeDevices[device.brand]) {
          acc.activeDevices[device.brand] = [];
        }
        acc.activeDevices[device.brand].push(device);
      }
      return acc;
    },
    { deprecatedDevices: [], activeDevices: {} } as {
      deprecatedDevices: Device[];
      activeDevices: Record<string, Device[]>;
    },
  );

  return (
    <div className="container py-6 px-4 sm:px-6 lg:px-8 mx-auto">
      <div className="flex flex-col gap-6">
        <div className="relative flex items-center">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search devices..."
            className="pl-10 w-full"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {loading ? (
          <div className="text-center">Loading devices...</div>
        ) : error ? (
          <div className="text-center text-red-500">
            Error: {error}. Please try again later or contact support.
          </div>
        ) : (
          <Accordion type="multiple" className="w-full">
            {Object.entries(activeDevices).map(([brand, devices]) => (
              <AccordionItem key={brand} value={brand}>
                <AccordionTrigger className="text-lg">{brand}</AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-2">
                    {devices.map((device) => (
                      <DeviceItem key={device.codename} device={device} />
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
            {deprecatedDevices.length > 0 && (
              <AccordionItem value="deprecated">
                <AccordionTrigger className="text-lg text-yellow-600 dark:text-yellow-400">
                  Deprecated Devices
                </AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-2">
                    {deprecatedDevices.map((device) => (
                      <DeviceItem key={device.codename} device={device} />
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
            )}
          </Accordion>
        )}
      </div>
    </div>
  );
}

function DeviceItem({ device }: { device: Device }) {
  const [changelog, setChangelog] = useState("");

  const handleFetchChangelog = async () => {
    try {
      const response = await fetch(
        `https://raw.githubusercontent.com/WitAqua/WitAquaOTA/refs/heads/main/changelog/${device.codename}`,
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const text = await response.text();
      setChangelog(text);
    } catch (error) {
      console.error("Error fetching changelog:", error);
      setChangelog(
        `Failed to load changelog for ${device.name} (${device.codename}). Please try again later.`,
      );
    }
  };

  return (
    <div
      className={`flex flex-col sm:flex-row justify-between w-full p-4 rounded-lg ${device.deprecated ? "bg-yellow-100 dark:bg-yellow-900" : "hover:bg-muted"}`}
    >
      <div className="flex flex-col">
        <div className="flex items-center">
          <span className="font-medium">{device.name}</span>
          {device.deprecated && (
            <AlertTriangle className="ml-2 h-4 w-4 text-yellow-600 dark:text-yellow-400" />
          )}
        </div>
        <span className="text-sm text-muted-foreground">{device.codename}</span>
        <span className="text-sm text-muted-foreground">
          Android {device.latestAndroidVersion} | Latest build:{" "}
          {device.latestBuildDate}
        </span>
        <div className="flex items-center mt-1">
          <span className="text-sm text-muted-foreground mr-2">
            Maintainer: {device.maintainer.name}
          </span>
          {device.maintainer.github && (
            <a
              href={`https://github.com/${device.maintainer.github}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:text-primary-focus"
            >
              <Github className="h-4 w-4" />
            </a>
          )}
        </div>
      </div>
      <div className="flex items-center gap-2 mt-2 sm:mt-0 overflow-x-auto">
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline" size="sm" onClick={handleFetchChangelog}>
              Changelog
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Changelog for {device.name}</DialogTitle>
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
          size="sm"
          onClick={() => window.open(device.downloadUrl, "_blank")}
        >
          <Download className="mr-2 h-4 w-4" />
          Latest
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => window.open(`${device.archiveUrl}`, "_blank")}
        >
          <Download className="mr-2 h-4 w-4" />
          Archive
        </Button>

        <Button
          variant="outline"
          size="sm"
          onClick={() => window.open(`${device.imgsUrl}`, "_blank")}
        >
          <Download className="mr-2 h-4 w-4" />
          Images
        </Button>

        {device.installUrl && (
          <Button
            variant="outline"
            size="sm"
            onClick={() => window.open(device.installUrl, "_blank")}
          >
            Install Instructions
          </Button>
        )}
      </div>
    </div>
  );
}
