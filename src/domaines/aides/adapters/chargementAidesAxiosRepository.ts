import { AxiosFactory, intercept401 } from '@/axios.factory';
import { Aide, Aides } from '@/domaines/aides/chargementAides.usecase';
import { ChargementAidesRepository } from '@/domaines/aides/ports/chargementAides.repository';
import { ClefThematiqueAPI, MenuThematiques } from '@/domaines/thematiques/MenuThematiques';

interface AidesApiModel {
  couverture_aides_ok: boolean;
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
  partenaire_logo_url?: string;
  partenaire_nom?: string;
}

export class ChargementAidesAxiosRepository implements ChargementAidesRepository {
  @intercept401()
  async getAides(utilisateurId: string): Promise<Aides> {
    const axios = AxiosFactory.getAxios();
    const reponse = await axios.get<AidesApiModel>(`/utilisateurs/${utilisateurId}/aides_v2`);

    return {
      utilisateurEstCouvert: reponse.data.couverture_aides_ok,
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
          partenaire: aide.partenaire_logo_url
            ? {
                logoUrl: aide.partenaire_logo_url!,
                nom: aide.partenaire_nom!,
              }
            : undefined,
        })),
    };
  }

  @intercept401()
  async previsualiser(idAide: string): Promise<Aide> {
    const axios = AxiosFactory.getCMSAxios();
    const aideCMS = await axios.get(
      `/aides/${idAide}?populate[1]=imageUrl&populate[2]=partenaire,partenaire.logo.media&populate[3]=thematique_gamification&populate[4]=rubriques&populate[5]=thematiques&populate[6]=tags&populate[7]=besoin`,
    );
    return {
      id: aideCMS.data.data.id,
      titre: aideCMS.data.data.attributes.titre,
      categorie: aideCMS.data.data.attributes.thematique_principale_label,
      thematique: aideCMS.data.data.attributes.thematiques.data[0].attributes.code as ClefThematiqueAPI,
      contenu: aideCMS.data.data.attributes.description,
      url: aideCMS.data.data.attributes.url_source,
      isSimulateur: aideCMS.data.data.attributes.is_simulateur,
      montantMaximum: aideCMS.data.data.attributes.points,
      urlCommencerVotreDemarche: aideCMS.data.data.url_commencer_votre_demarche,
      partenaire: aideCMS.data.data.attributes.partenaire.data
        ? {
            logoUrl: aideCMS.data.data.attributes.partenaire.data.attributes.logo.data[0].attributes.url,
            nom: aideCMS.data.data.attributes.partenaire.data.attributes.nom,
          }
        : undefined,
      derniereMaj: aideCMS.data.data.attributes.updatedAt,
    };
  }
}
