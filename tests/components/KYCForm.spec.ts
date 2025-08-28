import KYCForm from '@/components/custom/KYC/KYCForm.vue';
import { fireEvent, render, RenderResult } from '@testing-library/vue';
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
        estObligatoire: false,
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
        estObligatoire: false,
      } as QuestionViewModel,
      wordingBouton: 'continuer',
    };
    const entierObligatoire = {
      questionViewModel: {
        id: 'KYC_entier',
        libelle: 'Quel est votre âge ?',
        type: 'entier',
        reponses_possibles: [],
        points: '5',
        aDejaEteRepondu: false,
        description: 'Description',
        estObligatoire: true,
        nombreTotalDeQuestions: 2,
        etapeCourante: 1,
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

    it('Sans réponse, obligatoire - affiche une alerte lors du submit', async () => {
      page = render(KYCForm, { props: entierObligatoire });
      await nextTick();

      const boutonContinuer = page.getByRole('button', { name: 'continuer' });
      await fireEvent.click(boutonContinuer);

      const alert = page.getByRole('alert');
      expect(alert).toBeDefined();
      expect(alert.textContent).toBe('Erreur: Veuillez saisir une valeur numérique pour continuer');
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
        estObligatoire: false,
      } as QuestionViewModel,
      wordingBouton: 'continuer',
    };

    const mosaicBooleanAvecReponseProps = {
      questionViewModel: {
        id: 'KYC_mosaicBool',
        libelle: 'Quel meuble avez-vous ?',
        type: 'mosaic_boolean',
        reponses_possibles: [
          { id: 'KYC_1', label: 'Armoire', emoji: undefined, checked: true },
          { id: 'KYC_2', label: 'Etagere', emoji: undefined, checked: false },
        ],
        points: '5',
        aDejaEteRepondu: false,
        description: 'Description',
        estObligatoire: false,
      } as QuestionViewModel,
      wordingBouton: 'continuer',
    };

    const mosaicBooleanObligatoireProps = {
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
        estObligatoire: true,
      } as QuestionViewModel,
      wordingBouton: 'continuer',
    };

    it('Sans réponse - affiche les cases à cocher et le bouton passer', async () => {
      page = render(KYCForm, { props: mosaicBooleanProps });
      await nextTick();

      expect(page.getByRole('checkbox', { name: 'Armoire' })).toBeDefined();
      expect(page.getByRole('checkbox', { name: 'Etagere' })).toBeDefined();
      expect(page.getByText('Passer la question')).toBeDefined();
    });

    it('Avec réponse - affiche le bouton continuer', async () => {
      page = render(KYCForm, { props: mosaicBooleanAvecReponseProps });
      await nextTick();

      expect(page.getByRole('button', { name: 'continuer' })).toBeDefined();
    });

    it('Sans réponse, obligatoire - affiche une alerte lors du submit', async () => {
      page = render(KYCForm, { props: mosaicBooleanObligatoireProps });
      await nextTick();

      const boutonContinuer = page.getByRole('button', { name: 'continuer' });
      await fireEvent.click(boutonContinuer);

      const alert = page.getByRole('alert');
      expect(alert).toBeDefined();
      expect(alert.textContent).toBe('Erreur: Veuillez sélectionner une option pour continuer');
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
        estObligatoire: false,
      } as QuestionViewModel,
      wordingBouton: 'continuer',
    };

    const uniqueAvecReponseProps = {
      questionViewModel: {
        id: 'KYC_choixUnique',
        libelle: 'Quel meuble choisissez-vous ?',
        type: 'choix_unique',
        reponses_possibles: [
          { id: 'KYC_1', label: 'Armoire', checked: true },
          { id: 'KYC_2', label: 'Etagere' },
        ],
        points: '5',
        aDejaEteRepondu: false,
        description: 'Description',
        estObligatoire: false,
      } as QuestionViewModel,
      wordingBouton: 'continuer',
    };

    const uniqueObligatoireProps = {
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
        estObligatoire: true,
      } as QuestionViewModel,
      wordingBouton: 'continuer',
    };

    it('Sans réponse - affiche des boutons radio et le bouton passer', async () => {
      page = render(KYCForm, { props: uniqueProps });
      await nextTick();

      expect(page.getByRole('radio', { name: 'Armoire' })).toBeDefined();
      expect(page.getByRole('radio', { name: 'Etagere' })).toBeDefined();
      expect(page.getByRole('button', { name: 'Passer la question' })).toBeDefined();
    });

    it('Avec réponse - affiche le bouton continuer', async () => {
      page = render(KYCForm, { props: uniqueAvecReponseProps });
      await nextTick();

      expect(page.getByRole('button', { name: 'continuer' })).toBeDefined();
    });

    it('Sans réponse, obligatoire - affiche une alerte lors du submit', async () => {
      page = render(KYCForm, { props: uniqueObligatoireProps });
      await nextTick();

      const boutonContinuer = page.getByRole('button', { name: 'continuer' });
      await fireEvent.click(boutonContinuer);

      const alert = page.getByRole('alert');
      expect(alert).toBeDefined();
      expect(alert.textContent).toBe('Erreur: Veuillez sélectionner une option pour continuer');
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
        estObligatoire: false,
      } as QuestionViewModel,
      wordingBouton: 'continuer',
    };

    const multipleAvecReponseProps = {
      questionViewModel: {
        id: 'KYC_choixMultiple',
        libelle: 'Quel meubles choisissez-vous ?',
        type: 'choix_multiple',
        reponses_possibles: [
          { id: 'KYC_1', label: 'Armoire', checked: true },
          { id: 'KYC_2', label: 'Etagere' },
        ],
        points: '5',
        aDejaEteRepondu: false,
        description: 'Description',
        estObligatoire: false,
      } as QuestionViewModel,
      wordingBouton: 'continuer',
    };

    const multipleObligatoireProps = {
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
        estObligatoire: true,
      } as QuestionViewModel,
      wordingBouton: 'continuer',
    };

    it('Sans réponse - affiche des checkboxes et le bouton passer', async () => {
      page = render(KYCForm, { props: multipleProps });
      await nextTick();

      expect(page.getByRole('checkbox', { name: 'Armoire' })).toBeDefined();
      expect(page.getByRole('checkbox', { name: 'Etagere' })).toBeDefined();
      expect(page.getByRole('button', { name: 'Passer la question' })).toBeDefined();
    });

    it('Avec réponse - affiche le bouton continuer', async () => {
      page = render(KYCForm, { props: multipleAvecReponseProps });
      await nextTick();

      expect(page.getByRole('button', { name: 'continuer' })).toBeDefined();
    });

    it('Sans réponse, obligatoire - affiche une alerte lors du submit', async () => {
      page = render(KYCForm, { props: multipleObligatoireProps });
      await nextTick();

      const boutonContinuer = page.getByRole('button', { name: 'continuer' });
      await fireEvent.click(boutonContinuer);

      const alert = page.getByRole('alert');
      expect(alert).toBeDefined();
      expect(alert.textContent).toBe('Erreur: Veuillez sélectionner au moins une option pour continuer');
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
        estObligatoire: false,
      } as QuestionViewModel,
      wordingBouton: 'continuer',
    };

    const libreAvecReponseProps = {
      questionViewModel: {
        id: 'KYC_libre',
        libelle: "Qu'avez vous à dire ?",
        type: 'libre',
        reponses_possibles: [{ id: '0', label: 'Une réponse' }],
        points: '5',
        aDejaEteRepondu: false,
        description: 'Description',
        estObligatoire: false,
      } as QuestionViewModel,
      wordingBouton: 'continuer',
    };

    const libreObligatoireProps = {
      questionViewModel: {
        id: 'KYC_libre',
        libelle: "Qu'avez vous à dire ?",
        type: 'libre',
        reponses_possibles: [{ id: '0', label: '' }],
        points: '5',
        aDejaEteRepondu: false,
        description: 'Description',
        estObligatoire: true,
      } as QuestionViewModel,
      wordingBouton: 'continuer',
    };

    it('Sans réponse - affiche un champ texte libre et le bouton passer', async () => {
      page = render(KYCForm, { props: libreProps });
      await nextTick();

      expect(page.getByRole('textbox', { name: /votre réponse/i })).toBeDefined();
      expect(page.getByRole('button', { name: 'Passer la question' })).toBeDefined();
    });

    it('Avec réponse - affiche le bouton continuer', async () => {
      page = render(KYCForm, { props: libreAvecReponseProps });
      await nextTick();

      expect(page.getByRole('button', { name: 'continuer' })).toBeDefined();
    });

    it('Sans réponse, obligatoire - affiche une alerte lors du submit', async () => {
      page = render(KYCForm, { props: libreObligatoireProps });
      await nextTick();

      const boutonContinuer = page.getByRole('button', { name: 'continuer' });
      await fireEvent.click(boutonContinuer);

      const alert = page.getByRole('alert');
      expect(alert).toBeDefined();
      expect(alert.textContent).toBe('Erreur: Veuillez renseigner une réponse pour continuer');
    });
  });
});
