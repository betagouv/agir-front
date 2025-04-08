import { fireEvent, render, RenderResult, waitFor } from '@testing-library/vue';
import ServiceBarreDeRechercheAdresse from '@/components/custom/Service/ServiceBarreDeRechercheAdresse.vue';
import axios from 'redaxios';
import { beforeEach } from 'vitest';

vi.mock('redaxios');
let page: RenderResult;

describe('Tests pour le composant ServiceBarreDeRechercheAdresse', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('Input doit avoir les bons attributs au chargement', () => {
    page = render(ServiceBarreDeRechercheAdresse);
    const input: HTMLInputElement = page.getByRole('combobox', { name: 'Renseignez votre adresse' });
    expect(input).toBeDefined();
    expect(input.getAttribute('autocomplete')).toBe('off');
    expect(input.getAttribute('aria-activedescendant')).toBe('');
    expect(input.getAttribute('aria-autocomplete')).toBe('list');
    expect(input.getAttribute('aria-controls')).toBe('adresse-menu');
    expect(input.getAttribute('aria-expanded')).toBe('false');
  });

  it('Doit faire les bons appels réseaux pour l autocomplétion', async () => {
    (axios.get as any).mockResolvedValueOnce({
      data: {
        features: [],
      },
    });
    page = render(ServiceBarreDeRechercheAdresse);
    const input = page.getByRole('combobox');
    await fireEvent.update(input, "chaussée d'antin paris 75000");

    await waitFor(() => {
      expect(axios.get).toHaveBeenCalledWith(
        "https://api-adresse.data.gouv.fr/search/?q=chauss%C3%A9e+d'antin+paris+75000&limit=8",
      );
    });
  });

  describe('Doit avoir les bons comportements de navigation', () => {
    beforeEach(async () => {
      (axios.get as any).mockResolvedValueOnce({
        data: {
          features: [
            {
              properties: {
                label: '1 rue de Paris 75000 Paris',
                name: '1 rue de Paris',
                city: 'Paris',
                context: '75, Île-de-France',
                postcode: '75000',
              },
              geometry: { coordinates: [2.3522, 48.8566] },
            },
            {
              properties: {
                label: '2 rue de Lyon 69000 Lyon',
                name: '2 rue de Lyon',
                city: 'Lyon',
                context: '69, Rhône-Alpes',
                postcode: '69000',
              },
              geometry: { coordinates: [4.8357, 45.764] },
            },
          ],
        },
      });

      page = render(ServiceBarreDeRechercheAdresse);
      const input = page.getByRole('combobox');
      await fireEvent.update(input, 'rue de');

      await waitFor(() => {
        const listesAdressesProposees = page.getByRole('listbox');
        expect(listesAdressesProposees).toBeDefined();

        const options = page.getAllByRole('option');
        expect(options.length).toBe(2);
        expect(options[0].getAttribute('aria-selected')).toBe('false');
        expect(options[0].getAttribute('id')).toBe('option-0');
      });
    });

    it('Doit adapter les rôles aria et laffichage avec la navigation clavier', async () => {
      const input = page.getByRole('combobox');

      await fireEvent.keyDown(input, { key: 'ArrowDown' });
      expect(input.getAttribute('aria-activedescendant')).toBe('option-0');

      await fireEvent.keyDown(input, { key: 'ArrowDown' });
      expect(input.getAttribute('aria-activedescendant')).toBe('option-1');

      await fireEvent.keyDown(input, { key: 'ArrowDown' });
      expect(input.getAttribute('aria-activedescendant')).toBe('option-0');
    });

    it('Doit adapter les rôles aria et laffichage avec la navigation souris', async () => {
      const items = page.getAllByRole('option');
      await fireEvent.mouseEnter(items[0]);
      expect(items[0].getAttribute('class')).toContain('adresseSelectionee');
    });

    describe('Doit afficher le dialog dans les bonnes conditions', () => {
      it('Doit souvrir au focus', async () => {
        const input = page.getByRole('combobox');
        await fireEvent.focus(input);

        await waitFor(() => {
          const dialog = page.getByRole('dialog');
          expect(dialog?.hasAttribute('open')).toBe(true);
        });
      });

      it('Doit souvrir avec la flèche vers le bas', async () => {
        const input = page.getByRole('combobox');
        await fireEvent.keyDown(input, { key: 'ArrowDown' });

        await waitFor(() => {
          const dialog = page.getByRole('dialog');
          expect(dialog?.hasAttribute('open')).toBe(true);
        });
      });
    });
  });
});
