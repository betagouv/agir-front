<template>
  <div>
    <h1>Mes aides - Retrofit</h1>

    <form>
      <div class="form-container">
        <label class="fr-label" for="text-input-code-postal">Votre code postal</label>
        <input class="fr-input" type="text" id="text-input-code-postal" name="text-input-text" />

        <label class="fr--label" for="text-input-rfr">Revenu fiscal de référence</label>
        <input class="fr-input" type="text" id="text-input-rfr" name="text-input-text" />
      </div>
      <button id="button-8202" class="fr-mt-2v fr-btn">Valider</button>
    </form>
  </div>
</template>

<script>
import { ref } from "vue";

export default {
  setup() {
    const codePostal = ref("");
    const revenuFiscal = ref(null);

    const submitForm = () => {
      console.log("Code Postal:", codePostal.value);
      console.log("Revenu Fiscal de Référence:", revenuFiscal.value);
    };

    return {
      codePostal,
      revenuFiscal,
      submitForm,
    };
  },
};
</script>

<style scoped>
.form-container {
  text-align: left;
}
</style>
