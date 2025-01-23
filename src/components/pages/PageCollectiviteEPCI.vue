<template>
  <section class="fr-container fr-my-6w">
    <div class="flex flex-column flex-center gap--small fr-mb-8w text--center width--fit-content fr-pb-16w">
      <div class="position--relative">
        <InputSearchBar
          id="champDeRecherche"
          name="champDeRecherche"
          placeholder="Commune ou collectivité"
          label="Commune ou collectivité"
          description="Saisissez la commune dont vous voulez extraire les statistiques J'agis"
          class="fr-mb-0 full-width"
          @submit="chargerCommunesEPCI"
          is-large
        />
      </div>

      <CarteSkeleton v-if="isLoading" />
      <template v-else-if="communes">
        <ul class="listeDeCommunes">
          <li v-for="commune in communes" :key="commune.codeInsee">
            <button class="fr-btn fr-btn--tertiary">{{ commune.nom }}</button>
          </li>
        </ul>
      </template>
    </div>
  </section>
</template>

<script lang="ts" setup>
  import { ref } from 'vue';
  import CarteSkeleton from '@/components/custom/Skeleton/CarteSkeleton.vue';
  import InputSearchBar from '@/components/dsfr/InputSearchBar.vue';
  import { CommuneRepositoryAxios } from '@/domaines/communes/adapters/communeRepositoryAxios';
  import { ChargementCommunesEPCIUsecase } from '@/domaines/communes/chargementCommunesEPCIUsecase';
  import { CommunesEPCI } from '@/domaines/communes/ports/communeRepository';

  const chargementCommunesEPCIUsecase = new ChargementCommunesEPCIUsecase(new CommuneRepositoryAxios());
  const isLoading = ref<boolean>(false);

  let communes = ref<CommunesEPCI>([]);

  async function chargerCommunesEPCI(nom: string) {
    if (nom.trim() === '') {
      communes.value = [];
      return;
    }

    isLoading.value = true;

    communes.value = await chargementCommunesEPCIUsecase.execute(nom).finally(() => {
      isLoading.value = false;
    });
  }
</script>

<style scoped>
  .listeDeCommunes {
    list-style-type: none;
    padding: 0;

    display: flex;
    text-align: left;
    flex-wrap: wrap;
    gap: 0.5rem;
  }

  .propositions li:first-letter {
    text-transform: capitalize;
  }

  section > div {
    justify-self: center;
    width: 50vw;
  }

  button {
    justify-content: center;
  }
</style>
