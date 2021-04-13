<template>
  <nav>
    <div class="nav-box">
      <router-link to="/">Inscription</router-link>
      <router-link to="/signin">Connexion</router-link>
    </div>
  </nav>

</template>

<script>

export default {
  name: 'Headerhome'
  
  
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
nav {
  padding: 20px 150px;
  border-bottom: 1px solid black;
  display: flex;
  justify-content: flex-end;
  
}

nav .nav-box {
  display: flex;
  justify-content: space-between;
  width: 25%;
}
</style>
