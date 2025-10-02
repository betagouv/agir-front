import {
  ClassementGlobalViewModel,
  ClassementPresenterImpl,
} from '@/domaines/classement/adapters/classement.presenter.impl';
import { ClassementPourcentage, RecupererClassementUsecase } from '@/domaines/classement/recupererClassement.usecase';
import { ClassementRepositoryMock } from './adapters/classement.repository.mock';
import { Badge, TypeDeBadge } from '@/domaines/score/ports/score.repository';
import { NombreAfficheEnFR } from '@/shell/formatting/nombreAfficheEnFRBuilder';

describe('Fichier de test du usecase de chargement du classement', () => {
  it("En donnant l'id d'un utilisateur, doit me retourner son classement", async () => {
    // GIVEN
    const classementRepositoryMock = new ClassementRepositoryMock({
      commune: 'Dijon',
      utilisateur: {
        points: 350,
        rank: 17,
        pseudo: 'Wojtek',
        id: 'WojtekId',
      },
      classementNational: {
        topTrois: [
          {
            points: 1120,
            rank: 1,
            pseudo: 'Guillaume',
            id: 'GuillaumeId',
          },
          {
            points: 1030,
            rank: 2,
            pseudo: 'Timothé',
            id: 'TimothéId',
          },
          {
            points: 950,
            rank: 3,
            pseudo: 'Lucas',
            id: 'LucasId',
          },
        ],
        utilisateursProche: [
          {
            points: 425,
            rank: 14,
            pseudo: 'Dunia',
            id: 'DuniaId',
          },
          {
            points: 425,
            rank: 14,
            pseudo: 'Romane',
            id: 'RomaneId',
          },
          {
            points: 400,
            rank: 15,
            pseudo: 'Margaux',
            id: 'MargauxId',
          },
          {
            points: 370,
            rank: 16,
            pseudo: 'Jeremie',
            id: 'JeremieId',
          },
          {
            points: 350,
            rank: 17,
            pseudo: 'Wojtek',
            id: 'WojtekId',
          },
          {
            points: 340,
            rank: 18,
            pseudo: 'Dunia',
            id: 'DuniaId',
          },
          {
            points: 320,
            rank: 19,
            pseudo: 'Claire',
            id: 'ClaireId',
          },
          {
            points: 280,
            rank: 20,
            pseudo: 'Wojtek2',
            id: 'Wojtek2Id',
          },
          {
            points: 220,
            rank: 21,
            pseudo: 'Nina',
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
            pseudo: 'Guillaume',
            id: 'GuillaumeId',
          },
          {
            points: 350,
            rank: 17,
            pseudo: 'Wojtek',
            id: 'WojtekId',
          },
          {
            points: 345,
            rank: 3,
            pseudo: 'Lucas',
            id: 'LucasId',
          },
        ],
        utilisateursProche: [
          {
            points: 280,
            rank: 20,
            pseudo: 'Wojtek2',
            id: 'Wojtek2Id',
          },
          {
            points: 220,
            rank: 21,
            pseudo: 'Nina',
            id: 'NinaId',
          },
        ],
        pourcentage: ClassementPourcentage.top5,
      },
      badges: [new Badge(TypeDeBadge.PIONNIER, 'Pionnier', 'Vous êtes un pionnier')],
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
              rang: '1' as NombreAfficheEnFR,
              points: '1 120' as NombreAfficheEnFR,
              style: 'background--white',
              medailleTopTrois: '/medaille-or.webp',
            },
            {
              prenom: 'Timothé',
              rang: '2' as NombreAfficheEnFR,
              points: '1 030' as NombreAfficheEnFR,
              style: 'background--white',
              medailleTopTrois: '/medaille-argent.webp',
            },
            {
              prenom: 'Lucas',
              rang: '3' as NombreAfficheEnFR,
              points: '950' as NombreAfficheEnFR,
              style: 'background--white',
              medailleTopTrois: '/medaille-bronze.webp',
            },
            {
              prenom: 'Dunia',
              rang: '14' as NombreAfficheEnFR,
              points: '425' as NombreAfficheEnFR,
              style: 'opacity-8',
            },
            {
              prenom: 'Romane',
              rang: '14' as NombreAfficheEnFR,
              points: '425' as NombreAfficheEnFR,
              style: 'background--white',
            },
            {
              prenom: 'Margaux',
              rang: '15' as NombreAfficheEnFR,
              points: '400' as NombreAfficheEnFR,
              style: 'background--white',
            },
            {
              prenom: 'Jeremie',
              rang: '16' as NombreAfficheEnFR,
              points: '370' as NombreAfficheEnFR,
              style: 'background--white',
            },
            {
              prenom: 'Wojtek',
              rang: '17' as NombreAfficheEnFR,
              points: '350' as NombreAfficheEnFR,
              style: 'background-bleu-light border--bleu',
            },
            {
              prenom: 'Dunia',
              rang: '18' as NombreAfficheEnFR,
              points: '340' as NombreAfficheEnFR,
              style: 'background--white',
            },
            {
              prenom: 'Claire',
              rang: '19' as NombreAfficheEnFR,
              points: '320' as NombreAfficheEnFR,
              style: 'background--white',
            },
            {
              prenom: 'Wojtek2',
              rang: '20' as NombreAfficheEnFR,
              points: '280' as NombreAfficheEnFR,
              style: 'background--white',
            },
            {
              prenom: 'Nina',
              rang: '21' as NombreAfficheEnFR,
              points: '220' as NombreAfficheEnFR,
              style: 'opacity-8',
            },
          ],
          phraseClassement: 'Wouah ! Vous faites partie du <strong>top 25%</strong> en <strong>France&nbsp!</strong>',
        },
        classementLocal: {
          classement: [
            {
              medailleTopTrois: '/medaille-or.webp',
              points: '1 120' as NombreAfficheEnFR,
              prenom: 'Guillaume',
              rang: '1' as NombreAfficheEnFR,
              style: 'background--white',
            },
            {
              medailleTopTrois: '',
              points: '350' as NombreAfficheEnFR,
              prenom: 'Wojtek',
              rang: '17' as NombreAfficheEnFR,
              style: 'background-bleu-light border--bleu',
            },
            {
              medailleTopTrois: '/medaille-bronze.webp',
              points: '345' as NombreAfficheEnFR,
              prenom: 'Lucas',
              rang: '3' as NombreAfficheEnFR,
              style: 'background--white',
            },
            {
              points: '280' as NombreAfficheEnFR,
              prenom: 'Wojtek2',
              rang: '20' as NombreAfficheEnFR,
              style: 'opacity-8',
            },
            {
              points: '220' as NombreAfficheEnFR,
              prenom: 'Nina',
              rang: '21' as NombreAfficheEnFR,
              style: 'opacity-8',
            },
          ],
          phraseClassement: 'Wouah ! Vous faites partie du <strong>top 5%</strong> à <strong>Dijon&nbsp;!</strong>',
        },
        badges: [
          {
            illustration: '/badge-pionnier.webp',
            libelle: 'Pionnier',
            description: 'Vous êtes un pionnier',
          },
        ],
      });
    }
  });
});
