<template>
  <section>
    <h3 class="fr-h3">{{ titre }}</h3>

    <ul class="list-style-none fr-p-0 fr-grid-row fr-grid-row--gutters fr-mb-4w">
      <template v-for="action in actions" :key="action?.titre">
        <li class="fr-col-3" v-if="action.pourcentageReco > 0">
          <CarteActionPreview :action-preview="action" />
        </li>
      </template>
    </ul>
  </section>
</template>

<script setup lang="ts">
  import CarteActionPreview from '@/components/custom/Personnalisation/CarteActionPreview.vue';
  import { PersonnalisationDuneAction } from '@/domaines/personnalisation/ports/personnalisation.repository';

  defineProps<{
    titre: string;
    actions: PersonnalisationDuneAction[];
  }>();
</script>
