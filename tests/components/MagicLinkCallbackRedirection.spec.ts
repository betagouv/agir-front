import { render, RenderResult } from '@testing-library/vue';
import MagicLinkCallbackRedirection from '@/components/custom/ValidationCompte/MagicLinkCallbackRedirection.vue';
import { beforeEach, vi } from 'vitest';

describe('Tests pour le composant MagicLinkCallback', () => {
  let page: RenderResult;
  const validerCompteUtilisateurMock = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();

    Object.defineProperty(window, 'location', {
      value: {
        href: 'https://example.com/authentification/validation-lien-magique?email=test@example.com&code=123456&origin=mobile',
        replace: vi.fn(),
      },
      writable: true,
    });
  });

  describe("Si l'utilisateur a fait son inscription sur mobile", () => {
    it("et se rend sur la page avec un mobile, affiche deux boutons pour poursuivre sur l'application ou sur le navigateur", async () => {
      const props = {
        inscritDepuisLeMobile: true,
        estSurMobile: true,
        validerCompteUtilisateur: validerCompteUtilisateurMock,
      };
      page = render(MagicLinkCallbackRedirection, { props });

      const texteIntro = page.getByText('Vous êtes sur le point de finaliser votre inscription.');
      expect(texteIntro).toBeDefined();

      const boutonApp = page.getByRole('link', { name: "Continuer sur l'application mobile" });
      expect(boutonApp).toBeDefined();
      expect(boutonApp.getAttribute('href')).toBe(
        'jagis://example.com/authentification/validation-lien-magique?email=test@example.com&code=123456&origin=mobile',
      );

      const boutonNavigateur = page.getByRole('link', { name: 'Continuer sur ce navigateur' });
      expect(boutonNavigateur).toBeDefined();
      expect(boutonNavigateur.getAttribute('href')).toContain(
        'https://example.com/authentification/validation-lien-magique?email=test%40example.com&code=123456',
      );
      expect(boutonNavigateur.getAttribute('href')).not.toContain('origin=mobile');

      expect(window.location.href).toBe(
        'jagis://example.com/authentification/validation-lien-magique?email=test@example.com&code=123456&origin=mobile',
      );

      expect(validerCompteUtilisateurMock).not.toHaveBeenCalled();
    });

    it('et se rend sur la page avec un ordinateur, effectue la validation du compte et affiche un message de redirection', async () => {
      const props = {
        inscritDepuisLeMobile: true,
        estSurMobile: false,
        validerCompteUtilisateur: validerCompteUtilisateurMock,
      };
      page = render(MagicLinkCallbackRedirection, { props });

      const message = page.getByText('Redirection en cours ... Veuillez patienter.');
      expect(message).toBeDefined();

      expect(validerCompteUtilisateurMock).toHaveBeenCalledTimes(1);
    });
  });

  describe("Si l'utilisateur a fait son inscription sur ordinateur", () => {
    it('et se rend sur la page, effectue la validation du compte affiche un message de redirection', async () => {
      Object.defineProperty(window, 'location', {
        value: {
          href: 'https://example.com/authentification/validation-lien-magique?email=test@example.com&code=123456',
          replace: vi.fn(),
        },
        writable: true,
      });

      const props = {
        inscritDepuisLeMobile: false,
        estSurMobile: false,
        validerCompteUtilisateur: validerCompteUtilisateurMock,
      };
      page = render(MagicLinkCallbackRedirection, { props });

      const message = page.getByText('Redirection en cours ... Veuillez patienter.');
      expect(message).toBeDefined();

      expect(validerCompteUtilisateurMock).toHaveBeenCalledTimes(1);
    });
  });
});
