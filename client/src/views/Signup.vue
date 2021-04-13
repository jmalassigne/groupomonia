<template>
  <div class="form-box">
    <form>

      <label for="email">E-mail<span class="red">*</span></label>
      <input type="email" id="email" v-model="form.email.text" @focus="inputFocus($event)" @keyup="inputCtrl($event)">
      <p class="warning" id="email-warning" v-show="form.email.showWarning">{{form.email.warning}}</p>

      <label for="username">Nom d'utilisateur<span class="red">*</span></label>
      <input type="text" id="username" v-model="form.username.text" @focus="inputFocus($event)" @keyup="inputCtrl($event)">
      <p class="warning" id="username-warning" v-show="form.username.showWarning">{{form.username.warning}}</p>

      <label for="password">Mot de passe<span class="red">*</span></label>
      <input type="password" id="password" v-model="form.password.text" @focus="inputFocus($event)" @keyup="inputCtrl($event)">
      <p class="warning" id="password-warning" v-show="form.password.showWarning">{{form.password.warning}}</p>

      <label for="passwordTwo">Confirmation mot de passe<span class="red">*</span></label>
      <input type="password" id="passwordTwo" v-model="form.passwordTwo.text" @focus="inputFocus($event)" @keyup="inputCtrl($event)">
      <p class="warning" id="passwordTwo-warning" v-show="form.passwordTwo.showWarning">{{form.passwordTwo.warning}}</p>

      
    </form>
    <button v-show="form.isFormValid" @click="sendForm">Envoyer</button>
  </div>
</template>

<script>
export default {
  name: 'Signup',
  data() {
    return {

      url: 'http://localhost:3000/groupomonia/users/signup',

      PASSWORD_REGEX: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,255}$/,

      EMAIL_REGEX: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,

      USERNAME_REGEX: /^[a-zA-Z]{5,50}$/,

      form: {

        isFormValid: false,

        email: {
          isValid: false,
          text: '',
          warning: 'Email invalide.',
          showWarning: false
        },
        password: {
          isValid: false,
          text: '',
          warning: 'Votre mot de passe doit contenir au moins 8 caractères, un chiffre, une lettre minuscule et une lettre majuscule.',
          showWarning: false
        },
        passwordTwo: {
          isValid: false,
          text: '',
          warning: 'Mot de passe non valide.',
          showWarning: false
        },
        username: {
          isValid: false,
          text: '',
          warning: 'Votre nom d\'utilisateur doit être compris entre 5 et 50 caractères et ne doit pas contenir de chiffres ou de caractères spéciaux.',
          showWarning: false
        }
      }
    }
  },

  watch: {

    'form.username.isValid': function() {
      if(this.form.username.isValid && this.form.email.isValid && this.form.password.isValid && this.form.passwordTwo.isValid){
        this.form.isFormValid = true;
      } else {
        this.form.isFormValid = false;
      }
    },

    'form.email.isValid': function() {
      if(this.form.username.isValid && this.form.email.isValid && this.form.password.isValid && this.form.passwordTwo.isValid){
        this.form.isFormValid = true;
      } else {
        this.form.isFormValid = false;
      }
    },

    'form.password.isValid': function() {
      if(this.form.username.isValid && this.form.email.isValid && this.form.password.isValid && this.form.passwordTwo.isValid){
        this.form.isFormValid = true;
      } else {
        this.form.isFormValid = false;
      }
    },

    'form.passwordTwo.isValid': function() {
      if(this.form.username.isValid && this.form.email.isValid && this.form.password.isValid && this.form.passwordTwo.isValid){
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

      switch(inputId) {

        case 'email':
          this.form.email.showWarning = true;
          break;

        case 'username': 
          this.form.username.showWarning = true;
          break;

        case 'password': 
          this.form.password.showWarning = true;
          break;

        case 'passwordTwo': 
          this.form.passwordTwo.showWarning = true;
          break;

      }
      
    },

    inputCtrl(e) {

      const inputId = e.currentTarget.id;

      switch(inputId){

        case 'email':

          if(this.EMAIL_REGEX.test(this.form.email.text)){
            this.form.email.showWarning = false;
            this.form.email.isValid = true;
          } else {
            this.form.email.showWarning = true;
            this.form.email.isValid = false;
          }
          
          break;

        case 'username':

          if(this.USERNAME_REGEX.test(this.form.username.text)){
            this.form.username.showWarning = false;
            this.form.username.isValid = true;
          } else {
            this.form.username.showWarning = true;
            this.form.username.isValid = false;
          }

          break;

        case 'password':
          
          if(this.PASSWORD_REGEX.test(this.form.password.text)){
            this.form.password.showWarning = false;
            this.form.password.isValid = true;
          } else {
            this.form.password.showWarning = true;
            this.form.password.isValid = false;
          }

          break;

        case 'passwordTwo':
          
          if(this.form.password.text == this.form.passwordTwo.text){
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
        password: this.form.password.text
      }

      const response = await fetch(this.url,{headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json'
                          },
                              method: "POST",
                              body: JSON.stringify(form)
                           })
                            .then(function(res){ return res.json() })
                            .catch(function(){ return false })

      if(response != false){
        localStorage.setItem('token', response.token);
      } else {
        
        alert('Une erreur est survenue, veuillez réessayer.')

      }

    }
    
  }

  
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