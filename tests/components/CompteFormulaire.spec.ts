import PageCompteFormulaire from '../../src/components/custom/PageCompteFormulaire.vue';
import { SpyInstance, beforeEach, describe, it } from 'vitest';
import { fireEvent, render } from '@testing-library/vue';
import { CompteUtlisateurViewModel } from '../../src/compte/adapters/compteUtilisateur.presenter.impl';
import { ChargementCommunesUsecase } from '../../src/communes/chargementCommunesUsecase';

const compteUtlisateurViewModel: CompteUtlisateurViewModel = {
  id: 'idUser',
  nom: 'Claude',
  prenom: 'Dubois',
  mail: 'claud-dubois@exemple.com',
  codePostal: '75001',
  commune: 'PARIS 01',
  revenuFiscal: '123456',
};

const props = { compteUtlisateurViewModel };

describe('Compte - Formulaire', () => {
  let titre: HTMLElement;
  let inputNom: HTMLInputElement;
  let inputEmail: HTMLInputElement;
  let inputCodePostal: HTMLInputElement;
  let submitBouton: HTMLInputElement;

  beforeEach(() => {
    // GIVEN
    let chargementCommunesUsecaseMock: SpyInstance<[string], Promise<string[]>>;

    chargementCommunesUsecaseMock = vi
      .spyOn(ChargementCommunesUsecase.prototype, 'execute')
      .mockImplementation((_codePostal: string) => Promise.resolve([]));

    const { getByRole } = render(PageCompteFormulaire, { props });

    inputNom = getByRole('textbox', { name: 'Nom' });
    inputEmail = getByRole('textbox', { name: /Adresse électronique/i });
    inputCodePostal = getByRole('textbox', { name: /Code postal/i });
    submitBouton = getByRole('button', { name: 'Mettre à jour' });
    titre = getByRole('heading', { level: 2, name: 'Identité personnelle' });
  });

  it("pré-remplit et affiche les champs associés au compte de l'utilisateur", () => {
    // WHEN
    // THEN
    expect(titre).toBeDefined();
    expect(inputNom).toBeDefined();
    expect(inputNom.value).toBe('Claude');
    expect(inputEmail).toBeDefined();
    expect(inputEmail.value).toBe('claud-dubois@exemple.com');
    expect(inputCodePostal).toBeDefined();
    expect(inputCodePostal.value).toBe('75001');
    expect(submitBouton).toBeDefined();
  });

  describe('quand je mets à jour mes informations', () => {
    it('la valeur des champs est modifiée', async () => {
      // WHEN
      await fireEvent.change(inputNom, { target: { value: 'John' } });
      await fireEvent.change(inputEmail, { target: { value: 'john-dubois@exemple.com' } });
      await fireEvent.change(inputCodePostal, { target: { value: '75002' } });

      // THEN
      expect(inputNom.value).toBe('John');
      expect(inputEmail.value).toBe('john-dubois@exemple.com');
      expect(inputCodePostal.value).toBe('75002');
    });
  });
});
