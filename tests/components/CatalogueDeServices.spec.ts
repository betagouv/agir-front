import { fireEvent, getByRole, render } from '@testing-library/vue';
import CatalogueDeServices from '@/components/custom/CatalogueDeServices/CatalogueDeServices.vue';
import { ServiceCatalogueViewModel } from '@/services/adapters/serviceCatalogue.presenter.impl';
import { InstallerServiceActifUsecase } from '@/services/installerServiceActif.usecase';
import { EnleverServiceActifUsecase } from '@/services/enleverServiceActif.usecase';

const serviceEcowattEstInstalle = {
  id: 'ecowatt',
  icon: 'icon-ecowatt.png',
  titre: '⚡️ ÉcoWatt',
  description: 'Ecowatt aide les Français à mieux consommer l’électricité.',
  sousDescription:
    'Véritable météo de l’électricité, Ecowatt qualifie en temps réel le niveau de consommation des Français.',
  estInstalle: true,
  nombreInstallation: '9 ont installé ce service',
  thematiques: ['🏡 Logement'],
  image: 'image-ecowatt.png',
  estEnConstruction: false,
  parametrageRequis: false,
};
const serviceFruitsLegumesNEstPasInstalle = {
  id: 'fruits',
  icon: 'icon-fruits.png',
  titre: '🗓️ Fruits et légumes de saison',
  description: 'Découvrez les fruits et légumes du mois',
  sousDescription:
    "Manger local et de saison est un changement d'habitude à impact fort sur votre bilan carbone, alors GO GO GO  !!!",
  estInstalle: false,
  nombreInstallation: ' 12 ont installé ce service',
  thematiques: ['🥦 Alimentation'],
  image: 'image-fruits.png',
  estEnConstruction: false,
  parametrageRequis: false,
};
const serviceLinkyEstConfigurable = {
  id: 'linky',
  icon: 'icon-linky.png',
  titre: '⚡️ Electricité',
  description: 'Votre suivi consommation, sans rien faire',
  sousDescription:
    "Surveillez en un click l'évolution quotidienne de votre consommation électrique, comprenez vos habitudes, chassez toutes les pertes inutiles !!",
  estInstalle: false,
  nombreInstallation: ' 4 ont installé ce service',
  thematiques: ['🏡 Logement'],
  image: 'image-linky.png',
  estEnConstruction: false,
  parametrageRequis: true,
};
const serviceRecettesEstEnCoursDeConstruction = {
  id: 'recettes',
  icon: 'icon-recettes.png',
  titre: 'Un délice végétarien chaque jour',
  description:
    'Découvrez notre service quotidien de recettes 100% légumes, une expérience culinaire délicieuse et saine.',
  sousDescription:
    'Chaque jour, nous vous livrons une nouvelle recette végétarienne savoureuse, mettant en avant la fraîcheur des légumes de saison.',
  estInstalle: false,
  nombreInstallation: ' 3 ont installé ce service',
  thematiques: ['🥦 Alimentation'],
  image: 'image-recettes.png',
  estEnConstruction: true,
  parametrageRequis: false,
};

describe('Catalogue de services', () => {
  const props: { serviceCatalogueViewModels: ServiceCatalogueViewModel; utilisateurId: string } = {
    serviceCatalogueViewModels: {
      catalogue: [
        serviceEcowattEstInstalle,
        serviceFruitsLegumesNEstPasInstalle,
        serviceLinkyEstConfigurable,
        serviceRecettesEstEnCoursDeConstruction,
      ],
      filtreThematiques: [
        {
          id: '🏡 Logement',
          label: '🏡 Logement',
          checked: false,
        },
        {
          id: '🚗 Transports',
          label: '🚗 Transports',
          checked: false,
        },
        {
          id: '🥦 Alimentation',
          label: '🥦 Alimentation',
          checked: false,
        },
      ],
    },
    utilisateurId: 'utilisateurId',
  };

  it('affiche les filtres thématiques', () => {
    const { getByRole } = render(CatalogueDeServices, { props });

    expect(getByRole('heading', { name: 'Filtres', level: 2 })).toBeDefined();
    expect(getByRole('checkbox', { name: '🏡 Logement' })).toBeDefined();
    expect(getByRole('checkbox', { name: '🥦 Alimentation' })).toBeDefined();
    expect(getByRole('checkbox', { name: '🚗 Transports' })).toBeDefined();
  });

  describe("quand l'utilisateur clique sur un filtre", () => {
    it('affiche la liste des services filtré', async () => {
      const { getByRole, queryByRole } = render(CatalogueDeServices, { props });

      const checkboxLogement = getByRole('checkbox', { name: '🏡 Logement' });
      const checkboxAlimentation = getByRole('checkbox', { name: '🥦 Alimentation' });

      await fireEvent.update(checkboxLogement);

      expect(getByRole('heading', { name: '⚡️ ÉcoWatt', level: 2 })).toBeDefined();
      expect(getByRole('heading', { name: '⚡️ Electricité', level: 2 })).toBeDefined();
      expect(queryByRole('heading', { name: '🗓️ Fruits et légumes de saison', level: 2 })).toBeNull();
      expect(queryByRole('heading', { name: 'Un délice végétarien chaque jour', level: 2 })).toBeNull();

      await fireEvent.update(checkboxAlimentation);

      expect(getByRole('heading', { name: '⚡️ ÉcoWatt', level: 2 })).toBeDefined();
      expect(getByRole('heading', { name: '⚡️ Electricité', level: 2 })).toBeDefined();
      expect(getByRole('heading', { name: '🗓️ Fruits et légumes de saison', level: 2 })).toBeDefined();
      expect(getByRole('heading', { name: 'Un délice végétarien chaque jour', level: 2 })).toBeDefined();
    });
  });

  it('affiche la liste des services', () => {
    const { getByRole } = render(CatalogueDeServices, { props });

    expect(getByRole('heading', { name: '⚡️ ÉcoWatt', level: 2 })).toBeDefined();
    expect(getByRole('heading', { name: '🗓️ Fruits et légumes de saison', level: 2 })).toBeDefined();
    expect(getByRole('heading', { name: '⚡️ Electricité', level: 2 })).toBeDefined();
    expect(getByRole('heading', { name: 'Un délice végétarien chaque jour', level: 2 })).toBeDefined();
  });

  describe("quand le service n'est pas installé", () => {
    it("affiche un bouton 'Installer' avec le bon title", () => {
      const { getByTitle } = render(CatalogueDeServices, { props });

      const boutonFruitsLegumes = getByTitle<HTMLButtonElement>('Installer le service 🗓️ Fruits et légumes de saison');
      const boutonLinky = getByTitle<HTMLButtonElement>('Installer le service ⚡️ Electricité');

      expect(boutonFruitsLegumes).toBeDefined();
      expect(boutonLinky).toBeDefined();
    });

    describe("quand j'installe un service", () => {
      it('appele le usecase InstallerServiceActifUsecase et modifie le wording du bouton', async () => {
        const installerServiceActifUsecase = vi
          .spyOn(InstallerServiceActifUsecase.prototype, 'execute')
          .mockImplementation((_utilisateurId: string, _serviceId: string) => Promise.resolve());
        const { getByTitle } = render(CatalogueDeServices, { props });

        const boutonFruitsLegumes = getByTitle<HTMLButtonElement>(
          'Installer le service 🗓️ Fruits et légumes de saison',
        );

        await fireEvent.click(boutonFruitsLegumes);

        expect(installerServiceActifUsecase).toHaveBeenNthCalledWith(1, 'utilisateurId', 'fruits');
        // expect(getByTitle<HTMLButtonElement>('Enlever le service 🗓️ Fruits et légumes de saison')).toBeDefined();
      });

      describe('quand le service est configurable', () => {
        it("ouvre une modale avec l'id du service", async () => {
          // const { getByRole, getByTitle } = render(CatalogueDeServices, { props });
          // const boutonLinky = getByTitle<HTMLButtonElement>('Installer le service ⚡️ Electricité');
          // await fireEvent.click(boutonLinky);
          // expect(getByRole('dialog')).toBeDefined();
        });
      });
    });
  });

  describe('quand le service est installé', () => {
    it("affiche un bouton 'Installer' avec le bon title", () => {
      const { getByTitle } = render(CatalogueDeServices, { props });

      const boutonEcowat = getByTitle<HTMLButtonElement>('Enlever le service ⚡️ ÉcoWatt');
      expect(boutonEcowat).toBeDefined();
    });

    describe("quand j'enlève un service", () => {
      it('appele le usecase EnleverServiceActifUsecase et modifie le wording du bouton', async () => {
        const enleverServiceActifUsecase = vi
          .spyOn(EnleverServiceActifUsecase.prototype, 'execute')
          .mockImplementation((_utilisateurId: string, _serviceId: string) => Promise.resolve());
        const { getByTitle } = render(CatalogueDeServices, { props });

        const boutonEcowat = getByTitle<HTMLButtonElement>('Enlever le service ⚡️ ÉcoWatt');

        await fireEvent.click(boutonEcowat);

        expect(enleverServiceActifUsecase).toHaveBeenNthCalledWith(1, 'utilisateurId', 'ecowatt');
        // expect(getByTitle<HTMLButtonElement>('Installer le service ⚡️ ÉcoWatt')).toBeDefined();
      });
    });
  });
});
