import { render, RenderResult } from '@testing-library/vue';
import BilanCarbone from '@/components/custom/BilanCarbone/BilanCarbone.vue';
import {
  BilanCarboneCompletViewModel,
  BilanCarbonePartielViewModel,
} from '@/domaines/bilanCarbone/adapters/bilanCarbone.presenter.impl';
import { beforeEach } from 'vitest';
import { config } from '@vue/test-utils';

config.global.stubs = {
  'router-link': {
    template: '<a href="#"><slot /></a>',
  },
};

describe('BilanCarbone', () => {
  describe('Quand le bilan est incomplet', () => {
    let page: RenderResult;

    beforeEach(() => {
      const bilanCarboneProps: {
        bilanCarbonePartiel?: BilanCarbonePartielViewModel;
        bilanCarboneComplet?: BilanCarboneCompletViewModel;
      } = {
        bilanCarbonePartiel: {
          titre: 'Estimez mon <span class="text--bleu">bilan environnemental</span>',
          pourcentageCompletionTotal: 89,
          categories: [
            {
              label: '🚙 Transports',
              tag: { wording: 'Fort', classes: 'tag-impact-fort' },
              progressBarStyle: 'progress-bar-impact-fort',
            },
            {
              label: '🥘 Alimentation',
              tag: { wording: 'Moyen', classes: 'tag-impact-moyen' },
              progressBarStyle: 'progress-bar-impact-moyen',
            },
            {
              label: '🏡 Logement',
              tag: { wording: 'Faible', classes: 'tag-impact-faible' },
              progressBarStyle: 'progress-bar-impact-faible',
            },
            {
              label: '🛍 Consommation',
              tag: { wording: 'Très fort', classes: 'tag-impact-tres-fort' },
              progressBarStyle: 'progress-bar-impact-tres-fort',
            },
          ],
          thematiquesBilan: [
            {
              clefUnivers: 'transport',
              contentId: 'ENCHAINEMENT_KYC_bilan_transport',
              label: '🚗 Transports',
              urlImage: 'https://res.cloudinary.com/dq023imd8/image/upload/v1728466903/Mobilite_df75aefd09.svg',
              estTermine: true,
              pourcentageProgression: 100,
              nombreTotalDeQuestion: 9,
            },
            {
              clefUnivers: 'alimentation',
              contentId: 'ENCHAINEMENT_KYC_bilan_alimentation',
              label: '🥦 Alimentation',
              urlImage: 'https://res.cloudinary.com/dq023imd8/image/upload/v1728466523/cuisine_da54797693.svg',
              estTermine: false,
              pourcentageProgression: 33,
              nombreTotalDeQuestion: 6,
            },
            {
              clefUnivers: 'logement',
              contentId: 'ENCHAINEMENT_KYC_bilan_logement',
              label: '🏡 Logement',
              urlImage: 'https://res.cloudinary.com/dq023imd8/image/upload/v1728468978/maison_80242d91f3.svg',
              estTermine: true,
              pourcentageProgression: 12,
              nombreTotalDeQuestion: 8,
            },
          ],
        },
        bilanCarboneComplet: undefined,
      };

      page = render(BilanCarbone, {
        props: bilanCarboneProps,
      });
    });

    it('affiche le titre du bilan partiel et une première estimation', () => {
      expect(page.getByRole('heading', { level: 2, name: 'Ma première estimation' })).toBeDefined();
      const transport = page.getByText('🚙 Transports');
      expect(transport.nextElementSibling?.innerHTML).toEqual('Fort');

      const alimentation = page.getByText('🥘 Alimentation');
      expect(alimentation.nextElementSibling?.innerHTML).toEqual('Moyen');

      const logement = page.getAllByText('🏡 Logement')[0];
      expect(logement.nextElementSibling?.innerHTML).toEqual('Faible');

      const consommation = page.getByText('🛍 Consommation');
      expect(consommation.nextElementSibling?.innerHTML).toEqual('Très fort');
    });

    it('affiche les cartes pour affiner son bilan', () => {
      expect(page.getByRole('heading', { level: 2, name: 'Affinez mon estimation' })).toBeDefined();
      const carteTransport = page.getByRole('link', { name: '🚗 Transports' });
      expect(carteTransport).toBeDefined();
      expect(carteTransport).toHaveProperty('title', "Allez sur l'estimation du bilan 🚗 Transports");
      const progressTransport = page.getByRole('progressbar', { name: 'Progression transport ' });
      expect(progressTransport).toBeDefined();
      expect(progressTransport.getAttribute('aria-valuenow')).toBe('100');

      const carteAlimentation = page.getByRole('link', { name: '🥦 Alimentation' });
      expect(carteAlimentation).toBeDefined();
      expect(carteAlimentation).toHaveProperty('title', "Allez sur l'estimation du bilan 🥦 Alimentation");
      const progressAlimentation = page.getByRole('progressbar', { name: 'Progression alimentation' });
      expect(progressAlimentation).toBeDefined();
      expect(progressAlimentation.getAttribute('aria-valuenow')).toBe('33');

      const carteLogement = page.getByRole('link', { name: '🏡 Logement' });
      expect(carteLogement).toBeDefined();
      expect(carteLogement).toHaveProperty('title', "Allez sur l'estimation du bilan 🏡 Logement");
      const progressLogement = page.getByRole('progressbar', { name: 'Progression logement' });
      expect(progressLogement).toBeDefined();
      expect(progressLogement.getAttribute('aria-valuenow')).toBe('12');
    });
  });

  describe('Quand le bilan est complet', () => {
    it('affiche le titre du bilan complet', () => {
      const bilanCarboneProps: {
        bilanCarbonePartiel?: BilanCarbonePartielViewModel;
        bilanCarboneComplet?: BilanCarboneCompletViewModel;
      } = {
        bilanCarbonePartiel: undefined,
        bilanCarboneComplet: {
          titre: 'Mon bilan <span class="text--bleu">environnemental</span>',
          pourcentageProgressBar: 52.18743032269549,
          nombreDeTonnesAnnuel: '6,3',
          impactKgAnnuel: { valeur: '6.3', unite: 'tonnes' },
          univers: [
            {
              label: '🥦 Alimentation',
              impactKgAnnuel: { valeur: '3.3', unite: 'tonnes' },
              pourcentage: 52,
              emoji: '🍴',
              details: [
                { emoji: '🥩', label: 'Viandes', impactKgAnnuel: { valeur: '2.2', unite: 'tonnes' }, pourcentage: 68 },
                { emoji: '🥤', label: 'Boissons', impactKgAnnuel: { valeur: '336 ', unite: 'kg' }, pourcentage: 10 },
                { emoji: '🐟', label: 'Poissons', impactKgAnnuel: { valeur: '182 ', unite: 'kg' }, pourcentage: 6 },
                {
                  emoji: '🥐',
                  label: 'Petit déjeuner',
                  impactKgAnnuel: { valeur: '113 ', unite: 'kg' },
                  pourcentage: 3,
                },
                {
                  emoji: '🥦',
                  label: 'Fruits & Légumes',
                  impactKgAnnuel: { valeur: '0 ', unite: 'kg' },
                  pourcentage: 0,
                },
              ],
            },
            {
              label: '🏛️ Services sociétaux',
              impactKgAnnuel: { valeur: '1.5', unite: 'tonnes' },
              pourcentage: 23,
              emoji: '🏛️',
              details: [
                {
                  emoji: '🏛',
                  label: 'Services publics',
                  impactKgAnnuel: { valeur: '1.3', unite: 'tonnes' },
                  pourcentage: 87,
                },
                {
                  emoji: '✉️',
                  label: 'Services marchands',
                  impactKgAnnuel: { valeur: '191 ', unite: 'kg' },
                  pourcentage: 13,
                },
              ],
            },
            {
              label: '🛒 Consommation durable',
              impactKgAnnuel: { valeur: '766 ', unite: 'kg' },
              pourcentage: 12,
              emoji: '📦',
              details: [
                { emoji: '🐶', label: 'Animaux', impactKgAnnuel: { valeur: '358 ', unite: 'kg' }, pourcentage: 47 },
                {
                  emoji: '📦',
                  label: 'Autres produits',
                  impactKgAnnuel: { valeur: '123 ', unite: 'kg' },
                  pourcentage: 16,
                },
                { emoji: '🎭', label: 'Loisirs', impactKgAnnuel: { valeur: '119 ', unite: 'kg' }, pourcentage: 16 },
                {
                  emoji: '🔌',
                  label: 'Electroménager',
                  impactKgAnnuel: { valeur: '49 ', unite: 'kg' },
                  pourcentage: 6,
                },
                { emoji: '🛋️', label: 'Ameublement', impactKgAnnuel: { valeur: '47 ', unite: 'kg' }, pourcentage: 6 },
                { emoji: '👕', label: 'Textile', impactKgAnnuel: { valeur: '18 ', unite: 'kg' }, pourcentage: 2 },
                { emoji: '📺', label: 'Numérique', impactKgAnnuel: { valeur: '18 ', unite: 'kg' }, pourcentage: 2 },
                { emoji: '🚬', label: 'Tabac', impactKgAnnuel: { valeur: '7 ', unite: 'kg' }, pourcentage: 1 },
              ],
            },
            {
              label: '🏡 Logement',
              impactKgAnnuel: { valeur: '514 ', unite: 'kg' },
              pourcentage: 8,
              emoji: '🏠',
              details: [
                {
                  emoji: '🧱',
                  label: 'Construction',
                  impactKgAnnuel: { valeur: '312 ', unite: 'kg' },
                  pourcentage: 61,
                },
                {
                  emoji: '❄️',
                  label: 'Climatisation',
                  impactKgAnnuel: { valeur: '169 ', unite: 'kg' },
                  pourcentage: 33,
                },
                { emoji: '⚡', label: 'Electricité', impactKgAnnuel: { valeur: '24 ', unite: 'kg' }, pourcentage: 5 },
                { emoji: '☘️', label: 'Extérieur', impactKgAnnuel: { valeur: '7 ', unite: 'kg' }, pourcentage: 1 },
                { emoji: '🏖', label: 'Vacances', impactKgAnnuel: { valeur: '2 ', unite: 'kg' }, pourcentage: 0 },
                { emoji: '🔥', label: 'Chauffage', impactKgAnnuel: { valeur: '0 ', unite: 'kg' }, pourcentage: 0 },
                { emoji: '🏊', label: 'Piscine', impactKgAnnuel: { valeur: '0 ', unite: 'kg' }, pourcentage: 0 },
              ],
            },
            {
              label: '🚗 Transports',
              impactKgAnnuel: { valeur: '262 ', unite: 'kg' },
              pourcentage: 4,
              emoji: '🚦',
              details: [
                { emoji: '✈️', label: 'Avion', impactKgAnnuel: { valeur: '207 ', unite: 'kg' }, pourcentage: 79 },
                {
                  emoji: '🚌',
                  label: 'Transports en commun',
                  impactKgAnnuel: { valeur: '34 ', unite: 'kg' },
                  pourcentage: 13,
                },
                { emoji: '⛴', label: 'Ferry', impactKgAnnuel: { valeur: '12 ', unite: 'kg' }, pourcentage: 5 },
                { emoji: '🚋', label: 'Train', impactKgAnnuel: { valeur: '9 ', unite: 'kg' }, pourcentage: 3 },
                { emoji: '🚘️', label: 'Voiture', impactKgAnnuel: { valeur: '0 ', unite: 'kg' }, pourcentage: 0 },
                { emoji: '🛵', label: '2 roues', impactKgAnnuel: { valeur: '0 ', unite: 'kg' }, pourcentage: 0 },
                { emoji: '🚲', label: 'Mobilité douce', impactKgAnnuel: { valeur: '0 ', unite: 'kg' }, pourcentage: 0 },
                { emoji: '🏖️', label: 'Vacances', impactKgAnnuel: { valeur: '0 ', unite: 'kg' }, pourcentage: 0 },
              ],
            },
          ],
          top3: [
            { emoji: '🥩', label: 'Viandes', pourcentage: '36' },
            { emoji: '🐶', label: 'Animaux', pourcentage: '6' },
            { emoji: '🧱', label: 'Construction', pourcentage: '5' },
          ],
          thematiquesBilan: [
            {
              clefUnivers: 'transport',
              contentId: 'ENCHAINEMENT_KYC_bilan_transport',
              label: '🚗 Transports',
              urlImage: 'https://res.cloudinary.com/dq023imd8/image/upload/v1728466903/Mobilite_df75aefd09.svg',
              estTermine: true,
              pourcentageProgression: 100,
              nombreTotalDeQuestion: 9,
            },
            {
              clefUnivers: 'alimentation',
              contentId: 'ENCHAINEMENT_KYC_bilan_alimentation',
              label: '🥦 Alimentation',
              urlImage: 'https://res.cloudinary.com/dq023imd8/image/upload/v1728466523/cuisine_da54797693.svg',
              estTermine: true,
              pourcentageProgression: 100,
              nombreTotalDeQuestion: 6,
            },
            {
              clefUnivers: 'consommation',
              contentId: 'ENCHAINEMENT_KYC_bilan_consommation',
              label: '🛒 Consommation durable',
              urlImage: 'https://res.cloudinary.com/dq023imd8/image/upload/v1728468852/conso_7522b1950d.svg',
              estTermine: true,
              pourcentageProgression: 100,
              nombreTotalDeQuestion: 8,
            },
            {
              clefUnivers: 'logement',
              contentId: 'ENCHAINEMENT_KYC_bilan_logement',
              label: '🏡 Logement',
              urlImage: 'https://res.cloudinary.com/dq023imd8/image/upload/v1728468978/maison_80242d91f3.svg',
              estTermine: true,
              pourcentageProgression: 100,
              nombreTotalDeQuestion: 8,
            },
          ],
        },
      };
      const page = render(BilanCarbone, {
        props: bilanCarboneProps,
      });
      expect(page.getByRole('heading', { level: 2, name: "Mes principaux postes d'émission" })).toBeDefined();
    });
  });
});
