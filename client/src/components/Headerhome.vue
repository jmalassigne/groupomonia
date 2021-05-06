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
<style scoped lang="scss">
@import "../styles/_variables.scss";

header {
  position: fixed;
  height: 80px;
  width: 100%;
  background: $primaryGradient;
  box-shadow: $primaryShadow;

  @media (max-width: 900px) {
      height: 60px;
    }

  .logo {
    position: absolute;
    left: 30px;
    width: 300px;
    top: 14px;

    @media (max-width: 900px) {
      width: 200px;
    }

    @media (max-width: 570px) {
      width: 150px;
      top: 20px;
    }
  }

  nav {
    position: absolute;
    right: 30px;
    height: 100%;
    width: 300px;
    display: flex;
    justify-content: space-around;
    align-items: center;

    @media (max-width: 900px) {
      width: 250px;
    }

    @media (max-width: 570px) {
      width: 150px;
    }

    .btn {
      padding: 10px 15px;
      color: $grey;
      font-weight: 700;
      text-decoration: none;
      border-radius: 13px;
      background: $primaryGradient;
      box-shadow: $primaryShadow;
      transition: 0.3s;

      @media (max-width: 900px) {
        font-size: 0.7em;
    }

    @media (max-width: 570px) {
        font-size: 0.5em;
        padding: 7px 10px;
    }

      &:hover {
        background: $btnHoverGradient;
        color: black;
      }
    }
    .router-link-active {
      box-shadow: $btnActiveShadow;
    }
  }
}

</style>
