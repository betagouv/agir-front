<template>
  <div class="auth-container">
    <h2>Authentification</h2>
    <form class="auth-form" @submit.prevent="login">
      <div class="form-group">
        <label for="username" class="form-label">Nom d'utilisateur:</label>
        <input type="text" id="username" v-model="username" class="form-input" required />
      </div>
      <button type="submit" class="form-button">Envoyer</button>
    </form>
    <p v-if="error" class="error">{{ error }}</p>
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
