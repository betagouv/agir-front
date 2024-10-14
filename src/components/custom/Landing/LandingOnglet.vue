<template>
  <h2 class="fr-h2 fr-mb-6w text--center"><strong class="text--italic">J’agis</strong> répond à vos inquiétudes</h2>
  <div>
    <ul class="fr-grid-row list-style-none" role="tablist" aria-label="Les questions des utilisateurs">
      <li v-for="(item, index) in items" :key="index" role="presentation" class="fr-col">
        <button
          :id="`tabpanel-landing-${index}`"
          class="fr-py-3w fr-px-5w full-width text--bleu full-height"
          :tabindex="index === ongletSlectionne ? '0' : '-1'"
          role="tab"
          :aria-selected="index === ongletSlectionne"
          :aria-controls="`tabpanel-landing-${index}-panel`"
          @click="selectionneOnglet(index)"
          @keydown="handleKeydown($event)"
        >
          <span class="personna">
            <img :src="item.imgPersonna" width="26px" height="26px" class="border-radius--full" alt="" />
            {{ item.personna }}
          </span>
          <span class="fr-text--xl fr-text--bold fr-mb-0">
            {{ item.titre }}
          </span>
        </button>
      </li>
    </ul>
    <div
      v-for="(item, index) in items"
      v-show="index === ongletSlectionne"
      :key="index"
      :id="`tabpanel-landing-${index}-panel`"
      role="tabpanel"
      :aria-labelledby="`tabpanel-landing-${index}`"
      :tabindex="index === ongletSlectionne ? '0' : '-1'"
      class="fr-p-4w"
    >
      <div class="fr-grid-row fr-grid-row--gutters align-items--center">
        <div class="fr-col-md-6">
          <img :src="item.imgPanel" alt="" class="img-object-fit-contain full-width" />
        </div>
        <div class="fr-col-md-6">
          <h3>{{ item.titre }}</h3>
          <p class="text--lh-1-8">{{ item.textePanel }}</p>
          <router-link
            :to="{ name: RouteCompteName.CREATION_COMPTE }"
            class="fr-link fr-link--lg fr-icon-arrow-right-line fr-link--icon-right"
          >
            Découvrir
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ref } from 'vue';
  import { RouteCompteName } from '@/router/compte/routeCompteName';

  const ongletSlectionne = ref<number>(0);

  const selectionneOnglet = (index: number) => (ongletSlectionne.value = index);

  const handleKeydown = event => {
    if (event.key === 'ArrowRight') ongletSlectionne.value++;
    if (event.key === 'ArrowLeft') ongletSlectionne.value--;

    const selectedButton = document.getElementById(`tabpanel-landing-${ongletSlectionne.value}`);
    if (selectedButton) selectedButton.focus();
  };

  const items = [
    {
      titre: 'Je ne sais pas par où commencer',
      personna: 'Marc, 38 ans dit...',
      imgPersonna: '/hp-onglet-user-1.webp',
      imgPanel: '/hp-onglet-panel-1.webp',
      textePanel:
        'Grâce à notre bilan environnemental personnalisé, identifiez vos premiers pas et recevez des recommandations concrètes pour débuter sereinement.',
    },
    {
      titre: 'L’écologie, ça coûte cher',
      personna: 'Leïla, 22 ans dit...',
      imgPersonna: '/hp-onglet-user-3.webp',
      imgPanel: '/hp-onglet-panel-2.webp',
      textePanel:
        'Accédez à toutes les aides financières disponibles localement et nationalement pour vous accompagner dans chaque étape.',
    },
    {
      titre: 'Où sont les sources fiables ?',
      personna: 'Richard, 63 ans dit...',
      imgPersonna: '/hp-onglet-user-2.webp',
      imgPanel: '/hp-onglet-panel-3.webp',
      textePanel:
        "Nous vous offrons des informations fiables et sourcées pour vous aider à faire un choix éclairé, basées sur des études et des partenaires experts comme l'ADEME.",
    },
  ];
</script>

<style scoped>
  .personna {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    margin-bottom: 0.5rem;
  }

  button[role='tab'] {
    text-align: left;
    opacity: 0.6;
    background-color: #e6ebf9;
  }

  button[role='tab'][aria-selected='true'] {
    opacity: 1;
    border-bottom: 3px solid var(--blue-france-sun-113-625);
  }
</style>
