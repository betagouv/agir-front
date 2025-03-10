import KYCForm from '@/components/custom/KYC/KYCForm.vue';
import { QuestionViewModel } from '@/domaines/kyc/adapters/listeQuestionsThematique.presenter.impl';
import { fireEvent, render, RenderResult } from '@testing-library/vue';

let page: RenderResult;

describe('Composant dédié au formulaire KYC', () => {
  describe('Type entier', () => {
    const entierProps = {
      questionViewModel: {
        id: 'KYC_entier',
        libelle: 'Quel est votre âge ?',
        type: 'entier',
        reponses_possibles: [{ id: '0', label: '' }],
        points: '5',
        aDejaEteRepondu: false,
        description: 'Description',
      } as QuestionViewModel,
      wordingBouton: 'continuer',
    };

    it('devrait afficher un input type numeric avec une mention Nombre uniquement', () => {
      page = render(KYCForm, {
        props: entierProps,
      });

      const input = page.getByRole('textbox', { name: 'Quel est votre âge ? Nombre uniquement' });
      expect(input.inputMode).toBe('numeric');
      expect(page.getByRole('button', { name: 'continuer' })).toBeDefined();
    });

    it("devrait afficher une alerte si aucune réponse n'est sélectionnée", async () => {
      page = render(KYCForm, {
        props: entierProps,
      });

      const bouton = page.getByRole('button', { name: 'continuer' });
      await fireEvent.click(bouton);

      const alertMessage = page.getByRole('alert').textContent;
      expect(alertMessage).toEqual('Erreur: Veuillez sélectionner une réponse pour continuer');
    });
  });

  describe('Type mosaic_boolean', () => {
    const mosaicBooleanProps = {
      questionViewModel: {
        id: 'KYC_mosaicBool',
        libelle: 'Quel meuble avez-vous ?',
        type: 'mosaic_boolean',
        reponses_possibles: [
          {
            id: 'KYC_1',
            label: 'Armoire',
            emoji: undefined,
            checked: false,
          },
          {
            id: 'KYC_2',
            label: 'Etagere',
            emoji: undefined,
            checked: false,
          },
        ],
        points: '5',
        aDejaEteRepondu: false,
        description: 'Description',
      } as QuestionViewModel,
      wordingBouton: 'continuer',
    };

    it('devrait afficher des checkbox et un bouton pour "aucune de ces propositions"', () => {
      page = render(KYCForm, {
        props: mosaicBooleanProps,
      });

      expect(page.getByRole('checkbox', { name: 'Armoire' })).toBeDefined();
      expect(page.getByRole('checkbox', { name: 'Etagere' })).toBeDefined();

      expect(page.getByRole('button', { name: 'continuer' })).toBeDefined();
      expect(page.getByRole('button', { name: 'Aucune de ces propositions' })).toBeDefined();
    });

    it("devrait afficher une alerte si aucune réponse n'est sélectionnée", async () => {
      page = render(KYCForm, {
        props: mosaicBooleanProps,
      });

      const bouton = page.getByRole('button', { name: 'continuer' });
      await fireEvent.click(bouton);

      const alertMessage = page.getByRole('alert').textContent;
      expect(alertMessage).toEqual('Erreur: Veuillez sélectionner une réponse pour continuer');
    });
  });

  describe('Type choix_unique', () => {
    const uniqueProps = {
      questionViewModel: {
        id: 'KYC_choixUnique',
        libelle: 'Quel meuble choisissez-vous ?',
        type: 'choix_unique',
        reponses_possibles: [
          {
            id: 'KYC_1',
            label: 'Armoire',
          },
          {
            id: 'KYC_2',
            label: 'Etagere',
          },
        ],
        points: '5',
        aDejaEteRepondu: false,
        description: 'Description',
      } as QuestionViewModel,
      wordingBouton: 'continuer',
    };

    it('devrait afficher des radios buttons et un bouton pour continuer', () => {
      page = render(KYCForm, {
        props: uniqueProps,
      });

      expect(page.getByRole('radio', { name: 'Armoire' })).toBeDefined();
      expect(page.getByRole('radio', { name: 'Etagere' })).toBeDefined();

      expect(page.getByRole('button', { name: 'continuer' })).toBeDefined();
    });

    it("devrait afficher une alerte si aucune réponse n'est sélectionnée", async () => {
      page = render(KYCForm, {
        props: uniqueProps,
      });

      const bouton = page.getByRole('button', { name: 'continuer' });
      await fireEvent.click(bouton);

      const alertMessage = page.getByRole('alert').textContent;
      expect(alertMessage).toEqual('Erreur: Veuillez sélectionner une réponse pour continuer');
    });
  });

  describe('Type choix_multiple', () => {
    const multipleProps = {
      questionViewModel: {
        id: 'KYC_choixMultiple',
        libelle: 'Quel meubles choisissez-vous ?',
        type: 'choix_multiple',
        reponses_possibles: [
          {
            id: 'KYC_1',
            label: 'Armoire',
          },
          {
            id: 'KYC_2',
            label: 'Etagere',
          },
        ],
        points: '5',
        aDejaEteRepondu: false,
        description: 'Description',
      } as QuestionViewModel,
      wordingBouton: 'continuer',
    };

    it('devrait afficher une indication que plusieurs réponses sont possibles, des checkboxes et un bouton pour continuer', () => {
      page = render(KYCForm, {
        props: multipleProps,
      });

      expect(page.getByRole('group', { name: 'Plusieurs réponses sont possibles' })).toBeDefined();

      expect(page.getByRole('checkbox', { name: 'Armoire' })).toBeDefined();
      expect(page.getByRole('checkbox', { name: 'Etagere' })).toBeDefined();

      expect(page.getByRole('button', { name: 'continuer' })).toBeDefined();
    });

    it("devrait afficher une alerte si aucune réponse n'est sélectionnée", async () => {
      page = render(KYCForm, {
        props: multipleProps,
      });

      const bouton = page.getByRole('button', { name: 'continuer' });
      await fireEvent.click(bouton);

      const alertMessage = page.getByRole('alert').textContent;
      expect(alertMessage).toEqual('Erreur: Veuillez sélectionner une réponse pour continuer');
    });
  });

  describe('Type libre', () => {
    const libreProps = {
      questionViewModel: {
        id: 'KYC_libre',
        libelle: "Qu'avez vous à dire ?",
        type: 'libre',
        reponses_possibles: [
          {
            id: '0',
            label: '',
          },
        ],
        points: '5',
        aDejaEteRepondu: false,
        description: 'Description',
      } as QuestionViewModel,
      wordingBouton: 'continuer',
    };

    it('devrait afficher une textbox et un bouton continuer', () => {
      page = render(KYCForm, {
        props: libreProps,
      });

      expect(page.getByRole('textbox', { name: 'Votre réponse' })).toBeDefined();
      expect(page.getByRole('button', { name: 'continuer' })).toBeDefined();
    });

    it("devrait afficher une alerte si aucune réponse n'est sélectionnée", async () => {
      page = render(KYCForm, {
        props: libreProps,
      });

      const bouton = page.getByRole('button', { name: 'continuer' });
      await fireEvent.click(bouton);

      const alertMessage = page.getByRole('alert').textContent;
      expect(alertMessage).toEqual('Erreur: Veuillez sélectionner une réponse pour continuer');
    });
  });
});
