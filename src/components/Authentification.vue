<template>
  <div>
    <form id="login-8199" @submit.prevent="login">
      <fieldset id="login-8199-fieldset" aria-labelledby="login-8199-fieldset-legend login-8199-fieldset-messages"
                class="fr-fieldset">
        <legend id="login-8199-fieldset-legend" class="fr-fieldset__legend">
          <h5>Se connecter avec son compte</h5>
        </legend>
        <div class="fr-fieldset__element">
          <fieldset id="credentials" aria-labelledby="credentials-legend credentials-messages" class="fr-fieldset">
            <legend id="credentials-legend" class="fr-sr-only">identifiants</legend>
            <div class="fr-fieldset__element">
              <div id="input-group-8201" aria-required="true" autocapitalize="off" autocomplete="username"
                   autocorrect="off" class="fr-input-group">
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
      router.push({name: "dashboard", state: {utilisateur: username.value}});
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
.auth-container {
  font-family: "Arial", sans-serif;
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  background-color: #3b3f41;
  border-radius: 5px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

h2 {
  font-size: 24px;
  margin-bottom: 20px;
  text-align: center;
}

.auth-form {
  display: flex;
  flex-direction: column;
}

.form-group {
  margin-bottom: 20px;
}

.form-label {
  font-size: 18px;
  margin-bottom: 15px;
}

.form-input {
  padding: 10px;
  font-size: 16px;
  border-radius: 3px;
  border: 1px solid #ccc;
  margin-left: 16px;
}

.form-button {
  padding: 10px 20px;
  font-size: 16px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 3px;
  cursor: pointer;
}

.error {
  color: red;
  margin-top: 10px;
  text-align: center;
}
</style>
