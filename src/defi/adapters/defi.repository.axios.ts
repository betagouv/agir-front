import { DefiRepository } from '@/defi/ports/defi.repository';
import { Defi } from '../recupererListeDefis.usecase';
import { AxiosFactory, intercept401 } from '@/axios.factory';

interface QuestionApiModel {
  id: string;
  question: string;
  type: 'libre' | 'choix_multiple' | 'choix_unique';
  reponses_possibles: string[];
  points: number;
  reponse: string[];
  categorie: string;
}
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
  async envoyerReponse(utilisateurId: string, defiId: string, reponse: string[]): Promise<void> {
    const axios = AxiosFactory.getAxios();
    await axios.patch(`/utilisateurs/${utilisateurId}/defis/${defiId}`, { reponse });
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
    };
  }
  @intercept401()
  async recupererDefis(utilisateurId: string): Promise<Defi[]> {
    const response = await AxiosFactory.getAxios().get<QuestionApiModel[]>(
      `utilisateurs/${utilisateurId}/questionsKYC`,
    );
    return response.data
      .filter(question => question.categorie === 'defi')
      .map(question => ({
        id: question.id,
        libelle: question.question,
        points: question.points,
        status: question.reponse.length > 0 ? 'en_cours' : 'todo',
        reponse: question.reponse,
        thematique: question.categorie,
        description: '',
        astuces: '',
      }));
  }
}
