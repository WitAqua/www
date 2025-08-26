import type { Device } from "@/types/device";

// Remote data shapes
interface OemDevice {
  model: string;
  name: string;
}

interface OemEntry {
  name: string;
  devices: OemDevice[];
}

interface BuildFileEntry {
  date: string;
  filename: string;
  filepath: string;
  sha256: string;
  size: number;
}

interface BuildEntry {
  date: string;
  datetime: number;
  files: BuildFileEntry[];
  version: string;
}

type BuildsData = Record<string, BuildEntry[]>;

interface LatestBuildSummary {
  datetime: number;
  filename: string;
  filepath: string;
  size: number;
  androidVersion: number;
  sha256: string;
}

export async function fetchDevicesData(): Promise<Device[]> {
  try {
    const [oemsRes, buildsRes] = await Promise.all([
      fetch("https://api.witaqua.org/api/v2/oems"),
      fetch("https://download.witaqua.org/builds/builds.json"),
    ]);

    if (!oemsRes.ok) {
      throw new Error(`Failed to fetch OEMs. Status: ${oemsRes.status}`);
    }
    if (!buildsRes.ok) {
      throw new Error(`Failed to fetch builds. Status: ${buildsRes.status}`);
    }

    const oemsData: OemEntry[] = await oemsRes.json();
    const buildsData: BuildsData = await buildsRes.json();

    // Build a map from codename -> latest build info
    const latestByCodename = new Map<string, LatestBuildSummary>();

    for (const [codename, buildEntries] of Object.entries(buildsData)) {
      if (!Array.isArray(buildEntries) || buildEntries.length === 0) continue;
      
      // pick the entry with max datetime
      const latestEntry = buildEntries.reduce((a, b) =>
        a.datetime >= b.datetime ? a : b,
      );
      const latestFile = latestEntry.files?.[0] as BuildFileEntry | undefined;
      if (!latestFile) continue;
      
      // android version prefix is the first directory in filepath, e.g. "/15.2/..."
      let androidVersion = 0;
      const match = latestFile.filepath.match(/^\/(\d+)(?:\.(\d+))?\//);
      if (match) {
        const major = Number(match[1]);
        const minor = match[2] ? Number(match[2]) : 0;
        androidVersion = Number(`${major}${minor > 0 ? "." + minor : ""}`);
      }

      latestByCodename.set(codename, {
        datetime: latestEntry.datetime,
        filename: latestFile.filename,
        filepath: latestFile.filepath,
        size: latestFile.size,
        androidVersion,
        sha256: latestFile.sha256,
      });
    }

    // Compose Device[] by joining OEM device list with latest builds
    const composedDevices: Device[] = [];
    for (const oem of oemsData) {
      for (const dev of oem.devices || []) {
        const code = dev.model;
        const latest = latestByCodename.get(code);
        
        if (latest) {
          // Device has builds available
          composedDevices.push({
            name: dev.name,
            codename: code,
            size: latest.size,
            sha256: latest.sha256,
            brand: oem.name,
            maintainer: { name: "" },
            downloadUrl: `https://download.witaqua.org/builds${latest.filepath}`,
            deprecated: false,
            latestAndroidVersion: latest.androidVersion,
            archiveUrl: `https://download.witaqua.org/builds/${latest.androidVersion}/${code}`,
            imgsUrl: `https://download.witaqua.org/builds${latest.filepath.replace(latest.filename, '')}`,
            installUrl: `https://wiki.witaqua.org/devices/${code}`,
            filename: latest.filename,
            datetime: latest.datetime,
          });
        } else {
          // Device exists in OEM list but has no builds yet
          composedDevices.push({
            name: dev.name,
            codename: code,
            size: 0,
            sha256: "",
            brand: oem.name,
            maintainer: { name: "" },
            downloadUrl: "",
            deprecated: false,
            latestAndroidVersion: 0,
            archiveUrl: "",
            imgsUrl: "",
            installUrl: "",
            filename: "",
            datetime: 0,
          });
        }
      }
    }

    // sort by Android version (newest first), then by brand and name
    composedDevices.sort((a, b) => {
      // First sort by Android version (descending - newest first)
      if (a.latestAndroidVersion !== b.latestAndroidVersion) {
        return b.latestAndroidVersion - a.latestAndroidVersion;
      }
      // Then by brand
      const brandCompare = a.brand.localeCompare(b.brand);
      if (brandCompare !== 0) {
        return brandCompare;
      }
      // Finally by device name
      return a.name.localeCompare(b.name);
    });

    return composedDevices;
  } catch (error) {
    console.error('Error fetching device data:', error);
    throw new Error('Failed to fetch device data');
  }
}
