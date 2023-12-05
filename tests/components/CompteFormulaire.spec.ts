import { describe, it, beforeEach, afterEach } from 'vitest';
import { fireEvent, render } from '@testing-library/vue';
import PageCompteFormulaire from '@/components/custom/PageCompteFormulaire.vue';
import { CompteUtlisateurViewModel } from '@/compte/adapters/compteUtilisateur.presenter.impl';
import { ChargementCommunesUsecase } from '@/communes/chargementCommunesUsecase';
import { MettreAJourCompteUtilisateurUsecase } from '@/compte/mettreAJourCompteUtilisateur.usecase';

const compteUtlisateurViewModel: CompteUtlisateurViewModel = {
  id: 'idUser',
  nom: 'Claude',
  prenom: 'Dubois',
  mail: 'claud-dubois@exemple.com',
  codePostal: '75002',
  commune: 'PARIS 02',
  revenuFiscal: '123456',
  nombreDePartsFiscales: '1',
  abonnementTransport: false,
};

describe.skip('Compte - Formulaire', () => {
  let titre: HTMLElement;
  let inputNom: HTMLInputElement;
  let inputPrenom: HTMLInputElement;
  let inputEmail: HTMLInputElement;
  let inputCodePostal: HTMLInputElement;
  let selectCommune: HTMLSelectElement;
  let inputRevenuFiscal: HTMLInputElement;
  let nombreDePartsFiscales: HTMLInputElement;
  let submitBouton: HTMLInputElement;

  beforeEach(() => {
    // GIVEN
    const props = { compteUtlisateurViewModel: { ...compteUtlisateurViewModel } };

    vi.spyOn(ChargementCommunesUsecase.prototype, 'execute').mockImplementation((_codePostal: string) =>
      Promise.resolve(['PARIS 01', 'PARIS 02'])
    );

    const { getByRole } = render(PageCompteFormulaire, { props });

    inputNom = getByRole('textbox', { name: 'Nom' });
    inputPrenom = getByRole('textbox', { name: 'Prénom' });
    inputEmail = getByRole('textbox', { name: /Adresse électronique/i });
    inputCodePostal = getByRole('textbox', { name: /Code postal/i });
    selectCommune = getByRole('combobox', { name: /Sélection d'une commune/i });
    inputRevenuFiscal = getByRole('textbox', { name: 'Revenu fiscal de référence' });
    nombreDePartsFiscales = getByRole('textbox', { name: 'Nombre de parts fiscales' });
    submitBouton = getByRole('button', { name: 'Mettre à jour' });
    titre = getByRole('heading', { level: 2, name: 'Identité personnelle' });
  });

  afterEach(() => {
    vi.resetAllMocks();
    vi.resetConfig();
  });

  describe('quand je charge le formulaire', () => {
    it("pré-rempli et affiche les champs associés au compte de l'utilisateur", () => {
      // WHEN
      // THEN
      expect(titre).toBeDefined();
      expect(inputNom).toBeDefined();
      expect(inputNom.value).toBe('Claude');
      expect(inputPrenom).toBeDefined();
      expect(inputPrenom.value).toBe('Dubois');
      expect(inputEmail).toBeDefined();
      expect(inputEmail.value).toBe('claud-dubois@exemple.com');
      expect(inputCodePostal).toBeDefined();
      expect(inputCodePostal.value).toBe('75002');
      expect(selectCommune).toBeDefined();
      expect(selectCommune.value).toBe('PARIS 02');
      expect(inputRevenuFiscal).toBeDefined();
      expect(inputRevenuFiscal.value).toBe('123456');
      expect(nombreDePartsFiscales).toBeDefined();
      expect(nombreDePartsFiscales.value).toBe('1');
      expect(submitBouton).toBeDefined();
    });
  });

  describe('quand je mets à jour mes informations', () => {
    it('la valeur des champs est modifiée', async () => {
      // WHEN
      await fireEvent.update(inputPrenom, 'Smith');
      await fireEvent.update(inputNom, 'John');
      await fireEvent.update(inputEmail, 'john-smith@exemple.com');
      await fireEvent.update(inputRevenuFiscal, '654321');
      await fireEvent.update(inputCodePostal, '75001');
      await fireEvent.update(selectCommune, 'PARIS 01');
      await fireEvent.update(nombreDePartsFiscales, '2');

      // THEN
      expect(inputNom.value).toBe('John');
      expect(inputPrenom.value).toBe('Smith');
      expect(inputEmail.value).toBe('john-smith@exemple.com');
      expect(inputRevenuFiscal.value).toBe('654321');
      expect(inputCodePostal.value).toBe('75001');
      expect(selectCommune.value).toBe('PARIS 01');
      expect(nombreDePartsFiscales.value).toBe('2');
    });

    describe("quand l'utilisateur soumet ses modifications", () => {
      const mettreAJourCompteUtilisateurUsecaseMock = vi
        .spyOn(MettreAJourCompteUtilisateurUsecase.prototype, 'execute')
        .mockImplementation((_compteUtlisateurViewModel: CompteUtlisateurViewModel) => Promise.resolve(true));

      describe('si les informations sont correctes', () => {
        it('appele le usecase mettre à jour compte utilisateur avec les bonnes informations', async () => {
          // WHEN
          await fireEvent.update(inputNom, 'John');
          await fireEvent.update(inputPrenom, 'Smith');
          await fireEvent.update(inputEmail, 'john-smith@exemple.com');
          await fireEvent.update(inputRevenuFiscal, '654321');
          await fireEvent.update(inputCodePostal, '75001');
          await fireEvent.update(selectCommune, 'PARIS 01');
          await fireEvent.update(nombreDePartsFiscales, '2');
          await fireEvent.click(submitBouton);

          expect(mettreAJourCompteUtilisateurUsecaseMock).toHaveBeenNthCalledWith(1, {
            id: 'idUser',
            nom: 'John',
            prenom: 'Smith',
            mail: 'john-smith@exemple.com',
            revenuFiscal: '654321',
            codePostal: '75001',
            commune: 'PARIS 01',
            nombreDePartsFiscales: '2',
          });
        });

        it.todo('affiche un message de confirmation', async () => {
          // getByRole('alert');
        });
      });

      describe('quand les informations sont incorrectes', () => {
        it("n'appele pas le usecase", async () => {
          // WHEN
          await fireEvent.update(inputCodePostal, '');
          await fireEvent.update(selectCommune, '');
          await fireEvent.click(submitBouton);

          expect(mettreAJourCompteUtilisateurUsecaseMock).not.toHaveBeenCalled();
        });

        it.todo("affiche un message d'erreur", () => {
          // getByRole('alert');
        });
      });
    });
  });
});
