<template>
  <div class="fr-container fr-pb-3w">
    <FilDAriane page-courante="Mes aides" />
    <p v-if="isLoading">Chargement ...</p>
    <p v-else-if="!aides">Une erreur est survenue</p>
    <template v-else>
      <div v-if="!aides.utilisateurEstCouvert" class="fr-alert fr-alert--info fr-mb-4w">
        <h3 class="fr-alert__title">Plus de 1000 aides sont listées dans J'agis</h3>
        <p>
          Une erreur ou une aide manquante&nbsp;? N'hésitez pas à nous écrire à
          <a href="mailto:contact@jagis.beta.gouv.fr">contact@jagis.beta.gouv.fr</a>&nbsp;!
        </p>
      </div>
      <Aides :aidesGroupesParCategorie="aides.aides" />
    </template>
  </div>
</template>

<script lang="ts" setup>
  import '@gouvfr/dsfr/dist/component/alert/alert.min.css';
  import { onMounted, ref } from 'vue';
  import Aides from '@/components/custom/Aides/Aides.vue';
  import FilDAriane from '@/components/dsfr/FilDAriane.vue';
  import { ChargementAidesAxiosRepository } from '@/domaines/aides/adapters/chargementAides.axios.repository';
  import { ChargementAidesPresenterImpl } from '@/domaines/aides/adapters/chargementAides.presenter.impl';
  import ChargementAidesUsecase from '@/domaines/aides/chargementAides.usecase';
  import { AidesAvecCouvertureViewModel } from '@/domaines/aides/ports/chargementAides.presenter';
  import { utilisateurStore } from '@/store/utilisateur';

  const aides = ref<AidesAvecCouvertureViewModel>();
  const isLoading = ref<boolean>(true);

  onMounted(async () => {
    const { id: utilisateurId } = utilisateurStore().utilisateur;
    const usecase = new ChargementAidesUsecase(new ChargementAidesAxiosRepository());
    await usecase.execute(
      utilisateurId,
      new ChargementAidesPresenterImpl(aidesViewModel => (aides.value = aidesViewModel)),
    );
    isLoading.value = false;
  });
</script>
