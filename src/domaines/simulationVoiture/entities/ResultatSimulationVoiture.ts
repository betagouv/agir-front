export class Voiture {
  constructor(
    private readonly cout: number,
    private readonly empreinte: number,
    private readonly gabarit: string,
    private readonly motorisation: string,
    private readonly carburant: string,
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
}

export class VoitureActuelle extends Voiture {
  public getDifferenceCountAnnuel(voiture: Voiture): number {
    return Math.round(voiture.getCout() - this.getCout());
  }

  public getPourcentageDifferenceEmission(voiture: Voiture): number {
    return Math.round(((voiture.getEmpreinte() - this.getEmpreinte()) / this.getEmpreinte()) * 100);
  }
}

export class VoitureAlternative extends Voiture {
  constructor(
    cout: number,
    empreinte: number,
    gabarit: string,
    motorisation: string,
    carburant: string,
    private readonly label: string,
  ) {
    super(cout, empreinte, gabarit, motorisation, carburant);
  }

  public getLabel(): string {
    return this.label;
  }
}

export class ResultatSimulationVoiture {
  constructor(
    private readonly voitureActuelle: VoitureActuelle,
    private readonly voituresAlternative: VoitureAlternative[],
  ) {}

  public getVoitureActuelle(): VoitureActuelle {
    return this.voitureActuelle;
  }

  public getVoitureLaPLusEconomique(): VoitureAlternative {
    return this.voituresAlternative.reduce((prev, current) => (current.getCout() < prev.getCout() ? current : prev));
  }

  public getVoitureLaPLusEcologique(): VoitureAlternative {
    return this.voituresAlternative.reduce((prev, current) =>
      current.getEmpreinte() < prev.getEmpreinte() ? current : prev,
    );
  }
}
