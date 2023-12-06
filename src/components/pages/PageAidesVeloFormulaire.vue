<template>
  <div class="fr-container fr-pb-6w">
    <FilDAriane page-courante="Acheter un vélo" :page-hierarchie="[{ label: 'Vos aides', url: 'vos-aides' }]" />
    <div class="fr-grid-row fr-grid-row--gutters">
      <div class="fr-col-lg-8">
        <div class="background--white border border-radius--md fr-p-3w fr-mb-4w">
          <h2 class="fr-h3">Quelques questions nécessaires à l’estimation des aides</h2>
          <form @submit.prevent="mettreAJourLesInfos">
            <h3 class="fr-h4">Quelle est votre tranche de revenus ?</h3>
            <InputTrancheDeRevenu @update:part-et-revenu="updatePartEtRevenu" />
            <h3 class="fr-h4">Abonnements et cartes</h3>
            <InputCheckboxUnitaire
              id="abonnement-transport"
              label="En tant qu’habitant d’Angers Loire Métropole, êtes-vous abonnés du TER Pays de la Loire ?"
              description="Sont éligibles Tutti illimité ou combiné / Métrocéane mensuel / annuel Loire-Atlantique et Sarthe / mensuel réseaux Mayenne et Vendée (hors scolaire)"
              v-model="abonnementTransport"
            />
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
  import { ref } from 'vue';
  import { utilisateurStore } from '@/store/utilisateur';
  import { MettreAJourCompteUtilisateurUsecase } from '@/compte/mettreAJourCompteUtilisateur.usecase';
  import { CompteUtilisateurRepositoryImpl } from '@/compte/adapters/compteUtilisateur.repository.impl';
  import { SessionRepositoryStore } from '@/authentification/adapters/session.repository.store';
  import InputCheckboxUnitaire from '@/components/dsfr/InputCheckboxUnitaire.vue';
  import AidesVeloFormulaireAside from '@/components/custom/Aides/AidesVeloFormulaireAside.vue';
  import InputTrancheDeRevenu from '@/components/custom/InputTrancheDeRevenu.vue';
  import FilDAriane from '@/components/dsfr/FilDAriane.vue';
  import router from '@/router';
  import { CompteUtlisateurViewModel } from '@/compte/adapters/compteUtilisateur.presenter.impl';

  const store = utilisateurStore();
  const revenuFiscal = ref(store.utilisateur.revenuFiscal ? store.utilisateur.revenuFiscal : 0);
  const nombreDePartsFiscales = ref(store.utilisateur.nombreDePartsFiscales);
  const abonnementTransport = ref(false);
  const updatePartEtRevenu = (data: { nombreDeParts: number; revenuFiscalDeReference: number | 0 }) => {
    nombreDePartsFiscales.value = data.nombreDeParts;
    revenuFiscal.value = data.revenuFiscalDeReference;
  };

  async function mettreAJourLesInfos() {
    {
      const usecase = new MettreAJourCompteUtilisateurUsecase(
        new CompteUtilisateurRepositoryImpl(),
        new SessionRepositoryStore()
      );
      const utilisateur = utilisateurStore().utilisateur;
      const donneeAMettreAjour: CompteUtlisateurViewModel = {
        nom: utilisateur.nom,
        id: utilisateur.id,
        mail: utilisateur.mail,
        commune: utilisateur.commune,
        codePostal: utilisateur.codePostal,
        prenom: utilisateur.prenom,
        abonnementTransport: abonnementTransport.value,
        revenuFiscal: revenuFiscal.value,
        nombreDePartsFiscales: nombreDePartsFiscales.value,
      };
      await usecase.execute(donneeAMettreAjour);
      await router.push({ name: 'mes-aides-velo' });
    }
  }
</script>
