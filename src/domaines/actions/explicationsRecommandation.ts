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

  public doiventEtreAffiches(): boolean {
    return !this.estExclu && this.listeExplications?.length > 0;
  }
}
