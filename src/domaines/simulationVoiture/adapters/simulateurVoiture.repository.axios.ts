import { AxiosFactory, intercept401 } from '@/axios.factory';
import {
  ResultatSimulationVoiture,
  VoitureActuelle,
  VoitureAlternative,
} from '@/domaines/simulationVoiture/entities/ResultatSimulationVoiture';
import { SimulationVoitureRepository } from '@/domaines/simulationVoiture/ports/simulateurVoiture.repository';

type VoitureActuelleAPIModel = {
  couts: number;
  empreinte: 0;
  gabarit: {
    valeur: string;
    label: 'Monospace';
  };
  motorisation: {
    valeur: string;
    label: string;
  };
  carburant: {
    valeur: string;
    label: string;
  };
};

type VoitureAlternativeAPIModel = {
  couts: number;
  empreinte: 0;
  gabarit: {
    valeur: string;
    label: string;
  };
  motorisation: {
    valeur: string;
    label: string;
  };
  carburant?: {
    valeur: string;
    label: string;
  };
  type: string;
  titre: string;
};

export class SimulateurVoitureRepositoryAxios implements SimulationVoitureRepository {
  @intercept401()
  async recupererResultats(utilisateurId: string): Promise<ResultatSimulationVoiture> {
    const axios = AxiosFactory.getAxios();

    const [voitureActuelleResponse, voituresAlternativesResponse] = await Promise.all([
      axios.get<VoitureActuelleAPIModel>(`/utilisateurs/${utilisateurId}/simulateur_voiture/resultat/voiture_actuelle`),
      axios.get<VoitureAlternativeAPIModel[]>(
        `/utilisateurs/${utilisateurId}/simulateur_voiture/resultat/alternatives`,
      ),
    ]);

    const voitureActuelleData = voitureActuelleResponse.data;
    const voituresAlternativesData = voituresAlternativesResponse.data;

    const voitureActuelle = new VoitureActuelle(
      voitureActuelleData.couts,
      voitureActuelleData.empreinte,
      voitureActuelleData.gabarit.label,
      voitureActuelleData.motorisation.label,
      voitureActuelleData.carburant?.label || '',
    );

    const voituresAlternatives = voituresAlternativesData.map(
      voiture =>
        new VoitureAlternative(
          voiture.couts,
          voiture.empreinte,
          voiture.gabarit.label,
          voiture.motorisation.label,
          voiture.carburant?.label || '',
          voiture.titre,
        ),
    );

    return new ResultatSimulationVoiture(voitureActuelle, voituresAlternatives);
  }
}
