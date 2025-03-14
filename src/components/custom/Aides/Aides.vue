<template>
  <h1 class="fr-h2">Mes aides disponibles</h1>
  <p class="fr-mb-4w">
    D'après la situation que vous avez décrite, vous êtes a priori éligible à ces aides.<br />Nous vous invitons à vous
    rapprocher des organismes cités afin d'otenir plus d'informations.
  </p>
  <div class="fr-grid-row fr-grid-row--gutters">
    <div class="fr-col-12 fr-col-lg-3">
      <h2 class="fr-h4">Filtres</h2>
      <InputCheckbox id="categoriesAides" :options="optionsCheckbox" label="Catégories" @update="handleValueChange" />
    </div>
    <div class="fr-col-12 fr-col-lg-9">
      <div v-for="(aides, index) in props.aidesGroupesParCategorie" :key="index">
        <div v-if="categoriesActives.length === 0 || categoriesActives.includes(`${index}`)">
          <h2 class="fr-h4">{{ index }}</h2>
          <GrilleAidesDUneAction :aides="aides" />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { onMounted, ref } from 'vue';
  import { useRoute } from 'vue-router';
  import GrilleAidesDUneAction from '@/components/custom/Aides/GrilleAidesDUneAction.vue';
  import InputCheckbox from '@/components/dsfr/InputCheckbox.vue';
  import { AidesViewModel } from '@/domaines/aides/ports/chargementAides.presenter';

  const route = useRoute();

  const props = defineProps<{
    aidesGroupesParCategorie: AidesViewModel;
  }>();

  const optionsCheckbox = Object.keys(props.aidesGroupesParCategorie).map(option => ({
    id: option,
    label: option,
    checked: false,
  }));

  const categoriesActives = ref<string[]>([]);
  categoriesActives.value = optionsCheckbox.filter(({ checked }) => checked).map(({ id }) => id);

  const handleValueChange = value => {
    categoriesActives.value = value;
  };

  onMounted(() => {
    const hash = route.hash;

    if (hash) {
      const id = hash.substring(1);
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
        setTimeout(() => {
          document.getElementById(`button-${hash.split('_')[1]}`)?.click();
        }, 100);
      }
    }
  });
</script>

<style scoped>
  .aide__titre {
    display: flex;
    padding-right: 1rem;
    justify-content: space-between;
    align-items: center;
    width: 100%;
  }
</style>
