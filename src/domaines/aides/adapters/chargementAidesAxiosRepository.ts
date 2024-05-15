import { AxiosFactory, intercept401 } from '@/axios.factory';
import { Aides } from '@/domaines/aides/chargementAides.usecase';
import { ChargementAidesRepository } from '@/domaines/aides/ports/chargementAides.repository';

interface AideApiModel {
  content_id: string;
  titre: string;
  contenu: string;
  url_simulateur: string;
  is_simulateur: true;
  thematiques_label: string[];
  montant_max: number;
}

export class chargementAidesAxiosRepository implements ChargementAidesRepository {
  @intercept401()
  async getAides(utilisateurId: string): Promise<Aides[]> {
    const axiosCMS = AxiosFactory.getAxios();
    const aides = await axiosCMS.get<AideApiModel[]>(`/utilisateurs/${utilisateurId}/aides`);

    return aides.data.map(aide => ({
      id: aide.content_id,
      titre: aide.titre,
      categorie: aide.thematiques_label[0],
      contenu: aide.contenu,
      url: aide.url_simulateur,
      isSimulateur: aide.is_simulateur,
      montantMaximum: aide.montant_max,
    }));
  }
}
