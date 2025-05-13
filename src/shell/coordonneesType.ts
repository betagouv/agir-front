export type Coordonnees = { latitude: number; longitude: number };
export type DonneesAdresseBarreDeRecherche = {
  numeroEtRueEtCodePostal: string;
  numeroEtRue: string;
  commune: string;
  departement: string;
  codePostal: string;
  codeEpci: string;
  coordonnees: Coordonnees;
  numeroRue: string;
  rue: string;
};
