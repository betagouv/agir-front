export function calculerSeuils(nombreDeParts: number) {
  const revenuMin = Math.floor(nombreDeParts * 6358);
  const revenuMax = Math.floor(nombreDeParts * 14089);

  return [
    {
      label: `Moins de ${revenuMin.toLocaleString('fr')} €`,
      value: '0',
    },
    {
      label: `De ${revenuMin.toLocaleString('fr')} à ${revenuMax.toLocaleString('fr')} €`,
      value: `${revenuMin}`,
    },
    {
      label: `Plus de ${revenuMax.toLocaleString('fr')} €`,
      value: `${revenuMax}`,
    },
  ];
}
