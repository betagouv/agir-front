import {
  PageConformite,
  PageConformiteType,
  RecupererPageConformiteUsecase,
} from '@/domaines/conformites/recupererPageConformite.usecase';
import { ConformiteRepository } from '@/domaines/conformites/ports/conformite.repository';

class RecupererPageConformiteSpy implements ConformiteRepository {
  get pageConformiteType(): PageConformiteType | null {
    return this._pageConformiteType;
  }
  private _pageConformiteType: PageConformiteType | null = null;
  recupererPageConformite(pageConformiteType: PageConformiteType): Promise<PageConformite> {
    this._pageConformiteType = pageConformiteType;
    return Promise.resolve({
      texte: 'texte',
      titre: 'titre',
    });
  }
}
describe("Fichier de tests concernant la recupération d'une page de conformité", () => {
  it('Doit appel le repository avec en paramètre la page demandée', () => {
    // GIVEN
    const repository = new RecupererPageConformiteSpy();
    const usecase = new RecupererPageConformiteUsecase(repository);
    // WHEN
    usecase.execute(PageConformiteType.MENTIONS_LEGALES);
    // THEN
    expect(repository.pageConformiteType).toBe(PageConformiteType.MENTIONS_LEGALES);
  });
});
