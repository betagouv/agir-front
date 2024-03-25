import { DefiRepository } from '@/defi/ports/defi.repository';
import { Defi } from '../recupererListeDefis.usecase';
import { AxiosFactory, intercept401 } from '@/axios.factory';

interface DefiApiModel {
  id: string;
  astuces: string;
  jours_restants: number;
  points: number;
  pourquoi: string;
  sous_titre: string;
  status: 'todo' | 'en_cours' | 'pas_envie' | 'deja_fait' | 'abondon' | 'fait';
  thematique_label: string;
  titre: string;
}

export class DefiRepositoryAxios implements DefiRepository {
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
      .filter(defi => defi.status === 'en_cours' || defi.status === 'fait' || defi.status === 'deja_fait')
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
