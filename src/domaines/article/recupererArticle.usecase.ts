import { ArticleRepository } from '@/domaines/article/ports/article.repository';
import { SessionRepository } from '@/domaines/authentification/ports/session.repository';

export interface Partenaire {
  nom: string;
  logo: string;
}

export interface Source {
  label: string;
  url: string;
}

export interface Article {
  texte: string;
  titre: string;
  sousTitre: string;
  id: string;
  estEnFavori: boolean;
  sources: Source[] | null;
  partenaire: Partenaire | null;
}

export class RecupererArticleUsecase {
  constructor(
    private readonly articleRepository: ArticleRepository,
    private readonly sessionRepository: SessionRepository,
  ) {}

  async execute(articleId: string): Promise<Article> {
    if (this.sessionRepository.estConnecte()) {
      return this.articleRepository.recuperer(this.sessionRepository.getUtilisateurId(), articleId);
    } else {
      return this.articleRepository.recupererHorsConnexion(articleId);
    }
  }
}
