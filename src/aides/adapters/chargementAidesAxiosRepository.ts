import { Aides } from '@/aides/chargementAides.usecase';
import { ChargementAidesRepository } from '@/aides/ports/chargementAides.repository';
import { AxiosFactory, intercept401 } from '@/axios.factory';

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
    const axios = AxiosFactory.getInstance().axiosBack;
    const aides = await axios.get<AideApiModel[]>(`/utilisateurs/${utilisateurId}/aides`);

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
