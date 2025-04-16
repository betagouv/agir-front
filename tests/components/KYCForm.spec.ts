import KYCForm from '@/components/custom/KYC/KYCForm.vue';
import { render, RenderResult } from '@testing-library/vue';
import { nextTick } from 'vue';
import { QuestionViewModel } from '@/domaines/kyc/adapters/question.presenter.impl';

let page: RenderResult;

describe('Composant dédié au formulaire KYC', () => {
  describe('Type entier', () => {
    const entierProps = {
      questionViewModel: {
        id: 'KYC_entier',
        libelle: 'Quel est votre âge ?',
        type: 'entier',
        reponses_possibles: [{ id: '18', label: '18 ans' }],
        points: '5',
        aDejaEteRepondu: false,
        description: 'Description',
      } as QuestionViewModel,
      wordingBouton: 'continuer',
    };
    const entierSansReponseProps = {
      questionViewModel: {
        id: 'KYC_entier',
        libelle: 'Quel est votre âge ?',
        type: 'entier',
        reponses_possibles: [],
        points: '5',
        aDejaEteRepondu: false,
        description: 'Description',
        etapeCourante: 1,
        nombreTotalDeQuestions: 1,
      } as QuestionViewModel,
      wordingBouton: 'continuer',
    };

    it('Sans réponse - affiche un champ numérique avec un bouton passer', async () => {
      page = render(KYCForm, { props: entierSansReponseProps });
      await nextTick();

      const input = page.getByRole('textbox', { name: /quel est votre âge/i });
      expect(input.inputMode).toBe('numeric');
      expect(page.getByRole('button', { name: 'Passer la question' })).toBeDefined();
    });

    it('Avec réponse - affiche le bouton continuer', async () => {
      page = render(KYCForm, { props: entierProps });

      await nextTick();

      expect(page.getByRole('button', { name: 'continuer' })).toBeDefined();
    });
  });

  describe('Type mosaic_boolean', () => {
    const mosaicBooleanProps = {
      questionViewModel: {
        id: 'KYC_mosaicBool',
        libelle: 'Quel meuble avez-vous ?',
        type: 'mosaic_boolean',
        reponses_possibles: [
          { id: 'KYC_1', label: 'Armoire', emoji: undefined, checked: false },
          { id: 'KYC_2', label: 'Etagere', emoji: undefined, checked: false },
        ],
        points: '5',
        aDejaEteRepondu: false,
        description: 'Description',
      } as QuestionViewModel,
      wordingBouton: 'continuer',
    };

    it('affiche les cases à cocher et les bons boutons', async () => {
      page = render(KYCForm, { props: mosaicBooleanProps });
      await nextTick();

      expect(page.getByRole('checkbox', { name: 'Armoire' })).toBeDefined();
      expect(page.getByRole('checkbox', { name: 'Etagere' })).toBeDefined();
      expect(page.getByText('Passer la question')).toBeDefined();
      expect(page.getByText('Aucune de ces propositions')).toBeDefined();
    });
  });

  describe('Type choix_unique', () => {
    const uniqueProps = {
      questionViewModel: {
        id: 'KYC_choixUnique',
        libelle: 'Quel meuble choisissez-vous ?',
        type: 'choix_unique',
        reponses_possibles: [
          { id: 'KYC_1', label: 'Armoire' },
          { id: 'KYC_2', label: 'Etagere' },
        ],
        points: '5',
        aDejaEteRepondu: false,
        description: 'Description',
      } as QuestionViewModel,
      wordingBouton: 'continuer',
    };

    it('affiche des boutons radio', async () => {
      page = render(KYCForm, { props: uniqueProps });
      await nextTick();

      expect(page.getByRole('radio', { name: 'Armoire' })).toBeDefined();
      expect(page.getByRole('radio', { name: 'Etagere' })).toBeDefined();
      expect(page.getByRole('button', { name: 'Passer la question' })).toBeDefined();
    });
  });

  describe('Type choix_multiple', () => {
    const multipleProps = {
      questionViewModel: {
        id: 'KYC_choixMultiple',
        libelle: 'Quel meubles choisissez-vous ?',
        type: 'choix_multiple',
        reponses_possibles: [
          { id: 'KYC_1', label: 'Armoire' },
          { id: 'KYC_2', label: 'Etagere' },
        ],
        points: '5',
        aDejaEteRepondu: false,
        description: 'Description',
      } as QuestionViewModel,
      wordingBouton: 'continuer',
    };

    it('affiche des checkboxes et un bouton continuer', async () => {
      page = render(KYCForm, { props: multipleProps });
      await nextTick();

      expect(page.getByRole('checkbox', { name: 'Armoire' })).toBeDefined();
      expect(page.getByRole('checkbox', { name: 'Etagere' })).toBeDefined();
      expect(page.getByRole('button', { name: 'Passer la question' })).toBeDefined();
    });
  });

  describe('Type libre', () => {
    const libreProps = {
      questionViewModel: {
        id: 'KYC_libre',
        libelle: "Qu'avez vous à dire ?",
        type: 'libre',
        reponses_possibles: [{ id: '0', label: '' }],
        points: '5',
        aDejaEteRepondu: false,
        description: 'Description',
      } as QuestionViewModel,
      wordingBouton: 'continuer',
    };

    it('affiche un champ texte libre', async () => {
      page = render(KYCForm, { props: libreProps });
      await nextTick();

      expect(page.getByRole('textbox', { name: /votre réponse/i })).toBeDefined();
      expect(page.getByRole('button', { name: 'Passer la question' })).toBeDefined();
    });
  });
});
