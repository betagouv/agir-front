<template>
  <FilDAriane page-courante="Mes aides" :page-hierarchie="[{ label: 'Coach', url: 'coach' }]" />
  <h1 class="fr-h2">Aides financières disponibles</h1>
  <div class="fr-grid-row fr-grid-row--gutters">
    <div class="fr-col-12 fr-col-lg-3">
      <h2 class="fr-h4">Filtres</h2>
      <InputCheckbox
        id="categoriesAides"
        label="Catégories affichées"
        :options="optionsCheckbox"
        @update="handleValueChange"
      />
    </div>
    <div class="fr-col-12 fr-col-lg-9">
      <div v-for="(aides, index) in props.aidesGroupesParCategorie" :key="index">
        <div v-if="categoriesActives.includes(`${index}`)">
          <h2 class="fr-h4">{{ index }}</h2>
          <div class="background--white fr-mb-2w border-x" v-for="aide in aides" :key="aide.id">
            <Accordeon :label="aide.titre" :name-id="aide.id">
              <template v-slot:titre>
                <span class="fr-col-12 fr-pr-2w">
                  <span class="aide__categorie text--gris">{{ aide.categorie }}</span>
                  <span class="aide__titre">
                    <span class="fr-h4 text--gris">
                      {{ aide.titre }}
                    </span>
                    <span class="fr-h6 text--gris">Jusqu'à 1700euros</span>
                    <p v-show="aide.isSimulateur" class="fr-tag fr-icon-money-euro-circle-line fr-tag--icon-left">
                      Simulateur disponible
                    </p>
                  </span>
                </span>
              </template>
              <template v-slot:contenu>
                <div v-html="aide.contenu" />
                <router-link
                  v-if="aide.isSimulateur"
                  :to="{ path: aide.url }"
                  class="fr-btn fr-btn--icon-left fr-icon-arrow-right-line"
                >
                  Estimer le montant des aides
                </router-link>
              </template>
            </Accordeon>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ref } from 'vue';
  import FilDAriane from '@/components/dsfr/FilDAriane.vue';
  import Accordeon from './dsfr/Accordeon.vue';
  import { AidesViewModel } from '@/aides/ports/chargementAides.presenter';
  import InputCheckbox from './dsfr/InputCheckbox.vue';

  const props = defineProps<{
    aidesGroupesParCategorie: AidesViewModel;
  }>();

  const optionsCheckbox = Object.keys(props.aidesGroupesParCategorie).map(option => ({
    id: option,
    label: option,
    checked: true,
  }));

  const categoriesActives = ref<string[]>([]);
  categoriesActives.value = optionsCheckbox.filter(({ checked }) => checked).map(({ id }) => id);

  const handleValueChange = value => {
    categoriesActives.value = value;
  };
</script>

<style scoped>
  .aide__categorie {
    display: block;
    font-size: 12px;
    font-weight: 700;
  }

  .aide__titre {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
  }
</style>
