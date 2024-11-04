import { RecupererListeDefisParThematiqueUsecase } from '@/domaines/defi/recupererListeDefisParThematique.usecase';
import { MockListeDefisRepository } from './adapters/listedefis.repository.mock';
import { expect } from 'vitest';
import {
  DefiDescriptionViewModel,
  ListeDefisDescriptionPresenterImpl,
} from '@/domaines/defi/adapters/listeDefisDescription.presenter.impl';

describe("Fichier de tests concernant la récupération de la liste des défis avec leur description fonction d'une thématique", () => {
  it('En donnant un id utilisateur et un id de thématique doit retourner la liste des défis', async () => {
    // GIVEN
    // WHEN
    const usecase = new RecupererListeDefisParThematiqueUsecase(
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
          nombreDePersonnes: 10,
        },
      ]),
    );

    await usecase.execute('idUtilisateur', 'idThematique', new ListeDefisDescriptionPresenterImpl(expectation));
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
