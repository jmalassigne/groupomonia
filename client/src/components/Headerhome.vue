<template>
  <header>
    <img
      src="../assets/icon-left-font-monochrome-black.png"
      class="logo"
      alt="logo"
    />
    <nav>
      <router-link to="/" class="btn">Inscription</router-link>
      <router-link to="/signin" class="btn">Connexion</router-link>
    </nav>
  </header>
</template>

<script>
export default {
  name: "Headerhome",
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
header {
  position: fixed;
  height: 80px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: linear-gradient(145deg, #f0f0f0, #fafafa);
  box-shadow: 6px 6px 13px #bcbcbc, -6px -6px 13px #ffffff;
}

.logo {
  width: 300px;
  margin-left: 50px;
}

nav {
  margin-right: 100px;
  width: 25%;
  display: flex;
  justify-content: space-around;
}

.btn {
  padding: 15px 20px;
  color: #5e5858;
  font-weight: 700;
  text-decoration: none;
  border-radius: 13px;
  background: linear-gradient(145deg, #f0f0f0, #fafafa);
  box-shadow: 6px 6px 13px #bcbcbc, -6px -6px 13px #ffffff;
  transition: 0.3s;
}

.btn:hover {
  border-radius: 13px;
  background: linear-gradient(145deg, #f0f0f0, #cacaca);
  box-shadow: 7px 7px 15px #a8a8a8, -7px -7px 15px #ffffff;
  color: black;
}

.router-link-active {
  box-shadow: 6px 6px 13px #bcbcbc inset, -6px -6px 13px #ffffff inset;
}
</style>
