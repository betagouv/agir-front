import { ArticleRepository } from '@/article/ports/article.repository';

export interface Partenaire {
  id: string;
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
  constructor(private readonly articleRepository: ArticleRepository) {}

  async execute(utilisateurId: string, articleId: string): Promise<Article> {
    return this.articleRepository.recuperer(utilisateurId, articleId);
  }
}
