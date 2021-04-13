<template>
    <div class="form-box">
    <form>
      <label for="email">E-mail</label>
      <input type="email" id="email">
      <p class="warning" id="email-warning"></p>
      <label for="password">Mot de passe</label>
      <input type="password" id="password">
      <p class="warning" id="password-warning"></p>
    </form>
    <button>Valider</button>
  </div>
</template>

<script>
export default {
  name: 'Signin'
}
</script>

<style scoped>
.form-box {
  padding: 200px;
}

form {
  display: flex;
  flex-direction: column;
  text-align: left;
}

.warning {
  height: 20px;
  width: 100%;
}
</style>