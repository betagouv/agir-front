<template>
  <div class="main-container">
    <div class="login-container">
      <h1>Agire !</h1>
      <h2>L’accompagnement personnalisé pour réduire votre empreinte écologique</h2>
      <ul>
        <li>Mesurez les impacts de vos usages au quotidien</li>
        <li>Simulez des aides pertinentes adaptées à votre situation</li>
        <li>Testez vos connaissances</li>
      </ul>
      <form id="login-8199" @submit.prevent="login">
        <fieldset id="login-8199-fieldset" aria-labelledby="login-8199-fieldset-legend login-8199-fieldset-messages" class="fr-fieldset">
          <div class="fr-fieldset__element">
            <fieldset id="credentials" aria-labelledby="credentials-legend credentials-messages" class="fr-fieldset">
              <legend id="credentials-legend" class="fr-sr-only">identifiants</legend>
              <div class="fr-fieldset__element">
                <div id="input-group-8201" aria-required="true" autocapitalize="off" autocomplete="username" autocorrect="off" class="fr-input-group fr-mt-5v">
                  <label class="fr-label" for="username-8196">
                    Identifiant
                    <span class="fr-hint-text">Pour la démo (Dorian ou Livio)</span>
                  </label>
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
                <button id="button-8202" class="fr-btn">Se connecter</button>
              </li>
            </ul>
          </div>
          <div id="login-8199-fieldset-messages" aria-live="assertive" class="fr-messages-group"></div>
        </fieldset>
      </form>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import router from "@/router";
import store from "@/store";
import { AuthentifierUtilisateurUsecase } from "@/authentification/authentifierUtilisateur.usecase";
import { UtilisateurRepositoryAxios } from "@/authentification/adapters/utilisateur.repository.axios";
import { SessionRepositoryStore } from "@/authentification/adapters/session.repository.store";

export default defineComponent({
  setup() {
    const username = ref("");
    const error = ref("");
    const login = async () => {
      const usecase = new AuthentifierUtilisateurUsecase(new UtilisateurRepositoryAxios(), new SessionRepositoryStore());
      usecase.execute(username.value).then(() => {
        router.push({ name: "coach", state: { utilisateur: username.value } });
      });
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
.login-container {
  text-align: left;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 4rem;
  box-shadow: 0 6px 18px 0 rgba(0, 0, 18, 0.16);
  width: fit-content;
  margin: 0 auto;
  max-width: 60%;
}

.error {
  color: red;
  margin-top: 10px;
  text-align: center;
}

.main-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

.fr-btn {
  width: auto;
}
</style>
