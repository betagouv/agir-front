<template>
  <div class="fr-container fr-pb-6w">
    <FilDAriane page-courante="Prime au retrofit" :page-hierarchie="[{ label: 'Vos aides', url: 'vos-aides' }]" />
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
  import { CompteUtlisateurViewModel } from '@/compte/adapters/compteUtilisateur.presenter.impl';
  import FilDAriane from '@/components/dsfr/FilDAriane.vue';
  import InputCodePostal from '@/components/dsfr/InputCodePostal.vue';
  import InputTrancheDeRevenu from '@/components/custom/InputTrancheDeRevenu.vue';
  import router from '@/router';
  import AidesVeloFormulaireAside from '@/components/custom/Aides/AidesInfosUtilisationDesDonnees.vue';

  const store = utilisateurStore();
  const revenuFiscal = ref(store.utilisateur.revenuFiscal ? store.utilisateur.revenuFiscal : 0);
  const nombreDePartsFiscales = ref(store.utilisateur.nombreDePartsFiscales);
  const codePostal = ref(store.utilisateur.codePostal);
  const commune = ref(store.utilisateur.commune);
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
        commune: commune.value,
        codePostal: codePostal.value,
        prenom: utilisateur.prenom,
        abonnementTransport: utilisateur.abonnementTransport,
        revenuFiscal: revenuFiscal.value,
        nombreDePartsFiscales: nombreDePartsFiscales.value,
        fonctionnalitesDebloquees: utilisateur.fonctionnalitesDebloquees,
      };
      await usecase.execute(donneeAMettreAjour);
      await router.push({ name: 'vos-aides-retrofit' });
    }
  }
</script>
