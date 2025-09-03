import { RefererRepository } from '@/domaines/compte/ports/referer.repository';

export class RefererRepositoryMock implements RefererRepository {
  constructor(
    private referer: string,
    private refererKeyword: string,
  ) {}

  enregistrerLeReferer(referer: string, refererKeyword?: string): void {
    this.referer = referer;
    if (refererKeyword) this.refererKeyword = refererKeyword;
  }

  recupererLeReferer(): { referer: string; refererKeyword: string } {
    return {
      referer: this.referer,
      refererKeyword: this.refererKeyword,
    };
  }

  reinitialiserLeReferer() {}
}
