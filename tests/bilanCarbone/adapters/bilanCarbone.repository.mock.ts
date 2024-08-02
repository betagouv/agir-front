import { BilanCarboneRepository } from '@/domaines/bilanCarbone/ports/bilanCarbone.repository';
import { BilanCarbone } from '@/domaines/bilanCarbone/recupererBilanCarbone.usecase';

export class BilanCarboneRepositoryMock implements BilanCarboneRepository {
  constructor(private bilanCarboneARetourner: BilanCarbone) {}

  recupererBilanCarbone(_utilisateurId: string): Promise<BilanCarbone> {
    return Promise.resolve(this.bilanCarboneARetourner);
  }
}
