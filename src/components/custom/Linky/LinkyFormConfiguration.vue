<template>
  <form @submit.prevent="parametrerLeService()">
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
      class="fr-mb-2w"
      id="cgu"
      v-model="acceptationCGU"
      label="Je déclare sur l'honneur être titulaire du point ou être mandaté par celui-ci et j'accepte que le service 'Agir' ait accès à mes données des 2 ans passés et pour les 3 ans à venir. Je peux changer d'avis à tout moment sur mon compte Enedis."
    />
    <button type="submit" class="fr-btn" :disabled="!acceptationCGU || parametreDuService.length != 14">Valider</button>
  </form>
</template>

<script setup lang="ts">
  import { ref } from 'vue';
  import Alert from '@/components/custom/Alert.vue';
  import InputCheckboxUnitaire from '@/components/dsfr/InputCheckboxUnitaire.vue';
  import InputText from '@/components/dsfr/InputText.vue';
  import { useAlerte } from '@/composables/useAlerte';
  import { ServiceRepositoryAxios } from '@/domaines/services/adapters/service.repository.axios';
  import { LinkyEventBusImpl } from '@/domaines/services/linkyEventBusImpl';
  import { ParametrerServiceUsecase } from '@/domaines/services/parametrerService.usecase';
  import { utilisateurStore } from '@/store/utilisateur';

  defineProps<{ prm: string }>();

  const { id: utilisateurId } = utilisateurStore().utilisateur;
  const acceptationCGU = ref<boolean>(false);
  const parametreDuService = defineModel<string>('prm', { default: '' });
  const { alerte, afficherAlerte } = useAlerte();

  const parametrerLeService = async () => {
    const parametrerService = new ParametrerServiceUsecase(
      new ServiceRepositoryAxios(),
      LinkyEventBusImpl.getInstance(),
    );

    parametrerService
      .execute(utilisateurId, 'linky', { prm: parametreDuService.value })
      .then()
      .catch(error => afficherAlerte('error', 'Erreur', error.data.message || 'Erreur inattendue'));
  };
</script>
