<template>
  <section class="fr-mt-2w fr-mb-4w fr-mx-3w">
    <div v-for="service in services" :key="service.type">
      <WidgetServiceRecettes v-if="service.type === 'recettes'" :parametre-de-recherche="service.parametreDuService" />

      <WidgetServiceLongueVieAuxObjets
        v-if="service.type === 'longue_vie_objets'"
        :parametre-de-recherche="service.parametreDuService"
        :commune="commune"
      />
    </div>
  </section>
</template>

<script setup lang="ts">
  import WidgetServiceLongueVieAuxObjets from '@/components/pages/PagesService/components/WidgetServiceLongueVieAuxObjets.vue';
  import WidgetServiceRecettes from '@/components/pages/PagesService/components/WidgetServiceRecettes.vue';
  import { ActionClassiqueViewModel } from '@/domaines/actions/ports/action.presenter';

  defineProps<{ services: ActionClassiqueViewModel['services']; commune: string }>();
</script>
