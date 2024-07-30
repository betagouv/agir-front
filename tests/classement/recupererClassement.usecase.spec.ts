import { ClassementPresenterImpl, ClassementViewModel } from '@/domaines/classement/adapters/classement.presenter.impl';
import { ClassementPourcentage, RecupererClassementUsecase } from '@/domaines/classement/recupererClassement.usecase';
import { ClassementRepositoryMock } from './adapters/classement.repository.mock';

describe('Fichier de test du usecase de chargement du classement', () => {
  it("En donnant l'id d'un utilisateur, doit me retourner son classement", async () => {
    // GIVEN
    const classementRepositoryMock = new ClassementRepositoryMock({
      utilisateur: {
        points: 350,
        rank: 17,
        prenom: 'Wojtek',
        id: 'WojtekId',
      },
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
    });
    const recupererClassementUsecase = new RecupererClassementUsecase(classementRepositoryMock);

    // WHEN
    await recupererClassementUsecase.execute('utilisateurId', new ClassementPresenterImpl(expectation));

    // THEN
    function expectation(viewModel: ClassementViewModel) {
      expect(viewModel).toStrictEqual<ClassementViewModel>({
        classement: [
          {
            prenom: 'Guillaume',
            rang: 1,
            points: 1120,
            style: 'background--white',
            medailleTopTrois: '/medaille-or.png',
          },
          {
            prenom: 'Timothé',
            rang: 2,
            points: 1030,
            style: 'background--white',
            medailleTopTrois: '/medaille-argent.png',
          },
          {
            prenom: 'Lucas',
            rang: 3,
            points: 950,
            style: 'background--white',
            medailleTopTrois: '/medaille-bronze.png',
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
      });
    }
  });
});
