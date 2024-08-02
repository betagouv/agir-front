import { BilanCarbone } from '@/domaines/bilanCarbone/recupererBilanCarbone.usecase';

export interface BilanCarboneRepository {
  recupererBilanCarbone(utilisateurId: string): Promise<BilanCarbone>;
}
