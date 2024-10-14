import {
  ClassementGlobalViewModel,
  ClassementPresenterImpl,
} from '@/domaines/classement/adapters/classement.presenter.impl';
import { ClassementPourcentage, RecupererClassementUsecase } from '@/domaines/classement/recupererClassement.usecase';
import { ClassementRepositoryMock } from './adapters/classement.repository.mock';

describe('Fichier de test du usecase de chargement du classement', () => {
  it("En donnant l'id d'un utilisateur, doit me retourner son classement", async () => {
    // GIVEN
    const classementRepositoryMock = new ClassementRepositoryMock({
      commune: 'Dijon',
      utilisateur: {
        points: 350,
        rank: 17,
        prenom: 'Wojtek',
        id: 'WojtekId',
      },
      classementNational: {
        topTrois: [
          {
            points: 1120,
            rank: 1,
            prenom: 'Guillaume',
            id: 'GuillaumeId',
          },
          {
            points: 1030,
            rank: 2,
            prenom: 'Timothé',
            id: 'TimothéId',
          },
          {
            points: 950,
            rank: 3,
            prenom: 'Lucas',
            id: 'LucasId',
          },
        ],
        utilisateursProche: [
          {
            points: 425,
            rank: 14,
            prenom: 'Dunia',
            id: 'DuniaId',
          },
          {
            points: 425,
            rank: 14,
            prenom: 'Romane',
            id: 'RomaneId',
          },
          {
            points: 400,
            rank: 15,
            prenom: 'Margaux',
            id: 'MargauxId',
          },
          {
            points: 370,
            rank: 16,
            prenom: 'Jeremie',
            id: 'JeremieId',
          },
          {
            points: 350,
            rank: 17,
            prenom: 'Wojtek',
            id: 'WojtekId',
          },
          {
            points: 340,
            rank: 18,
            prenom: 'Dunia',
            id: 'DuniaId',
          },
          {
            points: 320,
            rank: 19,
            prenom: 'Claire',
            id: 'ClaireId',
          },
          {
            points: 280,
            rank: 20,
            prenom: 'Wojtek2',
            id: 'Wojtek2Id',
          },
          {
            points: 220,
            rank: 21,
            prenom: 'Nina',
            id: 'NinaId',
          },
        ],
        pourcentage: ClassementPourcentage.top25,
      },
      classementLocal: {
        topTrois: [
          {
            points: 1120,
            rank: 1,
            prenom: 'Guillaume',
            id: 'GuillaumeId',
          },
          {
            points: 350,
            rank: 17,
            prenom: 'Wojtek',
            id: 'WojtekId',
          },
          {
            points: 345,
            rank: 3,
            prenom: 'Lucas',
            id: 'LucasId',
          },
        ],
        utilisateursProche: [
          {
            points: 280,
            rank: 20,
            prenom: 'Wojtek2',
            id: 'Wojtek2Id',
          },
          {
            points: 220,
            rank: 21,
            prenom: 'Nina',
            id: 'NinaId',
          },
        ],
        pourcentage: ClassementPourcentage.top5,
      },
    });
    const recupererClassementUsecase = new RecupererClassementUsecase(classementRepositoryMock);

    // WHEN
    await recupererClassementUsecase.execute('utilisateurId', new ClassementPresenterImpl(expectation));

    // THEN
    function expectation(viewModel: ClassementGlobalViewModel) {
      expect(viewModel).toStrictEqual<ClassementGlobalViewModel>({
        commune: 'Dijon',
        classementNational: {
          classement: [
            {
              prenom: 'Guillaume',
              rang: 1,
              points: 1120,
              style: 'background--white',
              medailleTopTrois: '/medaille-or.webp',
            },
            {
              prenom: 'Timothé',
              rang: 2,
              points: 1030,
              style: 'background--white',
              medailleTopTrois: '/medaille-argent.webp',
            },
            {
              prenom: 'Lucas',
              rang: 3,
              points: 950,
              style: 'background--white',
              medailleTopTrois: '/medaille-bronze.webp',
            },
            {
              prenom: 'Dunia',
              rang: 14,
              points: 425,
              style: 'opacity-8',
            },
            {
              prenom: 'Romane',
              rang: 14,
              points: 425,
              style: 'background--white',
            },
            {
              prenom: 'Margaux',
              rang: 15,
              points: 400,
              style: 'background--white',
            },
            {
              prenom: 'Jeremie',
              rang: 16,
              points: 370,
              style: 'background--white',
            },
            {
              prenom: 'Wojtek',
              rang: 17,
              points: 350,
              style: 'background-bleu-light border--bleu',
            },
            {
              prenom: 'Dunia',
              rang: 18,
              points: 340,
              style: 'background--white',
            },
            {
              prenom: 'Claire',
              rang: 19,
              points: 320,
              style: 'background--white',
            },
            {
              prenom: 'Wojtek2',
              rang: 20,
              points: 280,
              style: 'background--white',
            },
            {
              prenom: 'Nina',
              rang: 21,
              points: 220,
              style: 'opacity-8',
            },
          ],
          phraseClassement: 'Wouah ! Vous faites partie du <strong>top 25%</strong> en <strong>France&nbsp!</strong>',
        },
        classementLocal: {
          classement: [
            {
              medailleTopTrois: '/medaille-or.webp',
              points: 1120,
              prenom: 'Guillaume',
              rang: 1,
              style: 'background--white',
            },
            {
              medailleTopTrois: '',
              points: 350,
              prenom: 'Wojtek',
              rang: 17,
              style: 'background-bleu-light border--bleu',
            },
            {
              medailleTopTrois: '/medaille-bronze.webp',
              points: 345,
              prenom: 'Lucas',
              rang: 3,
              style: 'background--white',
            },
            {
              points: 280,
              prenom: 'Wojtek2',
              rang: 20,
              style: 'opacity-8',
            },
            {
              points: 220,
              prenom: 'Nina',
              rang: 21,
              style: 'opacity-8',
            },
          ],
          phraseClassement: 'Wouah ! Vous faites partie du <strong>top 5%</strong> à <strong>Dijon&nbsp;!</strong>',
        },
      });
    }
  });
});
