import { AxiosFactory, intercept40X } from '@/axios.factory';
import {
  ResultatSimulationVoiture,
  VoitureActuelle,
  VoitureAlternative,
  VoitureParam,
} from '@/domaines/simulationVoiture/entities/ResultatSimulationVoiture';
import { SimulationVoitureRepository } from '@/domaines/simulationVoiture/ports/simulateurVoiture.repository';

type VoitureParamsAPIModel = {
  id: string;
  nom: string;
  valeur: string;
  unite?: string;
};

type ValeurCalculeeAPIModel<T> = {
  valeur: T;
  label: string;
  unite?: string;
  est_applicable?: boolean;
};

type VoitureActuelleAPIModel = {
  couts: number;
  empreinte: number;
  est_occasion: boolean;
  gabarit: ValeurCalculeeAPIModel<'moyenne' | 'petite' | 'berline' | 'SUV' | 'VUL'>;
  motorisation: ValeurCalculeeAPIModel<'électrique' | 'thermique' | 'hybride'>;
  carburant: ValeurCalculeeAPIModel<'gazole B7 ou B10' | 'essence E5 ou E10' | 'essence E85' | 'GPL'>;
  params: VoitureParamsAPIModel[];
};

type VoitureAlternativeAPIModel = VoitureActuelleAPIModel & {
  type: 'voiture-individuelle';
  titre: string;
  diff_emissions: number;
  diff_couts: number;
  cout_achat_net: ValeurCalculeeAPIModel<number>;
  prix_achat: ValeurCalculeeAPIModel<number>;
  valeur_revente_actuelle: ValeurCalculeeAPIModel<number>;
  montant_aides: ValeurCalculeeAPIModel<number>;
  duree_seuil_rentabilite: ValeurCalculeeAPIModel<number>;
  economies_totales: ValeurCalculeeAPIModel<number>;
};

export class SimulateurVoitureRepositoryAxios implements SimulationVoitureRepository {
  @intercept40X()
  async recupererResultats(utilisateurId: string): Promise<ResultatSimulationVoiture> {
    const axios = AxiosFactory.getAxios();
    const simulateurVoitureEndpoint = `/utilisateurs/${utilisateurId}/simulateur_voiture/resultat_v2`;

    // TODO: start to show informations about the current voiture while the
    // alternatives are computed.
    const [voitureActuelleResponse, voituresAlternativesResponse] = await Promise.all([
      axios.get<VoitureActuelleAPIModel>(`${simulateurVoitureEndpoint}/voiture_actuelle`),
      axios.get<VoitureAlternativeAPIModel[]>(`${simulateurVoitureEndpoint}/alternatives`),
    ]);

    const voitureActuelleData = voitureActuelleResponse.data;
    const voituresAlternativesData = voituresAlternativesResponse.data;

    const voitureActuelle = new VoitureActuelle(
      voitureActuelleData.couts,
      voitureActuelleData.empreinte,
      voitureActuelleData.gabarit.label,
      voitureActuelleData.motorisation.label,
      voitureActuelleData.carburant?.label || '',
      voitureActuelleData.params.map(({ id, nom, valeur, unite }) => new VoitureParam(id, nom, valeur, unite)),
      voitureActuelleData.est_occasion,
    );

    const voituresAlternatives = voituresAlternativesData.map(
      voiture =>
        new VoitureAlternative(
          voiture.couts,
          voiture.empreinte,
          voiture.gabarit.label,
          voiture.motorisation.label,
          voiture.carburant?.label || '',
          voiture.est_occasion,
          voiture.titre,
          voiture.diff_emissions,
          voiture.diff_couts,
          voiture.cout_achat_net.valeur,
          voiture.prix_achat.valeur,
          voiture.valeur_revente_actuelle.valeur,
          voiture.montant_aides.valeur,
          voiture.duree_seuil_rentabilite.valeur,
          voiture.economies_totales.valeur,
        ),
    );

    return new ResultatSimulationVoiture(voitureActuelle, voituresAlternatives);
  }
}
