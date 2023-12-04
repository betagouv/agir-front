import { SimulerAideVeloRepository } from '@/aides/ports/simulerAideVelo.repository';
import { SimulerAideVeloPresenterImpl } from '@/aides/adapters/simulerAideVelo.presenter.impl';
import SimulerAideVeloUsecase, { SimulationVelo } from '@/aides/simulerAideVelo.usecase';
import { SimulationAideResultatViewModel } from '@/aides/ports/simulationAideResultat';

class SimulerAideVeloRepositoryForTest implements SimulerAideVeloRepository {
  getSimulation(prixDuVelo: number, utilisateurId: string): Promise<SimulationVelo> {
    return Promise.resolve({
      'mécanique simple': [
        {
          libelle: 'Bonus vélo',
          description: 'Nouveau bonus vélo mécanique simple applicable du 15 août 2022 au 31 décembre 2023.\n',
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
            'La région Île-de-France subventionne l’achat d’un vélo mécanique simple à hauteur de 50% et\njusqu’à un plafond de 100 €. Les éventuelles aides locales déjà perçues\nsont déduites de ce montant.\n',
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
          description: 'Nouveau bonus vélo électrique applicable du 15 août 2022 au 31 décembre 2023.\n',
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
            "Pour bénéficier de cette « prime à la casse » vous devez détruire un\nvéhicule diesel immatriculé avant janvier 2011 ou bien un véhicule essence\nimmatriculé avant 2006.\n\nLa prime est de 40% du prix du vélo dans la limite de 3 000 €. Elle est\ncumulable avec les aides à l'achat d’un vélo électrique, comme le « bonus\nécologique ».\n",
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
            'La région Île-de-France subventionne l’achat d’un vélo électrique à hauteur de 50% et\njusqu’à un plafond de 500 €. Les éventuelles aides locales déjà perçues\nsont déduites de ce montant.\n',
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
            'La ville de Paris subventionne l’achat d’un vélo électrique à hauteur de 33% et\njusqu’à un plafond de 400 €.\n',
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
          description: 'Nouveau bonus vélo cargo applicable du 15 août 2022 au 31 décembre 2023.\n',
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
            'La région Île-de-France subventionne l’achat d’un vélo cargo à hauteur de 50% et\njusqu’à un plafond de 500 €. Les éventuelles aides locales déjà perçues\nsont déduites de ce montant.\n',
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
            'La ville de Paris subventionne l’achat d’un vélo cargo à hauteur de 33% et\njusqu’à un plafond de 600 €.\n',
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
          description: 'Nouveau bonus vélo cargo électrique applicable du 15 août 2022 au 31 décembre 2023.\n',
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
            "Pour bénéficier de cette « prime à la casse » vous devez détruire un\nvéhicule diesel immatriculé avant janvier 2011 ou bien un véhicule essence\nimmatriculé avant 2006.\n\nLa prime est de 40% du prix du vélo dans la limite de 3 000 €. Elle est\ncumulable avec les aides à l'achat d’un vélo électrique, comme le « bonus\nécologique ».\n",
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
            'La région Île-de-France subventionne l’achat d’un vélo cargo électrique à hauteur de 50% et\njusqu’à un plafond de 600 €. Les éventuelles aides locales déjà perçues\nsont déduites de ce montant.\n',
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
            'La ville de Paris subventionne l’achat d’un vélo cargo électrique à hauteur de 33% et\njusqu’à un plafond de 600 €.\n',
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
          description: 'Nouveau bonus vélo pliant applicable du 15 août 2022 au 31 décembre 2023.\n',
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
            'La région Île-de-France subventionne l’achat d’un vélo pliant à hauteur de 50% et\njusqu’à un plafond de 500 €. Les éventuelles aides locales déjà perçues\nsont déduites de ce montant.\n',
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
      motorisation: [
        {
          libelle: 'Île-de-France Mobilités',
          description:
            'La région Île-de-France subventionne l’achat d’un kit de motorisation à hauteur de 50% et\njusqu’à un plafond de 200 €. Les éventuelles aides locales déjà perçues\nsont déduites de ce montant.\n',
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
            'La ville de Paris subventionne l’achat d’un kit de motorisation à hauteur de 33% et\njusqu’à un plafond de 400 €.\n',
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
  }
}

describe('Fichier de tests pour simuler une aide velo', () => {
  it("En donnant un code postal et un revenu fiscal de référence doit me retourner une liste d'aide", async () => {
    // GIVEN
    // WHEN
    const useCase = new SimulerAideVeloUsecase(new SimulerAideVeloRepositoryForTest());
    await useCase.execute(999.9, 'utilisateurId', new SimulerAideVeloPresenterImpl(expectation));

    // THEN
    function expectation(simulationAidesVeloViewModel: SimulationAideResultatViewModel) {
      expect(simulationAidesVeloViewModel).toStrictEqual({
        'mécanique simple': [
          {
            libelle: 'Bonus vélo',
            description: 'Nouveau bonus vélo mécanique simple applicable du 15 août 2022 au 31 décembre 2023.\n',
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
              'La région Île-de-France subventionne l’achat d’un vélo mécanique simple à hauteur de 50% et\njusqu’à un plafond de 100 €. Les éventuelles aides locales déjà perçues\nsont déduites de ce montant.\n',
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
            description: 'Nouveau bonus vélo électrique applicable du 15 août 2022 au 31 décembre 2023.\n',
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
              "Pour bénéficier de cette « prime à la casse » vous devez détruire un\nvéhicule diesel immatriculé avant janvier 2011 ou bien un véhicule essence\nimmatriculé avant 2006.\n\nLa prime est de 40% du prix du vélo dans la limite de 3 000 €. Elle est\ncumulable avec les aides à l'achat d’un vélo électrique, comme le « bonus\nécologique ».\n",
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
              'La région Île-de-France subventionne l’achat d’un vélo électrique à hauteur de 50% et\njusqu’à un plafond de 500 €. Les éventuelles aides locales déjà perçues\nsont déduites de ce montant.\n',
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
              'La ville de Paris subventionne l’achat d’un vélo électrique à hauteur de 33% et\njusqu’à un plafond de 400 €.\n',
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
            description: 'Nouveau bonus vélo cargo applicable du 15 août 2022 au 31 décembre 2023.\n',
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
              'La région Île-de-France subventionne l’achat d’un vélo cargo à hauteur de 50% et\njusqu’à un plafond de 500 €. Les éventuelles aides locales déjà perçues\nsont déduites de ce montant.\n',
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
              'La ville de Paris subventionne l’achat d’un vélo cargo à hauteur de 33% et\njusqu’à un plafond de 600 €.\n',
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
            description: 'Nouveau bonus vélo cargo électrique applicable du 15 août 2022 au 31 décembre 2023.\n',
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
              "Pour bénéficier de cette « prime à la casse » vous devez détruire un\nvéhicule diesel immatriculé avant janvier 2011 ou bien un véhicule essence\nimmatriculé avant 2006.\n\nLa prime est de 40% du prix du vélo dans la limite de 3 000 €. Elle est\ncumulable avec les aides à l'achat d’un vélo électrique, comme le « bonus\nécologique ».\n",
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
              'La région Île-de-France subventionne l’achat d’un vélo cargo électrique à hauteur de 50% et\njusqu’à un plafond de 600 €. Les éventuelles aides locales déjà perçues\nsont déduites de ce montant.\n',
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
              'La ville de Paris subventionne l’achat d’un vélo cargo électrique à hauteur de 33% et\njusqu’à un plafond de 600 €.\n',
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
            description: 'Nouveau bonus vélo pliant applicable du 15 août 2022 au 31 décembre 2023.\n',
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
              'La région Île-de-France subventionne l’achat d’un vélo pliant à hauteur de 50% et\njusqu’à un plafond de 500 €. Les éventuelles aides locales déjà perçues\nsont déduites de ce montant.\n',
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
        motorisation: [
          {
            libelle: 'Île-de-France Mobilités',
            description:
              'La région Île-de-France subventionne l’achat d’un kit de motorisation à hauteur de 50% et\njusqu’à un plafond de 200 €. Les éventuelles aides locales déjà perçues\nsont déduites de ce montant.\n',
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
              'La ville de Paris subventionne l’achat d’un kit de motorisation à hauteur de 33% et\njusqu’à un plafond de 400 €.\n',
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
    }
  });
});
