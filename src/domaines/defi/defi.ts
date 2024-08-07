export interface Defi {
  description: string;
  thematique: string;
  id: string;
  libelle: string;
  points: number;
  status: 'todo' | 'en_cours' | 'pas_envie' | 'deja_fait' | 'abondon' | 'fait';
  astuces: string;
  pourquoi: string;
  explicationRefus?: string;
  nombreDePersonnes: number;
}
