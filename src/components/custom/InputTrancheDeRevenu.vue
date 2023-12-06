<template>
  <div class="fr-input-group">
    <label class="fr-label" for="text-input-rfr">
      Nombre de parts fiscales de votre foyer (Pré-calculé à partir des membres de votre foyer)
    </label>
    <input
      required
      class="fr-input fr-col-md-2 fr-col-4"
      name="revenu-fiscal"
      id="text-input-rfr"
      inputmode="numeric"
      type="number"
      v-model="nombreDeParts"
      step=".5"
      min="1"
    />
  </div>
  <BoutonRadio
    legende="Revenu fiscal de référence de votre foyer"
    legende-size="m"
    name="string"
    orientation="horizontal"
    :options="seuilRevenuFiscalDeReference"
    col="fr-col-md-4 fr-col-12"
    v-model="revenuFiscalDeReference"
    :default-value="revenuFiscalDeReference?.toString() || '0'"
  />
</template>

<script setup lang="ts">
  import { ref, watch } from 'vue';
  import BoutonRadio from '@/components/custom/BoutonRadio.vue';
  import { utilisateurStore } from '@/store/utilisateur';

  const store = utilisateurStore();
  const nombreDeParts = ref(store.utilisateur.nombreDePartsFiscales || 1);
  const revenuFiscalDeReference = ref(store.utilisateur.revenuFiscal);
  const seuilRevenuFiscalDeReference = ref(calculerSeuils(nombreDeParts.value));

  const emit = defineEmits<{
    (
      event: 'update:partEtRevenu',
      data: {
        nombreDeParts: number;
        revenuFiscalDeReference: number | null;
      }
    ): void;
  }>();

  watch(nombreDeParts, nouvelleValeur => {
    seuilRevenuFiscalDeReference.value = calculerSeuils(nouvelleValeur);
    revenuFiscalDeReference.value = 0;

    emit('update:partEtRevenu', {
      nombreDeParts: nombreDeParts.value,
      revenuFiscalDeReference: revenuFiscalDeReference.value,
    });
  });

  watch(revenuFiscalDeReference, nouvelleValeur => {
    emit('update:partEtRevenu', {
      nombreDeParts: nombreDeParts.value,
      revenuFiscalDeReference: nouvelleValeur,
    });
  });

  function calculerSeuils(nombreDeParts: number) {
    const revenuMin = Math.floor(nombreDeParts * 6358);
    const revenuMax = Math.floor(nombreDeParts * 14089);

    return [
      {
        label: `Moins de ${revenuMin} €`,
        value: '0',
      },
      {
        label: `De ${revenuMin} à ${revenuMax} €`,
        value: `${revenuMin}`,
      },
      {
        label: `Plus de ${revenuMax} €`,
        value: `${revenuMax}`,
      },
    ];
  }
</script>
