<template>
  <div class="fr-container fr-py-6w">
    <div class="fr-col-12 fr-col-lg-5 fr-mx-auto fr-mb-0 background--white fr-p-4w border border-radius--md">
      <h1 class="fr-h4">Mot de passe oublié - {{ etape }}/2</h1>
      <MotDePasseOublieFormulaire v-if="etape === Etapes.ETAPE_FORMULAIRE" @update:email="submitFormulaire" />
      <MotDePasseOublieRedefinir v-if="etape === Etapes.ETAPE_REDEFINIR" :email="email" />
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ref } from 'vue';
  import MotDePasseOublieRedefinir from '@/components/custom/MotDePasseOublie/MotDePasseOublieRedefinir.vue';
  import MotDePasseOublieFormulaire from '@/components/custom/MotDePasseOublie/MotDePasseOublieFormulaire.vue';

  enum Etapes {
    ETAPE_FORMULAIRE = 1,
    ETAPE_REDEFINIR = 2,
  }

  const etape = ref<Etapes>(Etapes.ETAPE_FORMULAIRE);
  const email = ref<string>('');

  const submitFormulaire = emailValue => {
    etape.value = Etapes.ETAPE_REDEFINIR;
    email.value = emailValue;
  };
</script>
