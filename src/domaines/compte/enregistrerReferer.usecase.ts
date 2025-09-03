import { RefererRepository } from '@/domaines/compte/ports/referer.repository';

export class EnregistrerRefererUsecase {
  constructor(private refererRepository: RefererRepository) {}

  execute(referer: string, refererKeyword?: string) {
    this.refererRepository.enregistrerLeReferer(referer, refererKeyword);
  }
}
