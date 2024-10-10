import { BilanCarboneRepository } from '@/domaines/bilanCarbone/ports/bilanCarbone.repository';
import { BilanCarbone, BilanCompletCarbone } from '@/domaines/bilanCarbone/recupererBilanCarbone.usecase';

export class BilanCarboneRepositoryMock implements BilanCarboneRepository {
  constructor(private bilan: BilanCarbone) {}

  recupererBilanCarbone(_utilisateurId: string): Promise<BilanCarbone> {
    return Promise.resolve(this.bilan);
  }
}
