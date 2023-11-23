export enum InteractionType {
  QUIZ = 'quizz',
  ARTICLE = 'article',
  KYC = 'KYC',
  SUIVIDUJOUR = 'suivi_du_jour',
  AIDE = 'aide',
}
export interface Interaction {
  id: string;
  type: InteractionType;
  titre: string;
  sousTitre: string;
  categorie: string;
  nombreDePointsAGagner: string;
  miseEnAvant: string;
  illustrationURL: string;
  url: string;
  aEteFaite: boolean;
  idDuContenu: string;
  duree: string;
  estBloquee: boolean;
}
