<template>
  <h1 class="fr-h2">Mes aides disponibles</h1>
  <div class="fr-grid-row fr-grid-row--gutters">
    <div class="fr-col-12 fr-col-lg-3">
      <h2 class="fr-h4">Filtres</h2>
      <InputCheckbox id="categoriesAides" :options="optionsCheckbox" label="Catégories" @update="handleValueChange" />
    </div>
    <div class="fr-col-12 fr-col-lg-9">
      <div v-for="(aides, index) in props.aidesGroupesParCategorie" :key="index">
        <div v-if="categoriesActives.length === 0 || categoriesActives.includes(`${index}`)">
          <h2 class="fr-h4">{{ index }}</h2>
          <div v-for="aide in aides" :id="`aide_${aide.id}`" :key="aide.id" class="fr-mb-2w">
            <Accordeon :label="aide.titre" :name-id="aide.id" @click="trackAideClick(aide)">
              <template v-slot:titre>
                <div class="fr-col-12 fr-pr-2w">
                  <div class="flex flex-space-between align-items--center">
                    <ThematiqueTag :tag="aide.thematiqueTag" aria-hidden="true" />
                    <img
                      v-if="aide.partenaire"
                      :alt="aide.partenaire.accessibilite"
                      :src="aide.partenaire.logoUrl"
                      height="50"
                    />
                  </div>
                  <span class="aide__titre fr-mt-2w">
                    <span class="fr-h4 text--gris">
                      {{ aide.titre }}
                    </span>
                    <span v-if="aide.isSimulateur || aide.montantMaximum" class="fr-grid-row">
                      <span
                        v-if="aide.isSimulateur"
                        class="fr-tag background-bleu-light fr-mr-1w fr-icon-money-euro-circle-line fr-tag--icon-left nowrap"
                      >
                        <span class="fr-sr-only">: </span>
                        Simulateur
                      </span>
                      <span v-if="aide.montantMaximum" class="fr-tag nowrap">
                        <span class="fr-sr-only">, </span>
                        {{ aide.montantMaximum }}
                      </span>
                    </span>
                  </span>
                </div>
              </template>
              <template v-slot:contenu>
                <div class="cms__content" v-html="aide.contenu" />
                <div class="flex align-items--center gap--small">
                  <a
                    v-if="aide.urlCommencerVotreDemarche"
                    :href="aide.urlCommencerVotreDemarche"
                    class="fr-btn"
                    rel="noopener external"
                    target="_blank"
                  >
                    Commencer votre démarche
                  </a>
                  <router-link
                    v-if="aide.isSimulateur"
                    :to="{ path: aide.url }"
                    class="fr-btn fr-btn--icon-left fr-icon-arrow-right-line"
                  >
                    Estimer le montant des aides
                  </router-link>
                </div>
              </template>
            </Accordeon>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { onMounted, ref } from 'vue';
  import { useRoute } from 'vue-router';
  import Accordeon from '@/components/custom/Aides/AccordeonAides.vue';
  import ThematiqueTag from '@/components/custom/Thematiques/ThematiqueTag.vue';
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
  .aide__titre {
    display: flex;
    padding-right: 1rem;
    justify-content: space-between;
    align-items: center;
    width: 100%;
  }
</style>
