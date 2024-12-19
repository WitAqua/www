export interface Device {
  name: string
  codename: string
  brand: string
  maintainer: {
    name: string
    github?: string
  }
  downloadUrl: string
  deprecated: boolean
  latestAndroidVersion: number
  latestBuildDate: string
  archiveUrl: string
  imgsUrl: string
  installUrl: string
}

export interface DeviceResponse {
  devices: Device[]
}

