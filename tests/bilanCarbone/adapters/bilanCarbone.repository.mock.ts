import { BilanCarboneRepository } from '@/domaines/bilanCarbone/ports/bilanCarbone.repository';
import { BilanCarbone } from '@/domaines/bilanCarbone/recupererBilanCarbone.usecase';
import { ClefThematiqueAPI } from '@/domaines/thematiques/MenuThematiques';
import { BilanThematique } from '@/domaines/bilanCarbone/recupererBilanDepuisThematique.usecase';

export class BilanCarboneRepositoryMock implements BilanCarboneRepository {
  constructor(private bilan: BilanCarbone) {}

  recupererBilanCarbone(_utilisateurId: string): Promise<BilanCarbone> {
    return Promise.resolve(this.bilan);
  }

  recupererBilanDepuisThematique(idUtilisateur: string, thematique: ClefThematiqueAPI): Promise<BilanThematique> {
    throw Error;
  }
}
