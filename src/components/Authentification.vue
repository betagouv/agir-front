<template>
  <div>
    <form id="login-8199" @submit.prevent="login">
      <fieldset class="fr-fieldset" id="login-8199-fieldset" aria-labelledby="login-8199-fieldset-legend login-8199-fieldset-messages">
        <legend class="fr-fieldset__legend" id="login-8199-fieldset-legend">
          <h5>Se connecter avec son compte</h5>
        </legend>
        <div class="fr-fieldset__element">
          <fieldset class="fr-fieldset" id="credentials" aria-labelledby="credentials-legend credentials-messages">
            <legend class="fr-sr-only" id="credentials-legend">identifiants</legend>
            <div class="fr-fieldset__element">
              <div class="fr-input-group" autocomplete="username" aria-required="true" autocapitalize="off" autocorrect="off" id="input-group-8201">
                <label class="fr-label" for="username-8196"> Identifiant </label>
                <input
                  class="fr-input"
                  autocomplete="username"
                  aria-required="true"
                  autocapitalize="off"
                  autocorrect="off"
                  id="username-8196"
                  aria-describedby="username-8196-messages"
                  name="username"
                  type="text"
                  v-model="username"
                />
                <div class="fr-messages-group" id="username-8196-messages" aria-live="assertive"></div>
              </div>
            </div>
            <div class="fr-messages-group" id="credentials-messages" aria-live="assertive"></div>
          </fieldset>
        </div>
        <div class="fr-fieldset__element">
          <ul class="fr-btns-group">
            <li>
              <button class="fr-mt-2v fr-btn" id="button-8202">Se connecter</button>
            </li>
          </ul>
        </div>
        <div class="fr-messages-group" id="login-8199-fieldset-messages" aria-live="assertive"></div>
      </fieldset>
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import router from "@/router";

export default defineComponent({
  setup() {
    const username = ref("");
    const error = ref("");

    const login = () => {
      router.push({ name: "dashboard", state: { utilisateur: username.value } });
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
