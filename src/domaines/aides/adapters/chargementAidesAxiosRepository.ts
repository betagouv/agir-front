import { AxiosFactory, intercept401 } from '@/axios.factory';
import { Aides } from '@/domaines/aides/chargementAides.usecase';
import { ChargementAidesRepository } from '@/domaines/aides/ports/chargementAides.repository';
import { ClefThematiqueAPI, MenuThematiques } from '@/domaines/thematiques/MenuThematiques';

interface AidesApiModel {
  utilisateur_est_couvert: boolean;
  liste_aides: AideApiModel[];
}

interface AideApiModel {
  content_id: string;
  titre: string;
  contenu: string;
  url_simulateur: string;
  is_simulateur: true;
  thematiques_label: string[];
  thematiques: string[];
  montant_max: number;
  url_demande?: string;
}

export class chargementAidesAxiosRepository implements ChargementAidesRepository {
  @intercept401()
  async getAides(utilisateurId: string): Promise<Aides> {
    const axios = AxiosFactory.getAxios();
    const reponse = await axios.get<AidesApiModel>(`/utilisateurs/${utilisateurId}/aides_v2`);

    return {
      utilisateurEstCouvert: reponse.data.utilisateur_est_couvert,
      aides: reponse.data.liste_aides
        .filter(aide => {
          const thematique = aide.thematiques[0];
          return MenuThematiques.clefsThematiques.includes(thematique as ClefThematiqueAPI);
        })
        .map(aide => ({
          id: aide.content_id,
          titre: aide.titre,
          categorie: aide.thematiques_label[0],
          thematique: aide.thematiques[0] as ClefThematiqueAPI,
          contenu: aide.contenu,
          url: aide.url_simulateur,
          isSimulateur: aide.is_simulateur,
          montantMaximum: aide.montant_max,
          urlCommencerVotreDemarche: aide.url_demande,
        })),
    };
  }
}
