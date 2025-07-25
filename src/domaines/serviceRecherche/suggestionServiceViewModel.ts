export interface SuggestionServiceViewModel {
  id: string;
  titre: string;
  to: { name: string; params: { id: string } } | null;
  nombreMiseEnFavoris: number;
  img?: string;
  headerAlternatif?: {
    emoji: string;
    backgroundColor: string;
  };
  description?: string;
  information?: string;
  tag?: {
    label: string;
    style: string;
  };
  categories?: string;
}
