import { describe, expect, it } from 'vitest';
import { EtatPrm } from '@/domaines/simulationWattWatchers/recupererEtatPrm.usecase';
import {
  EtapeSimulateur,
  recupererEtapeSimulateurEtMessage,
} from '@/domaines/simulationWattWatchers/utils/recupererEtapeSimulateurEtMessage';

describe('CalculerResultatSimulationWinterUsecase', () => {
  describe('Recuperer correctement les étapes du simulateur selon son avancement', () => {
    it("Quand l'utilisateur n'a pas commencé la simulation, il est redirigé vers l'introduction", () => {
      const etatPrm: EtatPrm = {
        estPrmObsolete: false,
        estPrmPresent: false,
      };
      const aDejaEteSimule = false;

      const etape = recupererEtapeSimulateurEtMessage(etatPrm, aDejaEteSimule);
      expect(etape).toStrictEqual({ etape: EtapeSimulateur.INTRODUCTION });
    });

    describe("Quand l'utilisateur s'inscrit avec son PRM", () => {
      it("Et qu'il n'a pas réalisé le simulateur", () => {
        const etatPrm: EtatPrm = {
          estPrmObsolete: false,
          estPrmPresent: true,
        };
        const aDejaEteSimule = false;

        const etape = recupererEtapeSimulateurEtMessage(etatPrm, aDejaEteSimule);
        expect(etape).toStrictEqual({ etape: EtapeSimulateur.SIMULATEUR });
      });

      it("Et qu'il n'a pas réalisé le simulateur, puis son prm est devenu obsolète", () => {
        const etatPrm: EtatPrm = {
          estPrmObsolete: true,
          estPrmPresent: true,
        };
        const aDejaEteSimule = false;

        const etape = recupererEtapeSimulateurEtMessage(etatPrm, aDejaEteSimule);
        expect(etape).toStrictEqual({
          etape: EtapeSimulateur.RENSEIGNEMENT,
          message:
            "Suite à la modification de l'adresse de votre résidence principale, nous vous invitons à reprendre votre parcours et à vérifier vos réponses aux questions.",
        });
      });

      it("Et qu'il a réalisé le simulateur, puis son prm est devenu obsolète", () => {
        const etatPrm: EtatPrm = {
          estPrmObsolete: true,
          estPrmPresent: true,
        };
        const aDejaEteSimule = true;

        const etape = recupererEtapeSimulateurEtMessage(etatPrm, aDejaEteSimule);
        expect(etape).toStrictEqual({
          etape: EtapeSimulateur.RENSEIGNEMENT,
          message:
            "Suite à la modification de l'adresse de votre résidence principale, nous vous invitons à reprendre votre parcours et à vérifier vos réponses aux questions.",
        });
      });

      it("Et qu'il a réalisé le simulateur, avec le prm à jour", () => {
        const etatPrm: EtatPrm = {
          estPrmObsolete: false,
          estPrmPresent: true,
        };
        const aDejaEteSimule = true;

        const etape = recupererEtapeSimulateurEtMessage(etatPrm, aDejaEteSimule);
        expect(etape).toStrictEqual({ etape: EtapeSimulateur.RESULTAT });
      });
    });
  });
});
