import { AxiosFactory, intercept401 } from '@/axios.factory';
import { Defi } from '@/domaines/defi/defi';
import { DefiRepository } from '@/domaines/defi/ports/defi.repository';
import { ClefThematiqueAPI } from '@/domaines/thematiques/MenuThematiques';

interface DefiApiModel {
  id: string;
  astuces: string;
  jours_restants: number;
  points: number;
  pourquoi: string;
  sous_titre: string;
  status: 'todo' | 'en_cours' | 'pas_envie' | 'deja_fait' | 'abondon' | 'fait';
  thematique_label: string;
  thematique: ClefThematiqueAPI;
  titre: string;
  motif?: string;
  nombre_de_fois_realise: number;
}

export class DefiRepositoryAxios implements DefiRepository {
  @intercept401()
  async recupererListeDefisParThematique(utilisateurId: string, thematiqueId: string): Promise<Defi[]> {
    const axiosInstance = AxiosFactory.getAxios();
    const response = await axiosInstance.get<DefiApiModel[]>(
      `/utilisateurs/${utilisateurId}/defis_v2?thematique=${thematiqueId}`,
    );

    return response.data.map((apiModel: DefiApiModel) => {
      const recommandationPersonnalisee: Defi = {
        description: '',
        thematique: apiModel.thematique,
        id: apiModel.id,
        libelle: apiModel.titre,
        points: apiModel.points,
        status: apiModel.status,
        astuces: '',
        pourquoi: '',
        explicationRefus: apiModel.motif,
        nombreDePersonnes: apiModel.nombre_de_fois_realise,
      };

      return recommandationPersonnalisee;
    });
  }

  @intercept401()
  async envoyerReponse(utilisateurId: string, defiId: string, reponse: string, explication?: string): Promise<void> {
    const axios = AxiosFactory.getAxios();
    await axios.patch(`/utilisateurs/${utilisateurId}/defis/${defiId}`, { status: reponse, motif: explication });
  }

  @intercept401()
  async recupererDefi(defiId: string, utilisateurId: string): Promise<Defi> {
    const response = await AxiosFactory.getAxios().get<DefiApiModel>(`/utilisateurs/${utilisateurId}/defis/${defiId}`);

    return {
      id: response.data.id,
      libelle: response.data.titre,
      points: response.data.points,
      status: response.data.status,
      thematique: response.data.thematique,
      description: response.data.sous_titre,
      astuces: response.data.astuces,
      pourquoi: response.data.pourquoi,
      explicationRefus: response.data.motif,
      nombreDePersonnes: response.data.nombre_de_fois_realise,
    };
  }

  @intercept401()
  async recupererTousLesDefis(utilisateurId: string): Promise<Defi[]> {
    const response = await AxiosFactory.getAxios().get<DefiApiModel[]>(`/utilisateurs/${utilisateurId}/defis_v2`);
    return response.data.map(defi => ({
      id: defi.id,
      libelle: defi.titre,
      points: defi.points,
      status: defi.status,
      thematique: defi.thematique,
      description: defi.sous_titre,
      astuces: defi.astuces,
      pourquoi: defi.pourquoi,
      explicationRefus: defi.motif,
      nombreDePersonnes: 42,
    }));
  }
}
