import { AxiosFactory, intercept40X } from '@/axios.factory';
import { Aide, Aides } from '@/domaines/aides/chargementAides.usecase';
import { ChargementAidesRepository } from '@/domaines/aides/ports/chargementAides.repository';
import { ClefThematiqueAPI, MenuThematiques } from '@/domaines/thematiques/MenuThematiques';
import { sessionAppRawDataStorage } from '@/shell/appRawDataStorage';
import { cache } from '@/shell/cacheDecorator';

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
  est_gratuit: boolean;
  derniere_maj: string;
  url_source: string;
}

interface CMSAideApiModel {
  aide: AideApiModel;
}

export class ChargementAidesAxiosRepository implements ChargementAidesRepository {
  @intercept40X()
  @cache({
    key: 'aides',
    storage: sessionAppRawDataStorage,
  })
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
          estGratuit: aide.est_gratuit,
          urlCommencerVotreDemarche: aide.url_demande,
          partenaire: aide.partenaire_logo_url
            ? {
                logoUrl: aide.partenaire_logo_url!,
                nom: aide.partenaire_nom!,
              }
            : undefined,
          urlSource: aide.url_source,
        })),
    };
  }

  @intercept40X()
  async recupererAidesDuneThematique(utilisateurId: string, clefThematique: ClefThematiqueAPI): Promise<Aides> {
    const axios = AxiosFactory.getAxios();
    const reponse = await axios.get<AidesApiModel>(
      `/utilisateurs/${utilisateurId}/aides_v2?thematique=${clefThematique}`,
    );

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
          estGratuit: aide.est_gratuit,
          partenaire: aide.partenaire_logo_url
            ? {
                logoUrl: aide.partenaire_logo_url!,
                nom: aide.partenaire_nom!,
              }
            : undefined,
          urlSource: aide.url_source,
        })),
    };
  }

  @intercept40X()
  async consulterEnModeNonConnecte(idAide: string): Promise<Aide> {
    const axios = AxiosFactory.getAxios();
    const aide = await axios.get<AideApiModel>(`/aides/${idAide}`);
    return {
      id: aide.data.content_id,
      titre: aide.data.titre,
      categorie: aide.data.thematiques_label[0],
      thematique: aide.data.thematiques[0] as ClefThematiqueAPI,
      contenu: aide.data.contenu,
      url: aide.data.url_simulateur,
      isSimulateur: aide.data.is_simulateur,
      montantMaximum: aide.data.montant_max,
      urlCommencerVotreDemarche: aide.data.url_demande,
      estGratuit: aide.data.est_gratuit,
      partenaire: aide.data.partenaire_logo_url
        ? {
            logoUrl: aide.data.partenaire_logo_url!,
            nom: aide.data.partenaire_nom!,
          }
        : undefined,
      derniereMaj: aide.data.derniere_maj,
      urlSource: aide.data.url_source,
    };
  }

  async previsualiser(idAide: string): Promise<Aide> {
    const axios = AxiosFactory.getAxios();
    const reponse = await axios.get<CMSAideApiModel>(`/cms_preview/aides/${idAide}`);
    return {
      id: reponse.data.aide.content_id,
      titre: reponse.data.aide.titre,
      categorie: reponse.data.aide.thematiques_label[0],
      thematique: reponse.data.aide.thematiques[0] as ClefThematiqueAPI,
      contenu: reponse.data.aide.contenu,
      url: reponse.data.aide.url_simulateur,
      isSimulateur: reponse.data.aide.is_simulateur,
      montantMaximum: reponse.data.aide.montant_max,
      urlCommencerVotreDemarche: reponse.data.aide.url_demande,
      estGratuit: reponse.data.aide.est_gratuit,
      partenaire: reponse.data.aide.partenaire_logo_url
        ? {
            logoUrl: reponse.data.aide.partenaire_logo_url!,
            nom: reponse.data.aide.partenaire_nom!,
          }
        : undefined,
      derniereMaj: reponse.data.aide.derniere_maj,
      urlSource: reponse.data.aide.url_source,
    };
  }

  @intercept40X()
  async recupererDetailAide(utilisateurId: string, idAide: string): Promise<Aide> {
    const axios = AxiosFactory.getAxios();
    const aide = await axios.get<AideApiModel>(`/utilisateurs/${utilisateurId}/aides/${idAide}`);

    return {
      id: aide.data.content_id,
      titre: aide.data.titre,
      categorie: aide.data.thematiques_label[0],
      thematique: aide.data.thematiques[0] as ClefThematiqueAPI,
      contenu: aide.data.contenu,
      url: aide.data.url_simulateur,
      isSimulateur: aide.data.is_simulateur,
      montantMaximum: aide.data.montant_max,
      urlCommencerVotreDemarche: aide.data.url_demande,
      estGratuit: aide.data.est_gratuit,
      partenaire: aide.data.partenaire_logo_url
        ? {
            logoUrl: aide.data.partenaire_logo_url!,
            nom: aide.data.partenaire_nom!,
          }
        : undefined,
      derniereMaj: aide.data.derniere_maj,
      urlSource: aide.data.url_source,
    };
  }
}
