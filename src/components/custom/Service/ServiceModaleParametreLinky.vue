<template>
  <h1 :id="serviceId" class="fr-h4 fr-modal__title">Configurer le service “Votre conso élec au jour le jour”</h1>
  <form @submit.prevent="parametrerLeService(serviceId)">
    <InputText
      name="prm"
      v-model="parametreDuService"
      label="Numéro de PRM"
      description="Il s’agit d’une suite de 14 chiffres qui identifie le logement sur le réseau électrique."
    />
    <p class="fr-mb-0 fr-text--bold">
      <span class="fr-icon-question-line fr-text--bold" aria-hidden="true"></span>
      Comment trouver ce numéro ?
    </p>
    <ul class="fr-pl-7v">
      <li>Sur votre facture</li>
      <li>
        Sur votre compteur Linky<br />
        Faire défiler les affichages du compteur (appui sur la touche +) jusqu’à lire la valeur du « numéro de PRM ».
      </li>
    </ul>
    <InputCheckboxUnitaire
      class="fr-pl-1v"
      id="cgu"
      v-model="acceptationCGU"
      description="Les données récupérées ne seront pas conservées"
      label="J’autorise le service “Agir !” à récupérer les données me concernant auprès du GRD ENEDIS (consommation annuelle sur 36 mois maximum, puissance souscrite, Numéro PRM)"
    />
    <div class="fr-grid-row fr-grid-row--right fr-pt-6w fr-pb-4w">
      <button class="fr-btn fr-btn--secondary" :aria-controls="serviceId">Annuler</button>
      <button type="submit" class="fr-btn fr-ml-2w" :disabled="!acceptationCGU || parametreDuService.length != 14">
        Valider
      </button>
    </div>
  </form>
</template>

<script setup lang="ts">
  import { ref } from 'vue';
  import InputText from '@/components/dsfr/InputText.vue';
  import InputCheckboxUnitaire from '@/components/dsfr/InputCheckboxUnitaire.vue';
  import { utilisateurStore } from '@/store/utilisateur';
  import { ParametrerServiceUsecase } from '@/services/parametrerService.usecase';
  import { ServiceRepositoryAxios } from '@/services/adapters/service.repository.axios';
  import ModaleActions from '@/components/custom/Modale/ModaleActions';

  defineProps<{ serviceId: string }>();

  const acceptationCGU = ref<boolean>(false);
  const parametreDuService = ref<string>('');

  const parametrerLeService = (serviceId: string) => {
    const parametrerService = new ParametrerServiceUsecase(new ServiceRepositoryAxios());
    parametrerService.execute(utilisateurStore().utilisateur.id, serviceId, [parametreDuService.value]).then(() => {
      new ModaleActions(serviceId).close();
    });
  };
</script>
