import PageCompteFormulaire from '../../src/components/custom/PageCompteFormulaire.vue';
import { describe, it } from 'vitest';
import { fireEvent, render } from '@testing-library/vue';
import { CompteUtlisateurViewModel } from '../../src/compte/adapters/compteUtilisateur.presenter.impl';

const compteUtlisateurViewModel: CompteUtlisateurViewModel = {
  id: 'idUser',
  nom: 'Claude',
  prenom: 'Dubois',
  mail: 'claud-dubois@exemple.com',
  codePostal: '75001',
  revenuFiscal: '123456',
};

const props = { compteUtlisateurViewModel };

describe('Compte - Formulaire', () => {
  it("pré-remplit et affiche les champs associés au compte de l'utilisateur", () => {
    // GIVEN
    const { getByRole } = render(PageCompteFormulaire, { props });

    // WHEN
    const inputNom = getByRole<HTMLInputElement>('textbox', { name: 'Nom' });
    const inputEmail = getByRole<HTMLInputElement>('textbox', { name: 'Adresse électronique' });
    const inputCodePostal = getByRole<HTMLInputElement>('textbox', { name: 'Code Postal' });
    const submitBouton = getByRole<HTMLInputElement>('button', { name: 'Mettre à jour' });

    // THEN
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
      // GIVEN
      const { getByRole } = render(PageCompteFormulaire, { props });

      // WHEN
      const inputNom = getByRole<HTMLInputElement>('textbox', { name: 'Nom' });
      const inputEmail = getByRole<HTMLInputElement>('textbox', { name: 'Adresse électronique' });
      const inputCodePostal = getByRole<HTMLInputElement>('textbox', { name: 'Code Postal' });

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
