import { Referer, RefererRepository } from '@/domaines/compte/ports/referer.repository';
import { refererStore } from '@/store/refererStore';

export class RefererRepositoryStore implements RefererRepository {
  enregistrerLeReferer(referer: string, refererKeyword?: string) {
    const store = refererStore();
    store.referer = referer;
    if (refererKeyword) store.refererKeyword = refererKeyword;
  }

  recupererLeReferer(): Referer | undefined {
    const store = refererStore();
    return { refererKeyword: store.refererKeyword, referer: store.referer };
  }

  reinitialiserLeReferer() {
    const store = refererStore();
    store.reset();
  }
}
