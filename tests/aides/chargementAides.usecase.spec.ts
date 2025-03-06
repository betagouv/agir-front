import ChargementAidesUsecase, { Aide, Aides } from '@/domaines/aides/chargementAides.usecase';
import { ChargementAidesRepository } from '@/domaines/aides/ports/chargementAides.repository';
import { ChargementAidesPresenterImpl } from '@/domaines/aides/adapters/chargementAides.presenter.impl';
import { AidesAvecCouvertureViewModel } from '@/domaines/aides/ports/chargementAides.presenter';
import { expect } from 'vitest';
import {
  AideNonGroupeeViewModel,
  ChargementAidesNonGroupeesPresenterImpl,
} from '@/domaines/aides/adapters/chargementCinqAidesNonGroupees.presenter.impl';
import { ClefThematiqueAPI } from '@/domaines/thematiques/MenuThematiques';

class ChargementAidesRepositoryForTest implements ChargementAidesRepository {
  getAides(): Promise<Aides> {
    return Promise.resolve({
      utilisateurEstCouvert: true,
      aides: [
        {
          id: 'id-1',
          titre: "Simulez vos aides pour l'achat d'un vélo",
          sousTitre: '',
          categorie: '🚅 Transport du quotidien',
          thematique: ClefThematiqueAPI.transports,
          nombreDePointsAGagner: '25',
          miseEnAvant: '',
          type: 'AIDE',
          illustrationURL: 'https://picsum.photos/200/300',
          url: 'vos-aides-velo',
          isUrlExterne: false,
          estGratuit: false,
          contenu: '<h3>Titre test</h3><p>lorem ipsum dolor test</p><ul><li>Item 1</li><li>Item 2</li></ul>',
          idDuContenu: '',
          isSimulateur: true,
          montantMaximum: 15000,
          urlCommencerVotreDemarche: 'urlCommencerVotreDemarche',
        },
        {
          id: 'id-2',
          titre: 'Simulez vos aides pour convertir votre voiture thermique en électrique',
          sousTitre: '',
          categorie: '🚅 Transport du quotidien',
          thematique: ClefThematiqueAPI.transports,
          nombreDePointsAGagner: '25',
          miseEnAvant: '',
          type: 'AIDE',
          estGratuit: false,
          illustrationURL: 'https://picsum.photos/200/300',
          url: 'vos-aides-retrofit',
          isUrlExterne: true,
          contenu: '<h3>Titre test</h3><p>lorem ipsum dolor test</p>',
          idDuContenu: '',
          isSimulateur: false,
        },
        {
          id: 'id-3',
          titre: 'Aide test',
          sousTitre: '',
          categorie: '🥦 Alimentation',
          thematique: ClefThematiqueAPI.alimentation,
          nombreDePointsAGagner: '25',
          miseEnAvant: '',
          type: 'AIDE',
          estGratuit: true,
          illustrationURL: 'https://picsum.photos/200/300',
          url: 'vos-aides-velo',
          isUrlExterne: false,
          contenu: '<h3>Titre test</h3><p>lorem ipsum dolor test</p>',
          idDuContenu: '',
          isSimulateur: true,
        },
        {
          id: 'id-4',
          titre: 'Aide test',
          sousTitre: '',
          categorie: '🥦 Alimentation',
          thematique: ClefThematiqueAPI.alimentation,
          nombreDePointsAGagner: '25',
          miseEnAvant: '',
          estGratuit: false,
          type: 'AIDE',
          illustrationURL: 'https://picsum.photos/200/300',
          url: 'vos-aides-velo',
          isUrlExterne: false,
          contenu: '<h3>Titre test</h3><p>lorem ipsum dolor test</p>',
          idDuContenu: '',
          isSimulateur: true,
        },
        {
          id: 'id-5',
          titre: 'Aide test',
          sousTitre: '',
          categorie: '🥦 Alimentation',
          thematique: ClefThematiqueAPI.alimentation,
          nombreDePointsAGagner: '25',
          miseEnAvant: '',
          estGratuit: false,
          type: 'AIDE',
          illustrationURL: 'https://picsum.photos/200/300',
          url: 'vos-aides-velo',
          isUrlExterne: false,
          contenu: '<h3>Titre test</h3><p>lorem ipsum dolor test</p>',
          idDuContenu: '',
          isSimulateur: true,
        },
        {
          id: 'id-6',
          titre: 'Aide test',
          sousTitre: '',
          categorie: '🥦 Alimentation',
          thematique: ClefThematiqueAPI.alimentation,
          nombreDePointsAGagner: '25',
          miseEnAvant: '',
          estGratuit: false,
          type: 'AIDE',
          illustrationURL: 'https://picsum.photos/200/300',
          url: 'vos-aides-velo',
          isUrlExterne: false,
          contenu: '<h3>Titre test</h3><p>lorem ipsum dolor test</p>',
          idDuContenu: '',
          isSimulateur: true,
        },
        {
          id: 'id-7',
          titre: 'Aide test',
          sousTitre: '',
          categorie: '🥦 Alimentation',
          thematique: ClefThematiqueAPI.alimentation,
          nombreDePointsAGagner: '25',
          miseEnAvant: '',
          estGratuit: false,
          type: 'AIDE',
          illustrationURL: 'https://picsum.photos/200/300',
          url: 'vos-aides-velo',
          isUrlExterne: false,
          contenu: '<h3>Titre test</h3><p>lorem ipsum dolor test</p>',
          idDuContenu: '',
          isSimulateur: true,
          partenaire: {
            logoUrl: 'https://',
            nom: 'Partenaire test',
          },
        },
      ],
    });
  }

  recupererAidesDuneThematique(utilisateurId: string, clefThematique: ClefThematiqueAPI): Promise<Aides> {
    throw new Error('Method not implemented.');
  }

  previsualiser(idAide: string): Promise<Aide> {
    throw new Error('Method not implemented.');
  }
}

describe('Fichier de tests pour charger toutes les aides', () => {
  it('Renvoie toutes les aides groupés par thématiques', async () => {
    // GIVEN
    const useCase = new ChargementAidesUsecase(new ChargementAidesRepositoryForTest());

    // WHEN
    await useCase.execute('utilisateurId', new ChargementAidesPresenterImpl(expectation));

    // THEN
    function expectation(aidesViewModel: AidesAvecCouvertureViewModel) {
      expect(aidesViewModel).toStrictEqual({
        aides: {
          '🚅 Me déplacer': [
            {
              contenu: '<h3>Titre test</h3><p>lorem ipsum dolor test</p><ul><li>Item 1</li><li>Item 2</li></ul>',
              id: 'id-1',
              isSimulateur: true,
              montantMaximum: "Jusqu'à 15 000 €",
              thematiqueLabel: '🚅 Me déplacer',
              thematiqueTag: {
                label: 'Me déplacer',
                style: {
                  backgroundColor: '#D2E9FF',
                  color: '#021952',
                  emoji: '🚅',
                },
              },
              titre: "Simulez vos aides pour l'achat d'un vélo",
              url: 'vos-aides-velo',
              urlCommencerVotreDemarche: 'urlCommencerVotreDemarche',
              partenaire: undefined,
            },
            {
              contenu: '<h3>Titre test</h3><p>lorem ipsum dolor test</p>',
              id: 'id-2',
              isSimulateur: false,
              montantMaximum: undefined,
              thematiqueLabel: '🚅 Me déplacer',
              thematiqueTag: {
                label: 'Me déplacer',
                style: {
                  backgroundColor: '#D2E9FF',
                  color: '#021952',
                  emoji: '🚅',
                },
              },
              titre: 'Simulez vos aides pour convertir votre voiture thermique en électrique',
              url: 'vos-aides-retrofit',
              urlCommencerVotreDemarche: undefined,
              partenaire: undefined,
            },
          ],
          '🍛 Me nourrir': [
            {
              contenu: '<h3>Titre test</h3><p>lorem ipsum dolor test</p>',
              id: 'id-3',
              isSimulateur: true,
              montantMaximum: undefined,
              thematiqueLabel: '🍛 Me nourrir',
              thematiqueTag: {
                label: 'Me nourrir',
                style: {
                  backgroundColor: '#E3FBAF',
                  color: '#175202',
                  emoji: '🍛',
                },
              },
              titre: 'Aide test',
              url: 'vos-aides-velo',
              urlCommencerVotreDemarche: undefined,
              partenaire: undefined,
            },
            {
              contenu: '<h3>Titre test</h3><p>lorem ipsum dolor test</p>',
              id: 'id-4',
              isSimulateur: true,
              montantMaximum: undefined,
              thematiqueLabel: '🍛 Me nourrir',
              thematiqueTag: {
                label: 'Me nourrir',
                style: {
                  backgroundColor: '#E3FBAF',
                  color: '#175202',
                  emoji: '🍛',
                },
              },
              titre: 'Aide test',
              url: 'vos-aides-velo',
              urlCommencerVotreDemarche: undefined,
              partenaire: undefined,
            },
            {
              contenu: '<h3>Titre test</h3><p>lorem ipsum dolor test</p>',
              id: 'id-5',
              isSimulateur: true,
              montantMaximum: undefined,
              thematiqueLabel: '🍛 Me nourrir',
              thematiqueTag: {
                label: 'Me nourrir',
                style: {
                  backgroundColor: '#E3FBAF',
                  color: '#175202',
                  emoji: '🍛',
                },
              },
              titre: 'Aide test',
              url: 'vos-aides-velo',
              urlCommencerVotreDemarche: undefined,
              partenaire: undefined,
            },
            {
              contenu: '<h3>Titre test</h3><p>lorem ipsum dolor test</p>',
              id: 'id-6',
              isSimulateur: true,
              montantMaximum: undefined,
              thematiqueLabel: '🍛 Me nourrir',
              thematiqueTag: {
                label: 'Me nourrir',
                style: {
                  backgroundColor: '#E3FBAF',
                  color: '#175202',
                  emoji: '🍛',
                },
              },
              titre: 'Aide test',
              url: 'vos-aides-velo',
              urlCommencerVotreDemarche: undefined,
              partenaire: undefined,
            },
            {
              contenu: '<h3>Titre test</h3><p>lorem ipsum dolor test</p>',
              id: 'id-7',
              isSimulateur: true,
              montantMaximum: undefined,
              partenaire: {
                accessibilite: 'proposé par Partenaire test',
                logoUrl: 'https://',
              },
              thematiqueLabel: '🍛 Me nourrir',
              thematiqueTag: {
                label: 'Me nourrir',
                style: {
                  backgroundColor: '#E3FBAF',
                  color: '#175202',
                  emoji: '🍛',
                },
              },
              titre: 'Aide test',
              url: 'vos-aides-velo',
              urlCommencerVotreDemarche: undefined,
            },
          ],
        },
        utilisateurEstCouvert: true,
      });
    }
  });

  it('Renvoie les 5 premiers aides retournées par le back', async () => {
    // WHEN
    const useCase = new ChargementAidesUsecase(new ChargementAidesRepositoryForTest());
    await useCase.execute('utilisateurId', new ChargementAidesNonGroupeesPresenterImpl(expectation));

    // THEN
    function expectation(aidesViewModel: AideNonGroupeeViewModel[]) {
      expect(aidesViewModel).toStrictEqual([
        {
          id: 'id-1',
          isSimulateur: true,
          thematiqueTag: {
            label: 'Me déplacer',
            style: {
              backgroundColor: '#D2E9FF',
              color: '#021952',
              emoji: '🚅',
            },
          },
          titre: "Simulez vos aides pour l'achat d'un vélo",
          url: 'vos-aides-velo',
        },
        {
          id: 'id-2',
          isSimulateur: false,
          thematiqueTag: {
            label: 'Me déplacer',
            style: {
              backgroundColor: '#D2E9FF',
              color: '#021952',
              emoji: '🚅',
            },
          },
          titre: 'Simulez vos aides pour convertir votre voiture thermique en électrique',
          url: '/aides#aide_id-2',
        },
        {
          id: 'id-3',
          isSimulateur: true,
          thematiqueTag: {
            label: 'Me nourrir',
            style: {
              backgroundColor: '#E3FBAF',
              color: '#175202',
              emoji: '🍛',
            },
          },
          titre: 'Aide test',
          url: 'vos-aides-velo',
        },
        {
          id: 'id-4',
          isSimulateur: true,
          thematiqueTag: {
            label: 'Me nourrir',
            style: {
              backgroundColor: '#E3FBAF',
              color: '#175202',
              emoji: '🍛',
            },
          },
          titre: 'Aide test',
          url: 'vos-aides-velo',
        },
        {
          id: 'id-5',
          isSimulateur: true,
          thematiqueTag: {
            label: 'Me nourrir',
            style: {
              backgroundColor: '#E3FBAF',
              color: '#175202',
              emoji: '🍛',
            },
          },
          titre: 'Aide test',
          url: 'vos-aides-velo',
        },
      ]);
    }
  });
});
