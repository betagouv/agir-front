<template>
  <DisclaimerGeneral
    v-if="utilisateurStore().utilisateur.afficherDisclaimerAides"
    titre="Votre ville n’est pas encore couverte par le service Agir."
    description="Nous mettons les informations à jour progressivement. N'hésitez pas à nous en partager à <a href=mailto:contact@agir.beta.gouv.fr>contact@agir.beta.gouv.fr</a> !"
    :onClick="
      () => {
        utilisateurStore().utilisateur.afficherDisclaimerAides = false;
      }
    "
  />
  <div class="fr-container fr-pb-3w">
    <FilDAriane page-courante="Vos aides" />
    <div v-if="isLoading">Chargement ...</div>
    <div v-else-if="!aides">Une erreur est survenue</div>
    <Aides v-else :aidesGroupesParCategorie="aides" />
  </div>
</template>

<script setup lang="ts">
  import { onMounted, ref } from 'vue';
  import Aides from '@/components/custom/Aides/Aides.vue';
  import DisclaimerGeneral from '@/components/dsfr/DisclaimerGeneral.vue';
  import FilDAriane from '@/components/dsfr/FilDAriane.vue';
  import { ChargementAidesPresenterImpl } from '@/domaines/aides/adapters/chargementAides.presenter.impl';
  import { chargementAidesAxiosRepository } from '@/domaines/aides/adapters/chargementAidesAxiosRepository';
  import ChargementAidesUsecase from '@/domaines/aides/chargementAides.usecase';
  import { AidesViewModel } from '@/domaines/aides/ports/chargementAides.presenter';
  import { PublierEvenemntRepositoryAxios } from '@/shell/adapters/publierEvenemnt.repository.axios';
  import { utilisateurStore } from '@/store/utilisateur';

  const aides = ref<AidesViewModel>();
  const isLoading = ref<boolean>(true);

  onMounted(async () => {
    const { id: utilisateurId } = utilisateurStore().utilisateur;
    const usecase = new ChargementAidesUsecase(new chargementAidesAxiosRepository());
    await usecase.execute(
      utilisateurId,
      new ChargementAidesPresenterImpl(aidesViewModel => (aides.value = aidesViewModel)),
    );
    isLoading.value = false;
  });
</script>
