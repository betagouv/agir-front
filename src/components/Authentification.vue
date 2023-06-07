<template>
  <div>
    <h2>Authentification</h2>
    <form @submit.prevent="login">
      <div>
        <label for="username">Nom d'utilisateur:</label>
        <input type="text" id="username" v-model="username" required />
      </div>
      <button type="submit">Envoyer</button>
    </form>
    <p v-if="error" class="error">{{ error }}</p>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";

export default defineComponent({
  setup() {
    const username = ref("");
    const error = ref("");

    const login = () => {
      // Simulate login request
      if (username.value === "dodo") {
        // Successful login
        error.value = "";
        // Do something, such as redirecting to a different page
      } else {
        // Failed login
        error.value = "Invalid username";
      }
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
.error {
  color: red;
  margin-top: 10px;
}
</style>
