import { RecupererListeDefisParUniversUsecase } from '@/domaines/defi/recupererListeDefisParUnivers.usecase';
import { MockListeDefisRepository } from './adapters/listedefis.repository.mock';
import { ListeDefisPresenterImpl } from '@/domaines/defi/adapters/listeDefis.presenter.impl';
import { DefisQuestionViewModel } from '@/domaines/defi/ports/listeDefis.presenter';
import { expect } from 'vitest';
import {
  DefiDescriptionViewModel,
  ListeDefisDescriptionPresenterImpl,
} from '@/domaines/defi/adapters/listeDefisDescription.presenter.impl';

describe("Fichier de tests concernant la récupération de la liste des défis avec leur description fonction d'un univers", () => {
  it('En donnant un id utilisateur et un id univers doit retourner la liste des défis', async () => {
    // GIVEN
    // WHEN
    const usecase = new RecupererListeDefisParUniversUsecase(
      new MockListeDefisRepository([
        {
          id: '1',
          description: 'Description du défi 1',
          thematique: 'Thématique du défi 1',
          libelle: 'Libellé du défi 1',
          points: 10,
          status: 'en_cours',
          astuces: 'Astuces du défi 1',
          pourquoi: 'Pourquoi du défi 1',
        },
      ]),
    );

    await usecase.execute('idUtilisateur', 'idUnivers', new ListeDefisDescriptionPresenterImpl(expectation));
    // THEN
    function expectation(viewModel: DefiDescriptionViewModel[]) {
      expect(viewModel).toStrictEqual<DefiDescriptionViewModel[]>([
        {
          titre: 'Libellé du défi 1',
          thematique: 'Thématique du défi 1',
          points: 10,
          url: '/defi/1',
        },
      ]);
    }
  });
});
