interface Collectivite {
  codeInsee: string;
  nom: string;
}

export class Collectivites {
  constructor(
    private collectivites: Collectivite[],
    private limite: number,
  ) {}

  limiteAtteinte(): boolean {
    return this.collectivites.length > this.limite;
  }

  aucuneCollectiviteTrouvee(): boolean {
    return this.collectivites.length === 0;
  }

  trierParNom(reference: string): Collectivites {
    reference = reference.toLowerCase();
    this.collectivites.sort((a, b) => {
      const nomA = a.nom.toLowerCase();
      const nomB = b.nom.toLowerCase();

      if (nomA === reference && nomB !== reference) return -1;
      if (nomB === reference && nomA !== reference) return 1;

      const startsWithA = nomA.startsWith(reference);
      const startsWithB = nomB.startsWith(reference);
      if (startsWithA && !startsWithB) return -1;
      if (startsWithB && !startsWithA) return 1;

      return nomA.localeCompare(nomB);
    });
    return this;
  }

  getCollectivites(): Collectivite[] {
    return this.collectivites.slice(0, this.limite);
  }
}
