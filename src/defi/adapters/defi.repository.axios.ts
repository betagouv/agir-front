import { Defi } from '../recupererListeDefis.usecase';
import { AxiosFactory, intercept401 } from '@/axios.factory';
import { DefiRepository } from '@/defi/ports/defi.repository';

interface DefiApiModel {
  id: string;
  astuces: string;
  jours_restants: number;
  points: number;
  pourquoi: string;
  sous_titre: string;
  status: 'todo' | 'en_cours' | 'pas_envie' | 'deja_fait' | 'abondon' | 'fait';
  thematique_label: string;
  thematique: string;
  titre: string;
}

export class DefiRepositoryAxios implements DefiRepository {
  @intercept401()
  async recupererListeDefisParUnivers(utilisateurId: string, universId: string): Promise<Defi[]> {
    const axiosInstance = AxiosFactory.getAxios();
    const response = await axiosInstance.get<DefiApiModel[]>(`/utilisateurs/${utilisateurId}/defis`);

    return response.data
      .filter(model => model.thematique === universId)
      .map((apiModel: DefiApiModel) => {
        const recommandationPersonnalisee: Defi = {
          description: '',
          thematique: apiModel.thematique_label,
          id: apiModel.id,
          libelle: apiModel.titre,
          points: apiModel.points,
          status: apiModel.status,
          astuces: '',
          pourquoi: '',
        };

        return recommandationPersonnalisee;
      });
  }
  @intercept401()
  async envoyerReponse(utilisateurId: string, defiId: string, reponse: string): Promise<void> {
    const axios = AxiosFactory.getAxios();
    await axios.patch(`/utilisateurs/${utilisateurId}/defis/${defiId}`, { status: reponse });
  }
  @intercept401()
  async recupererDefi(defiId: string, utilisateurId: string): Promise<Defi> {
    const response = await AxiosFactory.getAxios().get<DefiApiModel>(`/utilisateurs/${utilisateurId}/defis/${defiId}`);

    return {
      id: response.data.id,
      libelle: response.data.titre,
      points: response.data.points,
      status: response.data.status,
      thematique: response.data.thematique_label,
      description: response.data.sous_titre,
      astuces: response.data.astuces,
      pourquoi: response.data.pourquoi,
    };
  }

  @intercept401()
  async recupererDefis(utilisateurId: string): Promise<Defi[]> {
    const response = await AxiosFactory.getAxios().get<DefiApiModel[]>(`/utilisateurs/${utilisateurId}/defis`);
    return response.data
      .filter(
        defi =>
          defi.status === 'todo' || defi.status === 'en_cours' || defi.status === 'fait' || defi.status === 'deja_fait',
      )
      .map(defi => ({
        id: defi.id,
        libelle: defi.titre,
        points: defi.points,
        status: defi.status,
        thematique: defi.thematique_label,
        description: defi.sous_titre,
        astuces: defi.astuces,
        pourquoi: defi.pourquoi,
      }));
  }
}
