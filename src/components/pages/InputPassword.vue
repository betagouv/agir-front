<template>
  <div class="fr-password" id="password-1138">
    <label class="fr-label" for="password-1138-input"> Mot de passe </label>
    <div class="fr-input-wrap">
      <input
        class="fr-password__input fr-input"
        aria-describedby="password-1138-input-messages"
        aria-required="true"
        name="password"
        autocomplete="new-password"
        id="password-1138-input"
        type="password"
        :value="modelValue"
        @input="updateValue"
      />
    </div>
    <div class="fr-messages-group" id="password-1138-input-messages" aria-live="assertive">
      <p class="fr-message" id="password-1138-input-message">Votre mot de passe doit contenir :</p>
      <p
        :class="auMoinsDouzeCaracteres(modelValue) ? 'fr-message--valid' : 'fr-message--error'"
        class="fr-message"
        id="password-1138-input-message-info"
      >
        12 caractères minimum
      </p>
      <p
        :class="auMoinsUnCaractereSpecial(modelValue) ? 'fr-message--valid' : 'fr-message--error'"
        class="fr-message"
        id="password-1138-input-message-info-1"
      >
        1 caractère spécial minimum
      </p>
      <p
        :class="auMoinsUnChiffre(modelValue) ? 'fr-message--valid' : 'fr-message--error'"
        class="fr-message"
        id="password-1138-input-message-info-2"
      >
        1 chiffre minimum
      </p>
    </div>
    <div class="fr-password__checkbox fr-checkbox-group fr-checkbox-group--sm">
      <input
        aria-label="Afficher le mot de passe"
        id="password-1138-show"
        type="checkbox"
        aria-describedby="password-1138-show-messages"
      />
      <label class="fr-password__checkbox fr-label" for="password-1138-show"> Afficher </label>
      <div class="fr-messages-group" id="password-1138-show-messages" aria-live="assertive"></div>
    </div>
  </div>
</template>
<script setup lang="ts">
  defineProps<{
    modelValue: string;
  }>();

  const emit = defineEmits<{
    (e: 'update:modelValue', value: string): void;
    (e: 'update:motDePasseValide', value: boolean): void;
  }>();

  const updateValue = (event: Event) => {
    const inputElement = event.target as HTMLInputElement;

    emit('update:modelValue', inputElement.value);
    emit('update:motDePasseValide', verifierMotDePasseValide(inputElement.value.toString()));
  };

  function auMoinsUnCaractereSpecial(password: string | null): boolean {
    const regexp = new RegExp(/([(&~»#)‘\-_`{[|`_\\^@)\]=}+%*$£¨!§/:;.?¿'"!,§éèêëàâä»])+/, 'g');
    return password ? regexp.test(password) : false;
  }

  function auMoinsDouzeCaracteres(password: string | null): boolean {
    const regexp = new RegExp(/(?=.{12,}$)/, 'g');
    return password ? regexp.test(password) : false;
  }

  function auMoinsUnChiffre(password: string | null): boolean {
    const regexp = new RegExp(/([0-9])+/, 'g');
    return password ? regexp.test(password) : false;
  }

  function verifierMotDePasseValide(motDePasse: string) {
    return auMoinsUnCaractereSpecial(motDePasse) && auMoinsDouzeCaracteres(motDePasse) && auMoinsUnChiffre(motDePasse);
  }
</script>
