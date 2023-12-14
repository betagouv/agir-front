export const calculerCouleurJauge = (valeur: number) => {
  switch (valeur) {
    case 1:
      return '#A3A3CD';
    case 2:
      return '#8080BC';
    case 3:
      return '#5C5CAB';
    case 4:
      return '#000091';
    default:
      return '#000091';
  }
};
