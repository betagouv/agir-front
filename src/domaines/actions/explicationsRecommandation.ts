interface ExplicationRecommandation {
  tag: string;
  labelExplication: string;
}

export class ExplicationsRecommandation {
  constructor(
    private readonly estExclu: boolean,
    private readonly listeExplications: ExplicationRecommandation[],
  ) {}

  get explications(): ExplicationRecommandation[] {
    return this.listeExplications;
  }

  public estRecommandee(): boolean {
    return !this.estExclu && this.listeExplications?.length > 0;
  }
}
