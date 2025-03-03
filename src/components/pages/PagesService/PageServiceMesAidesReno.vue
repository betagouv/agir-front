<template>
  <div class="fr-container">
    <!--    <div v-if="isLoading">Chargement en cours ...</div>-->
    <!--    <p v-else-if="!serviceLinkyViewModel">Problème de chargement de données</p>-->
    <!--    <div v-else>-->
    <FilDAriane
      page-courante="Service : Mes aides reno"
      :page-hierarchie="
        useRoute().params.thematiqueId
          ? [
              {
                label: `${MenuThematiques.getFromUrl(useRoute().params.thematiqueId as string).labelDansLeMenu}`,
                url: `/thematique/${useRoute().params.thematiqueId}`,
              },
            ]
          : []
      "
    />
    <h1 class="fr-h2">
      Estimer mes <span class="text--bleu">aides à la renovation</span> à l'aide de
      <a href="https://mesaidesreno.beta.gouv.fr/" target="_blank" rel="noreferrer">Mes Aides Reno</a>
    </h1>

    <p>
      Une rénovation énergétique pour des factures moins élevées dans un logement plus confortable et plus écologique.
    </p>

    <MesAidesRenoIframe />
    <!--      <PageServiceTemplate :aside="serviceLinkyViewModel.aside"> </PageServiceTemplate>-->
    <!--    </div>-->
  </div>
</template>

<script setup lang="ts">
  import { onMounted, onUnmounted, ref } from 'vue';
  import { useRoute } from 'vue-router';
  import MesAidesRenoIframe from '@/components/custom/MesAidesReno/MesAidesRenoIframe.vue';
  import FilDAriane from '@/components/dsfr/FilDAriane.vue';
  import { MenuThematiques } from '@/domaines/thematiques/MenuThematiques';
  // import { utilisateurStore } from '@/store/utilisateur';

  // const { id: utilisateurId } = utilisateurStore().utilisateur;
  const isLoading = ref<boolean>(true);

  onMounted(async () => {
    isLoading.value = false;
  });

  onUnmounted(() => {});
</script>
