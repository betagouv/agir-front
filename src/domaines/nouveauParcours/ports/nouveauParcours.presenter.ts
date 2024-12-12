export interface NouveauParcoursViewModel {
  nombreInscrits: number;
  nombrePointsMoyen: number;
  aides: {
    nombreAidesTotal: number;
    nombreAidesNatTotal: number;
    nombreAidesRegionTotal: number;
    nombreAidesDepartementTotal: number;
    nombreAidesCommuneTotal: number;
  };
  longueVieAuxObjets: {
    tout: number;
    donner: number;
    reparer: number;
    louer: number;
    emprunter: number;
  };
  presDeChezNous: {
    circuitCourt: number;
    epicerieSuperette: number;
    marcheLocal: number;
    zeroDechet: number;
  };
}

export interface NouveauParcoursPresenter {
  displayNouveauParcours(): void;
}
