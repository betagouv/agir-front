export class VoitureParam {
  constructor(
    private readonly id: string,
    private readonly nom: string,
    private readonly valeur: string,
    private readonly unite?: string,
  ) {}

  public getId(): string {
    return this.id;
  }

  public getNom(): string {
    return this.nom;
  }

  public getValeur(): string {
    return this.valeur;
  }

  public getUnite(): string | undefined {
    return this.unite;
  }
}

export class Voiture {
  constructor(
    private readonly cout: number,
    private readonly empreinte: number,
    private readonly gabarit: string,
    private readonly motorisation: string,
    private readonly carburant: string,
    private readonly params: VoitureParam[] = [],
    private readonly isOccasion: boolean,
  ) {}

  public getCout(): number {
    return this.cout;
  }

  public getEmpreinte(): number {
    return this.empreinte;
  }

  public getGabarit(): string {
    return this.gabarit;
  }

  public getMotorisation(): string {
    return this.motorisation;
  }

  public getCarburant(): string {
    return this.carburant;
  }

  public getParams(): VoitureParam[] {
    return this.params;
  }

  public getIsOccasion(): boolean {
    return this.isOccasion;
  }
}

export class VoitureActuelle extends Voiture {}

export class VoitureAlternative extends Voiture {
  constructor(
    cout: number,
    empreinte: number,
    gabarit: string,
    motorisation: string,
    carburant: string,
    est_occasion: boolean,
    private readonly label: string,
    private readonly differenceEmission: number,
    private readonly differenceCoutAnnuel: number,
    private readonly coutAchatNet: number,
    private readonly prixAchat: number,
    private readonly valeurReventeVoitureActuelle: number,
    private readonly montantAides: number,
    private readonly dureeSeuilRentabilite: number,
    private readonly economiesTotales: number,
  ) {
    super(cout, empreinte, gabarit, motorisation, carburant, [], est_occasion);
  }

  public getLabel(): string {
    return this.label + (this.getIsOccasion() ? " d'occasion" : '');
  }

  public getDifferenceEmission(): number {
    return this.differenceEmission;
  }

  public getDifferenceCoutAnnuel(): number {
    return this.differenceCoutAnnuel;
  }

  public getCoutAchatNet(): number {
    return this.coutAchatNet;
  }

  public getPrixAchat(): number {
    return this.prixAchat;
  }

  public getValeurReventeVoitureActuelle(): number {
    return this.valeurReventeVoitureActuelle;
  }

  public getMontantAides(): number {
    return this.montantAides;
  }

  public getDureeSeuilRentabilite(): number {
    return this.dureeSeuilRentabilite;
  }

  public getEconomiesTotales(): number {
    return this.economiesTotales;
  }
}

export class ResultatSimulationVoiture {
  private voituresAlternativeMemeGabarit: VoitureAlternative[] = [];

  constructor(
    private readonly voitureActuelle: VoitureActuelle,
    private readonly voituresAlternative: VoitureAlternative[],
  ) {
    this.voituresAlternativeMemeGabarit = this.voituresAlternative.filter(
      voiture => voiture.getGabarit() === this.voitureActuelle.getGabarit(),
    );
  }

  public getVoitureActuelle(): VoitureActuelle {
    return this.voitureActuelle;
  }

  public getVoitureLaPLusEconomique(): VoitureAlternative {
    return this.voituresAlternativeMemeGabarit.reduce((prev, current) =>
      current.getCout() < prev.getCout() ? current : prev,
    );
  }

  public getVoitureLaPLusEcologique(): VoitureAlternative {
    return this.voituresAlternativeMemeGabarit.reduce((prev, current) =>
      current.getEmpreinte() < prev.getEmpreinte() ? current : prev,
    );
  }
}
