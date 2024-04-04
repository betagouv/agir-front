<template>
  <h1 :id="serviceId" class="fr-h4 fr-modal__title">Configurer le service “Votre conso élec au jour le jour”</h1>
  <div class="fr-grid-row fr-grid-row--gutters">
    <div class="fr-col-md-7 fr-col-12">
      <h2 class="fr-h6 fr-mb-0">Pour quoi faire ?</h2>
      <ul>
        <li>Suivre sa consommation électrique au quotidien</li>
        <li>Détecter des anomalies</li>
        <li>Réduire sa facture énergétique</li>
      </ul>
    </div>
    <div class="fr-col-md-5 fr-col-12">
      <img src="/graphique-linky-exemple.png" class="max-full-width" alt="" />
    </div>
  </div>
  <h2 class="fr-h6 fr-mb-0">Quelles données sont utilisées ?</h2>
  <p class="fr-mb-0">
    L’historique de votre consommation d’électricité quotidienne (en KWh) sur les 2 dernières années (36 mois maximum),
    fourni par Enedis (gestionnaire du réseau électrique français)
  </p>
  <p class="fr-text--bold">
    Important : vos données sont protégées, elles ne sont en aucun partagées avec des services tiers
  </p>
  <p class="fr-text--bold">
    <span class="fr-icon-question-line fr-text--bold" aria-hidden="true"></span>
    Comment trouver ce numéro ?
  </p>
  <div class="fr-grid-row fr-grid-row--gutters fr-mb-2w">
    <img src="/facture-linky-exemple.png" class="fr-col-md-3 max-full-width" alt="" />
    <p class="fr-col-md-3 fr-mb-0 fr-text--sm">Sur votre facture</p>
    <img src="/compteur-linky-exemple.jpg" class="fr-col-md-3 max-full-width" alt="" />
    <p class="fr-col-md-3 fr-mb-0 fr-text--sm">
      Sur votre compteur Linky<br />
      Faire défiler les affichages du compteur (appui sur la touche +) jusqu’à lire la valeur du « numéro de PRM ».
    </p>
  </div>
  <form @submit.prevent="parametrerLeService(serviceId)">
    <InputText
      name="prm"
      v-model="parametreDuService"
      label="Numéro de PRM"
      description="Il s’agit d’une suite de 14 chiffres qui identifie le logement sur le réseau électrique."
    />
    <Alert
      v-if="alerte.isActive"
      class="fr-col-12 fr-my-2w"
      :type="alerte.type"
      :titre="alerte.titre"
      :message="alerte.message"
    />
    <InputCheckboxUnitaire
      class="fr-pl-1v"
      id="cgu"
      v-model="acceptationCGU"
      label="Je déclare sur l'honneur être titulaire du point ou être mandaté par celui-ci et j'accepte que le service 'Agir' ait accès à mes données des 2 ans passés et pour les 3 ans à venir. Je peux changer d'avis à tout moment sur mon compte Enedis."
    />
    <div class="fr-grid-row fr-grid-row--right fr-pt-6w fr-pb-4w">
      <button class="fr-btn fr-btn--secondary" type="button" :aria-controls="serviceId">Annuler</button>
      <button type="submit" class="fr-btn fr-ml-2w" :disabled="!acceptationCGU || parametreDuService.length != 14">
        Valider
      </button>
    </div>
  </form>
</template>

<script setup lang="ts">
  import { ref, defineModel } from 'vue';
  import InputText from '@/components/dsfr/InputText.vue';
  import InputCheckboxUnitaire from '@/components/dsfr/InputCheckboxUnitaire.vue';
  import { utilisateurStore } from '@/store/utilisateur';
  import { ParametrerServiceUsecase } from '@/services/parametrerService.usecase';
  import { ServiceRepositoryAxios } from '@/services/adapters/service.repository.axios';
  import ModaleActions from '@/components/custom/Modale/ModaleActions';
  import Alert from '@/components/custom/Alert.vue';
  import { useAlerte } from '@/composables/useAlerte';
  import { ServiceEvent, ServiceEventBusImpl } from '@/services/serviceEventBusImpl';

  defineProps<{ serviceId: string; prm: string }>();

  const acceptationCGU = ref<boolean>(false);
  const parametreDuService = defineModel<string>('prm', { default: '' });

  const { alerte, afficherAlerte } = useAlerte();

  const parametrerLeService = async (serviceId: string) => {
    const parametrerService = new ParametrerServiceUsecase(new ServiceRepositoryAxios());

    parametrerService
      .execute(utilisateurStore().utilisateur.id, serviceId, { prm: parametreDuService.value })
      .then(() => {
        new ModaleActions('linkyModale').close();
        ServiceEventBusImpl.getInstance().publish(ServiceEvent.SERVICE_INSTALLE); // todo : à sortir dans le usecase
      })
      .catch(error => afficherAlerte('error', 'Erreur', error.data.message));
  };
</script>
