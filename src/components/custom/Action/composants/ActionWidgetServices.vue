<template>
  <div v-if="services.length > 0" class="fr-mt-2w fr-mb-4w">
    <div v-for="service in services" :key="service.type" class="fr-mx-0 fr-mx-md-2w">
      <WidgetServiceRecettes
        v-if="service.type === 'recettes'"
        :nombre-de-cartes-par-ligne="3"
        :parametre-de-recherche="service.parametreDuService"
      >
        <template #titre>
          <h2 class="fr-h3 fr-mb-0">Besoin <span class="text--bold">d'inspiration</span> ?</h2>
        </template>
      </WidgetServiceRecettes>

      <section v-if="service.type === 'longue_vie_objets'" class="fr-mt-4w">
        <WidgetServiceLongueVieAuxObjets
          :commune="commune"
          :parametre-de-recherche="service.parametreDuService.categorie"
        />
      </section>

      <section v-if="service.type === 'proximite'" class="fr-mt-4w">
        <WidgetServicePresDeChezNous
          :commune="commune"
          :nombre-de-cartes-par-ligne="2"
          :parametre-de-recherche="service.parametreDuService"
        />
      </section>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import WidgetServiceLongueVieAuxObjets from '@/components/pages/PagesService/components/WidgetServiceLongueVieAuxObjets.vue';
  import WidgetServicePresDeChezNous from '@/components/pages/PagesService/components/WidgetServicePresDeChezNous.vue';
  import WidgetServiceRecettes from '@/components/pages/PagesService/components/WidgetServiceRecettes.vue';
  import { ActionClassiqueViewModel } from '@/domaines/actions/ports/action.presenter';

  defineProps<{ services: ActionClassiqueViewModel['services']; commune: string }>();
</script>
