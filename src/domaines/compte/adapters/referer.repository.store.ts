import { Referer, RefererRepository } from '@/domaines/compte/ports/referer.repository';
import { refererStore } from '@/store/refererStore';

export class RefererRepositoryStore implements RefererRepository {
  enregistrerLeReferer(referer: string, refererKeyword?: string) {
    const store = refererStore();
    store.setReferer(referer);
    if (refererKeyword) store.setRefererKeyword(refererKeyword);
  }

  recupererLeReferer(): Referer | undefined {
    const store = refererStore();
    return store.getReferer;
  }

  reinitialiserLeReferer() {
    const store = refererStore();
    store.reset();
  }
}
