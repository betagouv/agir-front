<template>
  <section class="fr-mt-2w fr-mb-4w fr-mx-3w">
    <div v-for="service in services" :key="service.type">
      <WidgetServiceRecettes v-if="service.type === 'recettes'" :parametre-de-recherche="service.parametreDuService">
        <template #titre>
          <h2>Besoin <span class="text--bold">d'inspiration</span> ?</h2>
        </template>
      </WidgetServiceRecettes>

      <section v-if="service.type === 'longue_vie_objets'" class="fr-mt-4w">
        <WidgetServiceLongueVieAuxObjets :commune="commune" :parametre-de-recherche="service.parametreDuService" />
      </section>
    </div>
  </section>
</template>

<script lang="ts" setup>
  import WidgetServiceLongueVieAuxObjets from '@/components/pages/PagesService/components/WidgetServiceLongueVieAuxObjets.vue';
  import WidgetServiceRecettes from '@/components/pages/PagesService/components/WidgetServiceRecettes.vue';
  import { ActionClassiqueViewModel } from '@/domaines/actions/ports/action.presenter';

  defineProps<{ services: ActionClassiqueViewModel['services']; commune: string }>();
</script>
