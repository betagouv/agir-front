export function calculerSeuils(nombreDeParts: number) {
  const revenuMin = Math.floor(nombreDeParts * 6358);
  const revenuMax = Math.floor(nombreDeParts * 14089);

  return [
    {
      label: `Moins de ${revenuMin} €`,
      value: '0',
    },
    {
      label: `De ${revenuMin} à ${revenuMax} €`,
      value: `${revenuMin}`,
    },
    {
      label: `Plus de ${revenuMax} €`,
      value: `${revenuMax}`,
    },
  ];
}
