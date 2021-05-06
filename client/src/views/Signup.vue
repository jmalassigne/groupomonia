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
            autofocus
            v-model="form.email.text"
            @focus="inputFocus($event), anim($event)"
            @blur="stopAnim($event)"
            @keyup="inputCtrl($event)"
          />
          <div class="focus-bar"></div>
          <p class="warning" id="email-warning" v-show="form.email.showWarning">
            {{ form.email.warning }}
          </p>
        </div>

        <div class="input-box">
          <label for="username">Nom d'utilisateur:</label>
          <input
            type="text"
            id="username"
            v-model="form.username.text"
            @focus="inputFocus($event), anim($event)"
            @blur="stopAnim($event)"
            @keyup="inputCtrl($event)"
          />
          <div class="focus-bar"></div>
          <p
            class="warning"
            id="username-warning"
            v-show="form.username.showWarning"
          >
            {{ form.username.warning }}
          </p>
        </div>

        <div class="input-box">
          <label for="password">Mot de passe:</label>
          <input
            type="password"
            id="password"
            v-model="form.password.text"
            @focus="inputFocus($event), anim($event)"
            @blur="stopAnim($event)"
            @keyup="inputCtrl($event)"
          />
          <div class="focus-bar"></div>
          <p
            class="warning"
            id="password-warning"
            v-show="form.password.showWarning"
          >
            {{ form.password.warning }}
          </p>
        </div>

        <div class="input-box">
          <label for="passwordTwo">Confirmation mot de passe:</label>
          <input
            type="password"
            id="passwordTwo"
            v-model="form.passwordTwo.text"
            @focus="inputFocus($event), anim($event)"
            @blur="stopAnim($event)"
            @keyup="inputCtrl($event)"
          />
          <div class="focus-bar"></div>
          <p
            class="warning"
            id="passwordTwo-warning"
            v-show="form.passwordTwo.showWarning"
          >
            {{ form.passwordTwo.warning }}
          </p>
        </div>

        <button v-show="form.isFormValid" @click.prevent="sendForm">
          Valider
        </button>
      </form>
    </main>
  </div>
</template>

<script>
import Headerhome from "../components/Headerhome.vue";
import Router from "../router/index";

export default {
  name: "Signup",
  components: {
    Headerhome,
  },
  data() {
    return {
      url: "http://localhost:3000/groupomonia/users/signup",

      PASSWORD_REGEX: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,255}$/,

      EMAIL_REGEX: /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[x01-x08x0bx0cx0e-x1fx21x23-x5bx5d-x7f]|\\[x01-x09x0bx0cx0e-x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[x01-x08x0bx0cx0e-x1fx21-x5ax53-x7f]|\\[x01-x09x0bx0cx0e-x7f])+)\])/,

      USERNAME_REGEX: /^[a-zA-Z]{5,50}$/,

      form: {
        isFormValid: false,

        email: {
          isValid: false,
          text: "",
          warning: "Email invalide.",
          showWarning: false,
        },
        password: {
          isValid: false,
          text: "",
          warning:
            "Votre mot de passe doit contenir au moins 8 caractères, un chiffre, une lettre minuscule et une lettre majuscule.",
          showWarning: false,
        },
        passwordTwo: {
          isValid: false,
          text: "",
          warning: "Mot de passe non valide.",
          showWarning: false,
        },
        username: {
          isValid: false,
          text: "",
          warning:
            "Votre nom d'utilisateur doit être compris entre 5 et 50 caractères et ne doit pas contenir de chiffres ou de caractères spéciaux.",
          showWarning: false,
        },
      },
    };
  },

  watch: {
    "form.username.isValid": function () {
      if (
        this.form.username.isValid &&
        this.form.email.isValid &&
        this.form.password.isValid &&
        this.form.passwordTwo.isValid
      ) {
        this.form.isFormValid = true;
      } else {
        this.form.isFormValid = false;
      }
    },

    "form.email.isValid": function () {
      if (
        this.form.username.isValid &&
        this.form.email.isValid &&
        this.form.password.isValid &&
        this.form.passwordTwo.isValid
      ) {
        this.form.isFormValid = true;
      } else {
        this.form.isFormValid = false;
      }
    },

    "form.password.isValid": function () {
      if (
        this.form.username.isValid &&
        this.form.email.isValid &&
        this.form.password.isValid &&
        this.form.passwordTwo.isValid
      ) {
        this.form.isFormValid = true;
      } else {
        this.form.isFormValid = false;
      }
    },

    "form.passwordTwo.isValid": function () {
      if (
        this.form.username.isValid &&
        this.form.email.isValid &&
        this.form.password.isValid &&
        this.form.passwordTwo.isValid
      ) {
        this.form.isFormValid = true;
      } else {
        this.form.isFormValid = false;
      }
    },

    // if(this.form.email.isValid && this.form.username.isValid && this.form.password.isValid && this.form.passwordTwo.isValid){
    //   return this.form.isFormValid = true;
    // } else {
    //   return this.form.isFormValid = false;
    // }
  },

  methods: {
    inputFocus(e) {
      const inputId = e.currentTarget.id;

      switch (inputId) {
        case "email":
          this.form.email.showWarning = true;
          break;

        case "username":
          this.form.username.showWarning = true;
          break;

        case "password":
          this.form.password.showWarning = true;
          break;

        case "passwordTwo":
          this.form.passwordTwo.showWarning = true;
          break;
      }
    },

    inputCtrl(e) {
      const inputId = e.currentTarget.id;

      switch (inputId) {
        case "email":
          if (this.EMAIL_REGEX.test(this.form.email.text)) {
            this.form.email.showWarning = false;
            this.form.email.isValid = true;
          } else {
            this.form.email.showWarning = true;
            this.form.email.isValid = false;
          }

          break;

        case "username":
          if (this.USERNAME_REGEX.test(this.form.username.text)) {
            this.form.username.showWarning = false;
            this.form.username.isValid = true;
          } else {
            this.form.username.showWarning = true;
            this.form.username.isValid = false;
          }

          break;

        case "password":
          if (this.PASSWORD_REGEX.test(this.form.password.text)) {
            this.form.password.showWarning = false;
            this.form.password.isValid = true;
          } else {
            this.form.password.showWarning = true;
            this.form.password.isValid = false;
          }

          break;

        case "passwordTwo":
          if (this.form.password.text == this.form.passwordTwo.text) {
            this.form.passwordTwo.showWarning = false;
            this.form.passwordTwo.isValid = true;
          } else {
            this.form.passwordTwo.showWarning = true;
            this.form.passwordTwo.isValid = false;
          }

          break;
      }
    },

    async sendForm() {
      const form = {
        email: this.form.email.text,
        username: this.form.username.text,
        password: this.form.password.text,
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
          return res.json();
        })
        .catch(function () {
          return false;
        });

      if (response != false) {
        localStorage.setItem("token", response.token);
        Router.push({ path: "/thread" });
      } else {
        alert("Une erreur est survenue, veuillez réessayer.");
      }
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
  display: flex;
  align-items: center;
  justify-content: center;
}

form {
  height: calc(100vh - 160px);
  padding-top: 160px;
  width: 70%;
  display: flex;
  flex-direction: column;

  @media (max-width: 750px) {
    padding-top: 110px;
    height: calc(100vh - 110px);
  }

  .input-box {
    height: 100px;
    display: flex;
    flex-direction: column;

    @media (max-width: 750px) {
      height: 80px;
    }

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
        border-radius: 10px;
      }

      &:focus {
        outline: none;
      }
    }

    .focus-bar {
      display: inline-block;
      height: 3px;
      background-color: $grey;
      width: 0;
      margin: 0 auto;
      border-radius: 5px;
      transition: 0.3s cubic-bezier(0.075, 0.82, 0.165, 1);
    }

    .warning {
      color: $red;
      font-size: 12px;
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