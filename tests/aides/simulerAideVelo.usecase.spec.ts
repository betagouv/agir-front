import { SimulerAideVeloPresenterImpl } from '@/domaines/aides/adapters/simulerAideVelo.presenter.impl';
import SimulerAideVeloUsecase from '@/domaines/aides/simulerAideVelo.usecase';
import { SimulationAideResultatViewModel } from '@/domaines/aides/ports/simulationAideResultat';
import { SimulerAideVeloRepositoryMock } from './adapters/simulerAideVelo.repository.mock';

describe('Fichier de tests pour simuler une aide velo', () => {
  it("en donnant un code postal et un revenu fiscal de référence doit me retourner une liste d'aide", async () => {
    // GIVEN
    const simulerAideVeloRepositoryMock = new SimulerAideVeloRepositoryMock({
      'mécanique simple': [
        {
          libelle: 'Bonus vélo',
          description: 'Nouveau bonus vélo mécanique simple applicable du 15 août 2022 au 31 décembre 2023.',
          lien: 'https://www.service-public.fr/particuliers/vosdroits/F36828',
          collectivite: {
            kind: 'pays',
            value: 'France',
          },
          montant: 150,
          plafond: 150,
          logo: 'https://mesaidesvelo.fr/miniatures/logo_etat_francais.webp',
        },
        {
          libelle: 'Île-de-France Mobilités',
          description:
            'La région Île-de-France subventionne l’achat d’un vélo mécanique simple à hauteur de 50% et jusqu’à un plafond de 100 €. Les éventuelles aides locales déjà perçues sont déduites de ce montant.',
          lien: 'https://www.iledefrance-mobilites.fr/le-reseau/services-de-mobilite/velo/prime-achat-velo',
          collectivite: {
            kind: 'région',
            value: '11',
          },
          montant: 100,
          plafond: 100,
          logo: 'https://mesaidesvelo.fr/miniatures/logo_ile_de_france.webp',
        },
      ],
      électrique: [
        {
          libelle: 'Bonus vélo',
          description: 'Nouveau bonus vélo électrique applicable du 15 août 2022 au 31 décembre 2023.',
          lien: 'https://www.service-public.fr/particuliers/vosdroits/F36828',
          collectivite: {
            kind: 'pays',
            value: 'France',
          },
          montant: 400,
          plafond: 400,
          logo: 'https://mesaidesvelo.fr/miniatures/logo_etat_francais.webp',
        },
        {
          libelle: 'Prime à la conversion',
          description:
            "Pour bénéficier de cette « prime à la casse » vous devez détruire un véhicule diesel immatriculé avant janvier 2011 ou bien un véhicule essence immatriculé avant 2006.La prime est de 40% du prix du vélo dans la limite de 3 000 €. Elle est cumulable avec les aides à l'achat d’un vélo électrique, comme le « bonus écologique ».",
          lien: 'https://www.service-public.fr/particuliers/vosdroits/F36827',
          collectivite: {
            kind: 'pays',
            value: 'France',
          },
          montant: 2000,
          plafond: 2000,
          logo: 'https://mesaidesvelo.fr/miniatures/logo_etat_francais.webp',
        },
        {
          libelle: 'Île-de-France Mobilités',
          description:
            'La région Île-de-France subventionne l’achat d’un vélo électrique à hauteur de 50% et jusqu’à un plafond de 500 €. Les éventuelles aides locales déjà perçues sont déduites de ce montant.',
          lien: 'https://www.iledefrance-mobilites.fr/le-reseau/services-de-mobilite/velo/prime-achat-velo',
          collectivite: {
            kind: 'région',
            value: '11',
          },
          montant: 500,
          plafond: 500,
          logo: 'https://mesaidesvelo.fr/miniatures/logo_ile_de_france.webp',
        },
        {
          libelle: 'Ville de Paris',
          description:
            'La ville de Paris subventionne l’achat d’un vélo électrique à hauteur de 33% et jusqu’à un plafond de 400 €.',
          lien: 'https://www.paris.fr/pages/lutte-contre-la-pollution-les-aides-a-la-mobilite-5373',
          collectivite: {
            kind: 'code insee',
            value: '75056',
          },
          montant: 400,
          plafond: 400,
          logo: 'https://mesaidesvelo.fr/miniatures/logo_paris.webp',
        },
      ],
      cargo: [
        {
          libelle: 'Bonus vélo',
          description: 'Nouveau bonus vélo cargo applicable du 15 août 2022 au 31 décembre 2023.',
          lien: 'https://www.service-public.fr/particuliers/vosdroits/F36828',
          collectivite: {
            kind: 'pays',
            value: 'France',
          },
          montant: 2000,
          plafond: 2000,
          logo: 'https://mesaidesvelo.fr/miniatures/logo_etat_francais.webp',
        },
        {
          libelle: 'Île-de-France Mobilités',
          description:
            'La région Île-de-France subventionne l’achat d’un vélo cargo à hauteur de 50% et jusqu’à un plafond de 500 €. Les éventuelles aides locales déjà perçues sont déduites de ce montant.',
          lien: 'https://www.iledefrance-mobilites.fr/le-reseau/services-de-mobilite/velo/prime-achat-velo',
          collectivite: {
            kind: 'région',
            value: '11',
          },
          montant: 500,
          plafond: 500,
          logo: 'https://mesaidesvelo.fr/miniatures/logo_ile_de_france.webp',
        },
        {
          libelle: 'Ville de Paris',
          description:
            'La ville de Paris subventionne l’achat d’un vélo cargo à hauteur de 33% et jusqu’à un plafond de 600 €.',
          lien: 'https://www.paris.fr/pages/lutte-contre-la-pollution-les-aides-a-la-mobilite-5373',
          collectivite: {
            kind: 'code insee',
            value: '75056',
          },
          montant: 600,
          plafond: 600,
          logo: 'https://mesaidesvelo.fr/miniatures/logo_paris.webp',
        },
      ],
      'cargo électrique': [
        {
          libelle: 'Bonus vélo',
          description: 'Nouveau bonus vélo cargo électrique applicable du 15 août 2022 au 31 décembre 2023.',
          lien: 'https://www.service-public.fr/particuliers/vosdroits/F36828',
          collectivite: {
            kind: 'pays',
            value: 'France',
          },
          montant: 2000,
          plafond: 2000,
          logo: 'https://mesaidesvelo.fr/miniatures/logo_etat_francais.webp',
        },
        {
          libelle: 'Prime à la conversion',
          description:
            "Pour bénéficier de cette « prime à la casse » vous devez détruire un véhicule diesel immatriculé avant janvier 2011 ou bien un véhicule essence immatriculé avant 2006.La prime est de 40% du prix du vélo dans la limite de 3 000 €. Elle est cumulable avec les aides à l'achat d’un vélo électrique, comme le « bonus écologique ».",
          lien: 'https://www.service-public.fr/particuliers/vosdroits/F36827',
          collectivite: {
            kind: 'pays',
            value: 'France',
          },
          montant: 2000,
          plafond: 2000,
          logo: 'https://mesaidesvelo.fr/miniatures/logo_etat_francais.webp',
        },
        {
          libelle: 'Île-de-France Mobilités',
          description:
            'La région Île-de-France subventionne l’achat d’un vélo cargo électrique à hauteur de 50% et jusqu’à un plafond de 600 €. Les éventuelles aides locales déjà perçues sont déduites de ce montant.',
          lien: 'https://www.iledefrance-mobilites.fr/le-reseau/services-de-mobilite/velo/prime-achat-velo',
          collectivite: {
            kind: 'région',
            value: '11',
          },
          montant: 600,
          plafond: 600,
          logo: 'https://mesaidesvelo.fr/miniatures/logo_ile_de_france.webp',
        },
        {
          libelle: 'Ville de Paris',
          description:
            'La ville de Paris subventionne l’achat d’un vélo cargo électrique à hauteur de 33% et jusqu’à un plafond de 600 €.',
          lien: 'https://www.paris.fr/pages/lutte-contre-la-pollution-les-aides-a-la-mobilite-5373',
          collectivite: {
            kind: 'code insee',
            value: '75056',
          },
          montant: 600,
          plafond: 600,
          logo: 'https://mesaidesvelo.fr/miniatures/logo_paris.webp',
        },
      ],
      pliant: [
        {
          libelle: 'Bonus vélo',
          description: 'Nouveau bonus vélo pliant applicable du 15 août 2022 au 31 décembre 2023.',
          lien: 'https://www.service-public.fr/particuliers/vosdroits/F36828',
          collectivite: {
            kind: 'pays',
            value: 'France',
          },
          montant: 2000,
          plafond: 2000,
          logo: 'https://mesaidesvelo.fr/miniatures/logo_etat_francais.webp',
        },
        {
          libelle: 'Île-de-France Mobilités',
          description:
            'La région Île-de-France subventionne l’achat d’un vélo pliant à hauteur de 50% et jusqu’à un plafond de 500 €. Les éventuelles aides locales déjà perçues sont déduites de ce montant.',
          lien: 'https://www.iledefrance-mobilites.fr/le-reseau/services-de-mobilite/velo/prime-achat-velo',
          collectivite: {
            kind: 'région',
            value: '11',
          },
          montant: 500,
          plafond: 500,
          logo: 'https://mesaidesvelo.fr/miniatures/logo_ile_de_france.webp',
        },
      ],
      'pliant électrique': [
        {
          libelle: 'Bonus vélo',
          description: 'Nouveau bonus vélo pliant applicable du 15 août 2022 au 31 décembre 2023.',
          lien: 'https://www.service-public.fr/particuliers/vosdroits/F36828',
          collectivite: {
            kind: 'pays',
            value: 'France',
          },
          montant: 2000,
          plafond: 2000,
          logo: 'https://mesaidesvelo.fr/miniatures/logo_etat_francais.webp',
        },
        {
          libelle: 'Île-de-France Mobilités',
          description:
            'La région Île-de-France subventionne l’achat d’un vélo pliant à hauteur de 50% et jusqu’à un plafond de 500 €. Les éventuelles aides locales déjà perçues sont déduites de ce montant.',
          lien: 'https://www.iledefrance-mobilites.fr/le-reseau/services-de-mobilite/velo/prime-achat-velo',
          collectivite: {
            kind: 'région',
            value: '11',
          },
          montant: 550,
          plafond: 550,
          logo: 'https://mesaidesvelo.fr/miniatures/logo_ile_de_france.webp',
        },
      ],
      motorisation: [
        {
          libelle: 'Île-de-France Mobilités',
          description:
            'La région Île-de-France subventionne l’achat d’un kit de motorisation à hauteur de 50% et jusqu’à un plafond de 200 €. Les éventuelles aides locales déjà perçues sont déduites de ce montant.',
          lien: 'https://www.iledefrance-mobilites.fr/le-reseau/services-de-mobilite/velo/prime-achat-velo',
          collectivite: {
            kind: 'région',
            value: '11',
          },
          montant: 200,
          plafond: 200,
          logo: 'https://mesaidesvelo.fr/miniatures/logo_ile_de_france.webp',
        },
        {
          libelle: 'Ville de Paris',
          description:
            'La ville de Paris subventionne l’achat d’un kit de motorisation à hauteur de 33% et jusqu’à un plafond de 400 €.',
          lien: 'https://www.paris.fr/pages/lutte-contre-la-pollution-les-aides-a-la-mobilite-5373',
          collectivite: {
            kind: 'code insee',
            value: '75056',
          },
          montant: 400,
          plafond: 400,
          logo: 'https://mesaidesvelo.fr/miniatures/logo_paris.webp',
        },
      ],
      adapté: [
        {
          libelle: 'Île-de-France Mobilités',
          description:
            'La région Île-de-France subventionne l’achat d’un kit de motorisation à hauteur de 50% et jusqu’à un plafond de 200 €. Les éventuelles aides locales déjà perçues sont déduites de ce montant.',
          lien: 'https://www.iledefrance-mobilites.fr/le-reseau/services-de-mobilite/velo/prime-achat-velo',
          collectivite: {
            kind: 'région',
            value: '11',
          },
          montant: 200,
          plafond: 200,
          logo: 'https://mesaidesvelo.fr/miniatures/logo_ile_de_france.webp',
        },
        {
          libelle: 'Ville de Paris',
          description:
            'La ville de Paris subventionne l’achat d’un kit de motorisation à hauteur de 33% et jusqu’à un plafond de 400 €.',
          lien: 'https://www.paris.fr/pages/lutte-contre-la-pollution-les-aides-a-la-mobilite-5373',
          collectivite: {
            kind: 'code insee',
            value: '75056',
          },
          montant: 400,
          plafond: 400,
          logo: 'https://mesaidesvelo.fr/miniatures/logo_paris.webp',
        },
      ],
    });

    // WHEN
    const useCase = new SimulerAideVeloUsecase(simulerAideVeloRepositoryMock);
    await useCase.execute(999.9, 'neuf', 'utilisateurId', new SimulerAideVeloPresenterImpl(expectation));

    // THEN
    function expectation(simulationAidesVeloViewModel: SimulationAideResultatViewModel) {
      expect(simulationAidesVeloViewModel).toStrictEqual({
        resultats: [
          {
            aides: [
              {
                description: 'Nouveau bonus vélo mécanique simple applicable du 15 août 2022 au 31 décembre 2023.',
                libelle: 'Bonus vélo',
                lien: 'https://www.service-public.fr/particuliers/vosdroits/F36828',
                logo: 'https://mesaidesvelo.fr/miniatures/logo_etat_francais.webp',
                montant: 150,
              },
              {
                description:
                  'La région Île-de-France subventionne l’achat d’un vélo mécanique simple à hauteur de 50% et jusqu’à un plafond de 100 €. Les éventuelles aides locales déjà perçues sont déduites de ce montant.',
                libelle: 'Île-de-France Mobilités',
                lien: 'https://www.iledefrance-mobilites.fr/le-reseau/services-de-mobilite/velo/prime-achat-velo',
                logo: 'https://mesaidesvelo.fr/miniatures/logo_ile_de_france.webp',
                montant: 100,
              },
            ],
            montantTotal: 250,
            titre: 'Acheter un vélo mécanique simple',
          },
          {
            aides: [
              {
                description: 'Nouveau bonus vélo électrique applicable du 15 août 2022 au 31 décembre 2023.',
                libelle: 'Bonus vélo',
                lien: 'https://www.service-public.fr/particuliers/vosdroits/F36828',
                logo: 'https://mesaidesvelo.fr/miniatures/logo_etat_francais.webp',
                montant: 400,
              },
              {
                description:
                  "Pour bénéficier de cette « prime à la casse » vous devez détruire un véhicule diesel immatriculé avant janvier 2011 ou bien un véhicule essence immatriculé avant 2006.La prime est de 40% du prix du vélo dans la limite de 3 000 €. Elle est cumulable avec les aides à l'achat d’un vélo électrique, comme le « bonus écologique ».",
                libelle: 'Prime à la conversion',
                lien: 'https://www.service-public.fr/particuliers/vosdroits/F36827',
                logo: 'https://mesaidesvelo.fr/miniatures/logo_etat_francais.webp',
                montant: 2000,
              },
              {
                description:
                  'La région Île-de-France subventionne l’achat d’un vélo électrique à hauteur de 50% et jusqu’à un plafond de 500 €. Les éventuelles aides locales déjà perçues sont déduites de ce montant.',
                libelle: 'Île-de-France Mobilités',
                lien: 'https://www.iledefrance-mobilites.fr/le-reseau/services-de-mobilite/velo/prime-achat-velo',
                logo: 'https://mesaidesvelo.fr/miniatures/logo_ile_de_france.webp',
                montant: 500,
              },
              {
                description:
                  'La ville de Paris subventionne l’achat d’un vélo électrique à hauteur de 33% et jusqu’à un plafond de 400 €.',
                libelle: 'Ville de Paris',
                lien: 'https://www.paris.fr/pages/lutte-contre-la-pollution-les-aides-a-la-mobilite-5373',
                logo: 'https://mesaidesvelo.fr/miniatures/logo_paris.webp',
                montant: 400,
              },
            ],
            montantTotal: 3300,
            titre: 'Acheter un vélo électrique',
          },
          {
            aides: [
              {
                description: 'Nouveau bonus vélo cargo applicable du 15 août 2022 au 31 décembre 2023.',
                libelle: 'Bonus vélo',
                lien: 'https://www.service-public.fr/particuliers/vosdroits/F36828',
                logo: 'https://mesaidesvelo.fr/miniatures/logo_etat_francais.webp',
                montant: 2000,
              },
              {
                description:
                  'La région Île-de-France subventionne l’achat d’un vélo cargo à hauteur de 50% et jusqu’à un plafond de 500 €. Les éventuelles aides locales déjà perçues sont déduites de ce montant.',
                libelle: 'Île-de-France Mobilités',
                lien: 'https://www.iledefrance-mobilites.fr/le-reseau/services-de-mobilite/velo/prime-achat-velo',
                logo: 'https://mesaidesvelo.fr/miniatures/logo_ile_de_france.webp',
                montant: 500,
              },
              {
                description:
                  'La ville de Paris subventionne l’achat d’un vélo cargo à hauteur de 33% et jusqu’à un plafond de 600 €.',
                libelle: 'Ville de Paris',
                lien: 'https://www.paris.fr/pages/lutte-contre-la-pollution-les-aides-a-la-mobilite-5373',
                logo: 'https://mesaidesvelo.fr/miniatures/logo_paris.webp',
                montant: 600,
              },
            ],
            montantTotal: 3100,
            titre: 'Acheter un vélo cargo',
          },
          {
            aides: [
              {
                description: 'Nouveau bonus vélo cargo électrique applicable du 15 août 2022 au 31 décembre 2023.',
                libelle: 'Bonus vélo',
                lien: 'https://www.service-public.fr/particuliers/vosdroits/F36828',
                logo: 'https://mesaidesvelo.fr/miniatures/logo_etat_francais.webp',
                montant: 2000,
              },
              {
                description:
                  "Pour bénéficier de cette « prime à la casse » vous devez détruire un véhicule diesel immatriculé avant janvier 2011 ou bien un véhicule essence immatriculé avant 2006.La prime est de 40% du prix du vélo dans la limite de 3 000 €. Elle est cumulable avec les aides à l'achat d’un vélo électrique, comme le « bonus écologique ».",
                libelle: 'Prime à la conversion',
                lien: 'https://www.service-public.fr/particuliers/vosdroits/F36827',
                logo: 'https://mesaidesvelo.fr/miniatures/logo_etat_francais.webp',
                montant: 2000,
              },
              {
                description:
                  'La région Île-de-France subventionne l’achat d’un vélo cargo électrique à hauteur de 50% et jusqu’à un plafond de 600 €. Les éventuelles aides locales déjà perçues sont déduites de ce montant.',
                libelle: 'Île-de-France Mobilités',
                lien: 'https://www.iledefrance-mobilites.fr/le-reseau/services-de-mobilite/velo/prime-achat-velo',
                logo: 'https://mesaidesvelo.fr/miniatures/logo_ile_de_france.webp',
                montant: 600,
              },
              {
                description:
                  'La ville de Paris subventionne l’achat d’un vélo cargo électrique à hauteur de 33% et jusqu’à un plafond de 600 €.',
                libelle: 'Ville de Paris',
                lien: 'https://www.paris.fr/pages/lutte-contre-la-pollution-les-aides-a-la-mobilite-5373',
                logo: 'https://mesaidesvelo.fr/miniatures/logo_paris.webp',
                montant: 600,
              },
            ],
            montantTotal: 5200,
            titre: 'Acheter un vélo cargo électrique',
          },
          {
            aides: [
              {
                description: 'Nouveau bonus vélo pliant applicable du 15 août 2022 au 31 décembre 2023.',
                libelle: 'Bonus vélo',
                lien: 'https://www.service-public.fr/particuliers/vosdroits/F36828',
                logo: 'https://mesaidesvelo.fr/miniatures/logo_etat_francais.webp',
                montant: 2000,
              },
              {
                description:
                  'La région Île-de-France subventionne l’achat d’un vélo pliant à hauteur de 50% et jusqu’à un plafond de 500 €. Les éventuelles aides locales déjà perçues sont déduites de ce montant.',
                libelle: 'Île-de-France Mobilités',
                lien: 'https://www.iledefrance-mobilites.fr/le-reseau/services-de-mobilite/velo/prime-achat-velo',
                logo: 'https://mesaidesvelo.fr/miniatures/logo_ile_de_france.webp',
                montant: 500,
              },
            ],
            montantTotal: 2500,
            titre: 'Acheter un vélo pliant',
          },
          {
            aides: [
              {
                libelle: 'Bonus vélo',
                description: 'Nouveau bonus vélo pliant applicable du 15 août 2022 au 31 décembre 2023.',
                lien: 'https://www.service-public.fr/particuliers/vosdroits/F36828',
                montant: 2000,
                logo: 'https://mesaidesvelo.fr/miniatures/logo_etat_francais.webp',
              },
              {
                libelle: 'Île-de-France Mobilités',
                description:
                  'La région Île-de-France subventionne l’achat d’un vélo pliant à hauteur de 50% et jusqu’à un plafond de 500 €. Les éventuelles aides locales déjà perçues sont déduites de ce montant.',
                lien: 'https://www.iledefrance-mobilites.fr/le-reseau/services-de-mobilite/velo/prime-achat-velo',
                montant: 550,
                logo: 'https://mesaidesvelo.fr/miniatures/logo_ile_de_france.webp',
              },
            ],
            montantTotal: 2550,
            titre: 'Acheter un vélo pliant électrique',
          },
          {
            aides: [
              {
                description:
                  'La région Île-de-France subventionne l’achat d’un kit de motorisation à hauteur de 50% et jusqu’à un plafond de 200 €. Les éventuelles aides locales déjà perçues sont déduites de ce montant.',
                libelle: 'Île-de-France Mobilités',
                lien: 'https://www.iledefrance-mobilites.fr/le-reseau/services-de-mobilite/velo/prime-achat-velo',
                logo: 'https://mesaidesvelo.fr/miniatures/logo_ile_de_france.webp',
                montant: 200,
              },
              {
                description:
                  'La ville de Paris subventionne l’achat d’un kit de motorisation à hauteur de 33% et jusqu’à un plafond de 400 €.',
                libelle: 'Ville de Paris',
                lien: 'https://www.paris.fr/pages/lutte-contre-la-pollution-les-aides-a-la-mobilite-5373',
                logo: 'https://mesaidesvelo.fr/miniatures/logo_paris.webp',
                montant: 400,
              },
            ],
            montantTotal: 600,
            titre: 'Transformer un vélo classique en vélo électrique',
          },
          {
            aides: [
              {
                description:
                  'La région Île-de-France subventionne l’achat d’un kit de motorisation à hauteur de 50% et jusqu’à un plafond de 200 €. Les éventuelles aides locales déjà perçues sont déduites de ce montant.',
                libelle: 'Île-de-France Mobilités',
                lien: 'https://www.iledefrance-mobilites.fr/le-reseau/services-de-mobilite/velo/prime-achat-velo',
                logo: 'https://mesaidesvelo.fr/miniatures/logo_ile_de_france.webp',
                montant: 200,
              },
              {
                description:
                  'La ville de Paris subventionne l’achat d’un kit de motorisation à hauteur de 33% et jusqu’à un plafond de 400 €.',
                libelle: 'Ville de Paris',
                lien: 'https://www.paris.fr/pages/lutte-contre-la-pollution-les-aides-a-la-mobilite-5373',
                logo: 'https://mesaidesvelo.fr/miniatures/logo_paris.webp',
                montant: 400,
              },
            ],
            montantTotal: 600,
            titre: 'Acheter un vélo adapté (PMR)',
          },
        ],
        aucunResultat: false,
      });
    }
  });

  describe("Quand aucune aide n'est disponible", () => {
    it('renvoie aucunResultat', async () => {
      // GIVEN
      const simulerAideVeloRepositoryMock = new SimulerAideVeloRepositoryMock({
        'mécanique simple': [],
        électrique: [],
        cargo: [],
        'cargo électrique': [],
        pliant: [],
        'pliant électrique': [],
        motorisation: [],
        adapté: [],
      });

      // WHEN
      const useCase = new SimulerAideVeloUsecase(simulerAideVeloRepositoryMock);
      await useCase.execute(999.9, 'occasion', 'utilisateurId', new SimulerAideVeloPresenterImpl(expectation));

      // THEN
      function expectation(simulationAidesVeloViewModel: SimulationAideResultatViewModel) {
        expect(simulationAidesVeloViewModel).toStrictEqual({
          resultats: [
            {
              aides: [],
              montantTotal: 0,
              titre: 'Acheter un vélo mécanique simple',
            },
            {
              aides: [],
              montantTotal: 0,
              titre: 'Acheter un vélo électrique',
            },
            {
              aides: [],
              montantTotal: 0,
              titre: 'Acheter un vélo cargo',
            },
            {
              aides: [],
              montantTotal: 0,
              titre: 'Acheter un vélo cargo électrique',
            },
            {
              aides: [],
              montantTotal: 0,
              titre: 'Acheter un vélo pliant',
            },
            {
              aides: [],
              montantTotal: 0,
              titre: 'Acheter un vélo pliant électrique',
            },
            {
              aides: [],
              montantTotal: 0,
              titre: 'Transformer un vélo classique en vélo électrique',
            },
            {
              aides: [],
              montantTotal: 0,
              titre: 'Acheter un vélo adapté (PMR)',
            },
          ],
          aucunResultat: true,
        });
      }
    });
  });
});
