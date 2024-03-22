import { MockListeDefisRepository } from './adapters/listedefis.repository.mock';
import { RecupererListeDefisUsecase } from '@/defi/recupererListeDefis.usecase';
import { ListeDefisPresenterImpl } from '@/defi/adapters/listeDefis.presenter.impl';

describe('Fichier de tests concernant la récupération des défis en cours', () => {
  it('doit récupérer la liste des défis', async () => {
    // GIVEN
    // WHEN
    const recupererListeDefisUsecase = new RecupererListeDefisUsecase(
      new MockListeDefisRepository([
        {
          id: 'defiId1',
          description: 'Defi1 description',
          thematique: 'transport',
          libelle: 'Defi1 libelle',
          points: 10,
          status: 'en_cours',
          astuces: 'Defi1 astuce',
          pourquoi: 'Défi pourquoi',
        },
        {
          id: 'defiId2',
          description: 'Defi2 description',
          thematique: 'transport',
          libelle: 'Defi2 libelle',
          points: 10,
          status: 'deja_fait',
          astuces: 'Defi2 astuce',
          pourquoi: 'Défi2 pourquoi',
        },
        {
          id: 'defiId3',
          description: 'Defi3 description',
          thematique: 'transport',
          libelle: 'Defi3 libelle',
          points: 10,
          status: 'pas_envie',
          astuces: 'Defi3 astuce',
          pourquoi: 'Défi3 pourquoi',
        },
      ]),
    );
    await recupererListeDefisUsecase.execute(
      'utilisateurId',
      new ListeDefisPresenterImpl(defisViewModel => {
        // THEN
        expect(defisViewModel).toStrictEqual([
          {
            id: 'defiId1',
            libelle: 'Defi1 libelle',
            reponse: '⏳ Défi en cours',
          },
          {
            id: 'defiId2',
            libelle: 'Defi2 libelle',
            reponse: '✅ Déjà fait',
          },
          {
            id: 'defiId3',
            libelle: 'Defi3 libelle',
            reponse: '👎 Pas envie',
          },
        ]);
      }),
    );
  });
});
