<template>
  <div>
    <Headerhome></Headerhome>
    <main>
      <form>
        <div class="input-box">
          <label for="email">E-mail:</label>
          <input
            type="email"
            id="email"
            v-model="form.email"
            @focus="anim($event)"
            @blur="stopAnim($event)"
          />
          <div class="focus-bar"></div>
        </div>

        <div class="input-box">
          <label for="password">Mot de passe:</label>
          <input
            type="password"
            id="password"
            v-model="form.password"
            @focus="anim($event)"
            @blur="stopAnim($event)"
          />
          <div class="focus-bar"></div>
        </div>

        <button @click.prevent="sendForm">Valider</button>
      </form>
    </main>
  </div>
</template>

<script>
import Headerhome from "../components/Headerhome";
import Router from "../router/index";

export default {
  name: "Signin",
  components: {
    Headerhome,
  },
  data: () => {
    return {
      url: "http://localhost:3000/groupomonia/users/login",
      form: {
        email: "",
        password: "",
      },
    };
  },

  methods: {
    async sendForm() {
      const form = {
        email: this.form.email,
        password: this.form.password,
      };

      const response = await fetch(this.url, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify(form),
      })
        .then(function (res) {
          if (res.status === 500) {
            return 500;
          } else if (res.status === 400) {
            return 400;
          } else if (res.status === 404) {
            return 404;
          } else {
            return res.json();
          }
        })
        .catch(function () {
          return false;
        });

      if (response != 500) {
        if (response === 400) {
          this.wrongUser(400);
        } else if (response === 404) {
          this.wrongUser(404);
        } else {
          localStorage.setItem("token", response.token);
          Router.push({ path: "/thread" });
        }
      } else {
        alert("Une erreur est survenue, veuillez réessayer.");
      }
    },

    wrongUser(status) {
      const form = document.querySelector("form");

      const warning = document.createElement("p");

      if (status === 400) {
        warning.textContent = "Le mot de passe est invalide.";
      }

      if (status === 404) {
        warning.textContent = "L'utilisateur n'éxiste pas, veuillez réessayer.";
      }

      warning.style.color = "#FF7272";
      warning.style.margin = "10px auto 0 auto";

      form.appendChild(warning);

      setTimeout(() => {
        form.removeChild(warning);
      }, 2000);
    },

    anim(e) {
      const input = e.currentTarget;
      const focusBar = input.nextSibling;

      focusBar.style.width = "100%";
    },

    stopAnim(e) {
      const input = e.currentTarget;
      const focusBar = input.nextSibling;

      focusBar.style.width = "0";
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../styles/_variables.scss";

main {
  background: $primaryGradient;
  height: 100vh;
  display: flex;
  justify-content: center;
}

form {
  margin-top: 180px;
  height: 50%;
  width: 70%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;

   @media (max-width: 750px) {
     margin-top: 150px;
   }

  .input-box {
    height: 100px;
    display: flex;
    flex-direction: column;

    label {
      margin-bottom: 10px;
      font-size: 1.1em;

      @media (max-width: 750px) {
        font-size: 0.8em;
      }
    }

    input {
      border: none;
      height: 30px;
      border-radius: 15px;
      margin-bottom: 5px;

      @media (max-width: 750px) {
        height: 20px;
      }

      &:focus {
        outline: none;
      }
    }

    .focus-bar {
      height: 3px;
      background-color: $grey;
      width: 0;
      margin: 0 auto;
      border-radius: 10px;
      transition: 0.7s cubic-bezier(0.075, 0.82, 0.165, 1);
    }
  }

  button {
    border: none;
    width: 90px;
    height: 40px;
    margin: 15px auto;
    border-radius: 13px;
    color: $grey;
    font-weight: 800;
    font-size: 1.07em;
    box-shadow: $primaryShadow;
    background: $primaryGradient;
    transition: 0.3s;

     @media (max-width: 750px) {
        height: 30px;
        width: 70px;
        border-radius: 8px;
        font-size: 0.9em;
      }

    &:hover {
      background: $btnHoverGradient;
      color: black;
    }
    &:focus {
      outline: none;
    }
    &:active {
      box-shadow: $btnActiveShadow;
    }
  }
}
</style>
