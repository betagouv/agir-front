// DSFR grille et points de rupture
// https://www.systeme-de-design.gouv.fr/elements-d-interface/fondamentaux-techniques/grille-et-points-de-rupture

export enum DeviceType {
  MOBILE = 'MOBILE',
  TABLET = 'TABLET',
  DESKTOP = 'DESKTOP',
}
export function getDeviceType() {
  const innerWidth = window.innerWidth;
  if (innerWidth < 576) {
    return DeviceType.MOBILE; // XS
  } else if (innerWidth >= 576 && innerWidth < 992) {
    return DeviceType.TABLET; // SM & MD
  } else {
    return DeviceType.DESKTOP; // LG & XL
  }
}
