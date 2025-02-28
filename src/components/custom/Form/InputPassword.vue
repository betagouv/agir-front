<template>
  <div class="fr-password">
    <label class="fr-label" for="password"> Mot de passe </label>
    <div class="fr-input-wrap">
      <input
        class="fr-password__input fr-input"
        aria-describedby="password-input-messages"
        aria-required="true"
        name="password"
        autocomplete="new-password"
        id="password"
        type="password"
        :required="required"
        :value="modelValue"
        @input="updateValue"
      />
    </div>
    <div class="fr-messages-group" id="password-input-messages" aria-live="assertive">
      <p class="fr-message" id="password-input-message">{{ legende }}</p>
      <p
        :class="auMoinsDouzeCaracteres(modelValue) ? 'fr-message--valid' : 'fr-message--info'"
        class="fr-message"
        id="password-input-message-info"
      >
        <span class="fr-sr-only">
          {{ auMoinsDouzeCaracteres(modelValue) ? 'critère valide :' : 'critère non valide :' }}
        </span>
        12 caractères minimum
      </p>
      <p
        :class="auMoinsUneMajusculeEtUneMinuscule(modelValue) ? 'fr-message--valid' : 'fr-message--info'"
        class="fr-message"
        id="password-input-message-info-1"
      >
        <span class="fr-sr-only">
          {{ auMoinsUneMajusculeEtUneMinuscule(modelValue) ? 'critère valide :' : 'critère non valide :' }}
        </span>
        Au moins 1 majuscule et 1 minuscule
      </p>
      <p
        :class="auMoinsUnCaractereSpecial(modelValue) ? 'fr-message--valid' : 'fr-message--info'"
        class="fr-message"
        id="password-input-message-info-2"
      >
        <span class="fr-sr-only">
          {{ auMoinsUnCaractereSpecial(modelValue) ? 'critère valide :' : 'critère non valide :' }}
        </span>
        1 caractère spécial minimum
      </p>
      <p
        :class="auMoinsUnChiffre(modelValue) ? 'fr-message--valid' : 'fr-message--info'"
        class="fr-message"
        id="password-input-message-info-3"
      >
        <span class="fr-sr-only">
          {{ auMoinsUnChiffre(modelValue) ? 'critère valide :' : 'critère non valide :' }}
        </span>
        1 chiffre minimum
      </p>
    </div>
    <div class="fr-password__checkbox fr-checkbox-group fr-checkbox-group--sm">
      <input
        aria-label="Afficher le mot de passe"
        id="password-show"
        type="checkbox"
        aria-describedby="password-show-messages"
      />
      <label class="fr-password__checkbox fr-label" for="password-show"> Afficher </label>
      <div class="fr-messages-group" id="password-show-messages" aria-live="assertive"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import '@gouvfr/dsfr/dist/component/password/password.min.css';

  defineProps<{
    modelValue: string;
    legende: string;
    required?: boolean;
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

  function auMoinsUneMajusculeEtUneMinuscule(password: string | null): boolean {
    if (password === null) return false;
    const contientUneMajuscule = /[A-Z]/.test(password);
    const contientUneMinuscule = /[a-z]/.test(password);
    return contientUneMajuscule && contientUneMinuscule;
  }
  function verifierMotDePasseValide(motDePasse: string) {
    return auMoinsUnCaractereSpecial(motDePasse) && auMoinsDouzeCaracteres(motDePasse) && auMoinsUnChiffre(motDePasse);
  }
</script>
