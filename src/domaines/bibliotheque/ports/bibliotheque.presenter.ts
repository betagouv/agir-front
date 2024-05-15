import { Bibliotheque } from '@/domaines/bibliotheque/ports/bibliotheque.repository';

export interface BibliothequePresenter {
  presente(bibliotheque: Bibliotheque): void;
}

export interface BibliothequeViewModel {
  articles: {
    idDuContenu: string;
    titre: string;
    thematique: string;
    description: string;
    url: string;
    image: string;
    favoris: boolean;
  }[];
  filtres: {
    id: string;
    label: string;
    checked: boolean;
  }[];
}
