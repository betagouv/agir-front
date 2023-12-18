import { Aides } from '@/aides/chargementAides.usecase';
import { ChargementAidesRepository } from '@/aides/ports/chargementAides.repository';
import { AxiosFactory } from '@/axios.factory';

interface AidesThematiqueCMSModel {
  titre: string;
}

interface AidesThematiqueDataCMSAttributesModel {
  attributes: AidesThematiqueCMSModel;
}

interface AidesThematiqueDataCMSModel {
  data: AidesThematiqueDataCMSAttributesModel[];
}

interface AidesCMSAttributesModel {
  description: string;
  echelle: string;
  is_simulation: boolean;
  titre: string;
  url_detail_front: string;
  url_source: string;
  thematiques: AidesThematiqueDataCMSModel;
  montantMaximum?: string;
}

interface AidesCMSDataModel {
  id: string;
  attributes: AidesCMSAttributesModel;
}

interface AidesCMSModel {
  data: AidesCMSDataModel[];
}

export class chargementAidesAxiosCmsRepository implements ChargementAidesRepository {
  async getAides(codePostal: string): Promise<Aides[]> {
    const axiosCMS = AxiosFactory.getCMSAxios();
    const aides = await axiosCMS.get<AidesCMSModel>(
      `/aides?populate=thematiques&filters[$or][0][codes_postaux][$contains]=${codePostal}&filters[$or][1][codes_postaux][$null]=true`
    );

    return aides.data.data.map(({ id, attributes }) => ({
      id: id.toString(),
      titre: attributes.titre,
      categorie: attributes.thematiques.data[0].attributes.titre,
      contenu: attributes.description,
      url: attributes.url_detail_front,
      isSimulateur: attributes.is_simulation,
      montantMaximum: attributes.montantMaximum ? parseFloat(attributes.montantMaximum) : undefined,
    }));
  }
}
