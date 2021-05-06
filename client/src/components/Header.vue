<template>
  <header>
    <img
      src="../assets/icon-left-font-monochrome-black.png"
      class="logo"
      alt="logo"
    />
    <nav>
      <router-link to="/thread" class="btn">Articles</router-link>
      <router-link to="/gifs" class="btn">Gifs</router-link>
      <router-link to="/settings" class="btn">Paramètres</router-link>
      <button class="btn exit-btn" @click.prevent="closeSession">
        Deconnexion
      </button>
    </nav>
  </header>
</template>

<script>
import Router from "../router/index";

export default {
  name: "Header",
  methods: {
    closeSession() {
      localStorage.removeItem("token");
      Router.push("/signin");
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../styles/_variables.scss";

header {
  position: fixed;
  z-index: 1;
  height: 80px;
  width: 100%;
  background: $primaryGradient;
  box-shadow: $primaryShadow;

  @media (max-width: 1000px) {
    height: 60px;
  }

  .logo {
    position: absolute;
    left: 30px;
    width: 300px;
    top: 14px;

    @media (max-width: 1000px) {
      width: 200px;
    }

    @media (max-width: 570px) {
      width: 150px;
      top: 20px;
    }

    @media (max-width: 490px) {
      width: 130px;
      top: 20px;
      left: 10px;
    }
  }
  nav {
    position: absolute;
    right: 30px;
    height: 100%;
    width: 500px;
    display: flex;
    justify-content: space-around;
    align-items: center;

    @media (max-width: 1000px) {
      width: 350px;
    }

    @media (max-width: 700px) {
      width: 250px;
    }

    .btn {
      padding: 10px 15px;
      color: $grey;
      font-size: 1em;
      font-weight: 700;
      text-decoration: none;
      border-radius: 13px;
      background: $primaryGradient;
      box-shadow: $primaryShadow;
      transition: 0.3s;

      @media (max-width: 1000px) {
        font-size: 0.6em;
      }

      @media (max-width: 700px) {
        font-size: 0.5em;
        padding: 7px 10px;
      }

      &:hover {
        background: $btnHoverGradient;
        color: black;
      }

      
    }
    .exit-btn {
        background: $red;
        border: none;

        &:hover {
          background: #ee6161;
          cursor: pointer;
        }
      }
    .router-link-active {
      box-shadow: $btnActiveShadow;
    }
  }
}
</style>
