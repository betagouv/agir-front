import { NouveauParcours } from '@/domaines/nouveauParcours/recuperationDonneesNouveauParcours.usecase';

export interface NouveauParcoursRepository {
  getNouveauParcours(codePostal: string): Promise<NouveauParcours>;
}
