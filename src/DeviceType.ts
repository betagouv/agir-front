export enum DeviceType {
  MOBILE = "MOBILE",
  TABLET = "TABLET",
  DESKTOP = "DESKTOP",
}
export function getDeviceType() {
  const innerWidth = window.innerWidth;
  if (innerWidth < 550) {
    return DeviceType.MOBILE;
  } else if (innerWidth > 550 && innerWidth < 950) {
    return DeviceType.TABLET;
  } else {
    return DeviceType.DESKTOP;
  }
}
