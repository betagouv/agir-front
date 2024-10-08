<template>
  <h1 class="fr-h2">Mes aides disponibles</h1>
  <div class="fr-grid-row fr-grid-row--gutters">
    <div class="fr-col-12 fr-col-lg-3">
      <h2 class="fr-h4">Filtres</h2>
      <InputCheckbox id="categoriesAides" label="Catégories" :options="optionsCheckbox" @update="handleValueChange" />
    </div>
    <div class="fr-col-12 fr-col-lg-9">
      <div v-for="(aides, index) in props.aidesGroupesParCategorie" :key="index">
        <div v-if="categoriesActives.length === 0 || categoriesActives.includes(`${index}`)">
          <h2 class="fr-h4">{{ index }}</h2>
          <div class="fr-mb-2w" v-for="aide in aides" :key="aide.id" :id="`aide_${aide.id}`">
            <Accordeon :label="aide.titre" :name-id="aide.id" @click="trackAideClick(aide)">
              <template v-slot:titre>
                <span class="fr-col-12 fr-pr-2w">
                  <span class="aide__categorie text--gris">{{ aide.categorie }}</span>
                  <span class="aide__titre">
                    <span class="fr-h4 text--gris">
                      {{ aide.titre }}
                    </span>
                    <div v-if="aide.isSimulateur || aide.montantMaximum" class="fr-grid-row">
                      <span
                        v-if="aide.isSimulateur"
                        class="fr-tag background-bleu-light fr-mr-1w fr-icon-money-euro-circle-line fr-tag--icon-left"
                      >
                        Simulateur
                      </span>
                      <span v-if="aide.montantMaximum" class="fr-tag">{{ aide.montantMaximum }}</span>
                    </div>
                  </span>
                </span>
              </template>
              <template v-slot:contenu>
                <div class="cms__content" v-html="aide.contenu" />
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
  import { onMounted, ref } from 'vue';
  import { useRoute } from 'vue-router';
  import Accordeon from '@/components/custom/Aides/AccordeonAides.vue';
  import InputCheckbox from '@/components/dsfr/InputCheckbox.vue';
  import { AidesViewModel } from '@/domaines/aides/ports/chargementAides.presenter';
  import { trackClick } from '@/shell/matomo';

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

  const trackAideClick = aide => {
    trackClick('Aides', aide.titre);
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
  .aide__categorie {
    display: block;
    font-size: 12px;
    font-weight: 700;
  }

  .aide__titre {
    display: flex;
    padding-right: 1rem;
    justify-content: space-between;
    align-items: center;
    width: 100%;
  }
</style>
