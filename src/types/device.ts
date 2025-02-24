export interface Device {
  name: string;
  codename: string;
  size: number;
  md5: number;
  brand: string;
  maintainer: {
    name: string;
    github?: string;
  };
  downloadUrl: string;
  deprecated: boolean;
  latestAndroidVersion: number;
  archiveUrl: string;
  imgsUrl: string;
  installUrl: string;
  filename: string;
  datetime: number;
}

export interface DeviceResponse {
  devices: Device[];
}
