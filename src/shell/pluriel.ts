export const gererPluriel = (nombre: number, singulier: string, pluriel: string) =>
  `${nombre === 1 ? singulier : pluriel}`;
