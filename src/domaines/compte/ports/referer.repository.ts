export type Referer = {
  referer: string;
  refererKeyword?: string;
};

export interface RefererRepository {
  enregistrerLeReferer(referer: string, refererKeyword?: string): void;

  recupererLeReferer(): Referer | undefined;

  reinitialiserLeReferer(): void;
}
