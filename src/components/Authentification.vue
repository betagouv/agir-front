<template>
  <div class="login-container">
    <form id="login-8199" @submit.prevent="login">
      <fieldset id="login-8199-fieldset" aria-labelledby="login-8199-fieldset-legend login-8199-fieldset-messages" class="fr-fieldset">
        <legend id="login-8199-fieldset-legend" class="fr-fieldset__legend">
          <h5>Se connecter avec son compte</h5>
        </legend>
        <div class="fr-fieldset__element">
          <fieldset id="credentials" aria-labelledby="credentials-legend credentials-messages" class="fr-fieldset">
            <legend id="credentials-legend" class="fr-sr-only">identifiants</legend>
            <div class="fr-fieldset__element">
              <div id="input-group-8201" aria-required="true" autocapitalize="off" autocomplete="username" autocorrect="off" class="fr-input-group">
                <label class="fr-label" for="username-8196"> Identifiant </label>
                <input
                  id="username-8196"
                  v-model="username"
                  aria-describedby="username-8196-messages"
                  aria-required="true"
                  autocapitalize="off"
                  autocomplete="username"
                  autocorrect="off"
                  class="fr-input"
                  name="username"
                  type="text"
                />
                <div id="username-8196-messages" aria-live="assertive" class="fr-messages-group"></div>
              </div>
            </div>
            <div id="credentials-messages" aria-live="assertive" class="fr-messages-group"></div>
          </fieldset>
        </div>
        <div class="fr-fieldset__element">
          <ul class="fr-btns-group">
            <li>
              <button id="button-8202" class="fr-mt-2v fr-btn">Se connecter</button>
            </li>
          </ul>
        </div>
        <div id="login-8199-fieldset-messages" aria-live="assertive" class="fr-messages-group"></div>
      </fieldset>
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import router from "@/router";
import store from "@/store";

export default defineComponent({
  setup() {
    const username = ref("");
    const error = ref("");
    const login = () => {
      store.commit("utilisateur/setUtilisateur", username.value);
      router.push({ name: "coach", state: { utilisateur: username.value } });
    };

    return {
      username,
      error,
      login,
    };
  },
});
</script>

<style scoped>
h2 {
  font-size: 24px;
  margin-bottom: 20px;
  text-align: center;
}

.login-container {
  width: 30vw;
  text-align: center;
  margin: 15vw auto 0 auto;
}

.error {
  color: red;
  margin-top: 10px;
  text-align: center;
}

@media only screen and (max-width: 900px) {
  .login-container {
    width: 80vw;
    text-align: center;
    margin: 50vw auto 0 auto;
  }
}
</style>
