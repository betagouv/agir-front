<template>
  <div class="fr-container fr-pb-6w">
    <FilDAriane page-courante="Acheter un vélo" />
    <div class="fr-grid-row fr-grid-row--gutters">
      <div class="fr-col-lg-8">
        <div class="background--white border border-radius--md fr-p-3w fr-mb-4w">
          <h2 class="fr-h3">Quelques questions nécessaires à l’estimation des aides</h2>
          <form @submit.prevent="mettreAJourLesInfos">
            <h3 class="fr-h4">Où habitez-vous ?</h3>
            <InputCodePostal
              v-model="codePostal"
              :defaultValue="codePostal"
              :defaultSelectValue="commune"
              @update:selectedCommune="commune = $event"
            />
            <h3 class="fr-h4 fr-mt-3w">Quelle est votre tranche de revenus ?</h3>
            <InputTrancheDeRevenu @update:part-et-revenu="updatePartEtRevenu" />
            <div v-if="afficherAbonnement">
              <h3 class="fr-h4">Abonnements et cartes</h3>
              <InputCheckboxUnitaire
                id="abonnement-transport"
                label="En tant qu’habitant d’Angers Loire Métropole, êtes-vous abonnés du TER Pays de la Loire ?"
                description="Sont éligibles Tutti illimité ou combiné / Métrocéane mensuel / annuel Loire-Atlantique et Sarthe / mensuel réseaux Mayenne et Vendée (hors scolaire)"
                v-model="abonnementTransport"
              />
            </div>
            <button class="fr-mt-2w fr-btn">Valider</button>
          </form>
        </div>
      </div>
      <div class="fr-col-lg-4">
        <AidesVeloFormulaireAside />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { computed, ref } from 'vue';
  import { utilisateurStore } from '@/store/utilisateur';
  import { MettreAJourCompteUtilisateurUsecase } from '@/compte/mettreAJourCompteUtilisateur.usecase';
  import { CompteUtilisateurRepositoryImpl } from '@/compte/adapters/compteUtilisateur.repository.impl';
  import { SessionRepositoryStore } from '@/authentification/adapters/session.repository.store';
  import InputCheckboxUnitaire from '@/components/dsfr/InputCheckboxUnitaire.vue';
  import AidesVeloFormulaireAside from '@/components/custom/Aides/AidesInfosUtilisationDesDonnees.vue';
  import InputTrancheDeRevenu from '@/components/custom/InputTrancheDeRevenu.vue';
  import FilDAriane from '@/components/dsfr/FilDAriane.vue';
  import router from '@/router';
  import { CompteUtlisateurViewModel } from '@/compte/adapters/compteUtilisateur.presenter.impl';
  import InputCodePostal from '@/components/dsfr/InputCodePostal.vue';

  import { RouteAidesName } from '@/router/aides/routeAidesName';

  const store = utilisateurStore();
  const revenuFiscal = ref(store.utilisateur.revenuFiscal ? store.utilisateur.revenuFiscal : 0);
  const nombreDePartsFiscales = ref(store.utilisateur.nombreDePartsFiscales);
  const abonnementTransport = ref(store.utilisateur.abonnementTransport);
  const codePostal = ref(store.utilisateur.codePostal);
  const commune = ref(store.utilisateur.commune);
  const updatePartEtRevenu = (data: { nombreDeParts: number; revenuFiscalDeReference: number | 0 }) => {
    nombreDePartsFiscales.value = data.nombreDeParts;
    revenuFiscal.value = data.revenuFiscalDeReference;
  };

  const afficherAbonnement = computed(() => {
    return (
      codePostal.value.length === 5 &&
      (codePostal.value.startsWith('49') ||
        codePostal.value.startsWith('44') ||
        codePostal.value.startsWith('53') ||
        codePostal.value.startsWith('72') ||
        codePostal.value.startsWith('85'))
    );
  });

  async function mettreAJourLesInfos() {
    {
      const usecase = new MettreAJourCompteUtilisateurUsecase(
        new CompteUtilisateurRepositoryImpl(),
        new SessionRepositoryStore(),
      );
      const utilisateur = utilisateurStore().utilisateur;
      const donneeAMettreAjour: CompteUtlisateurViewModel = {
        nom: utilisateur.nom,
        id: utilisateur.id,
        mail: utilisateur.mail,
        commune: commune.value,
        codePostal: codePostal.value,
        prenom: utilisateur.prenom,
        abonnementTransport: abonnementTransport.value,
        revenuFiscal: revenuFiscal.value,
        nombreDePartsFiscales: nombreDePartsFiscales.value,
        fonctionnalitesDebloquees: utilisateur.fonctionnalitesDebloquees,
      };
      await usecase.execute(donneeAMettreAjour);
      await router.push({ name: RouteAidesName.VELO });
    }
  }
</script>
