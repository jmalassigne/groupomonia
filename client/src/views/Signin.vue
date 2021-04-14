<template>
<div>
  <Headerhome></Headerhome>
  <main>
    <form>

      <div class="input-box">
      <label for="email">E-mail</label>
      <input type="email" id="email" v-model="form.email" @focus="anim($event)" @blur="stopAnim($event)">
      <div class="focus-bar"></div>
      </div>

      <div class="input-box">
      <label for="password">Mot de passe</label>
      <input type="password" id="password" v-model="form.password" @focus="anim($event)" @blur="stopAnim($event)">
      <div class="focus-bar"></div>
      </div>

      <button @click.prevent="sendForm">Valider</button>

    </form>
  </main>
</div>
</template>

<script>
import Headerhome from '../components/Headerhome';

export default {
  name: 'Signin',
  components: {
    Headerhome
  },
  data: () => {
    return {
      url: 'http://localhost:3000/groupomonia/users/login',
      form: {
        email: '',
        password: ''
      }
    }
  },

  methods: {
    async sendForm() {

            const form = {
                          email: this.form.email,
                          password: this.form.password
                        }

                        console.log(JSON.stringify(form));

      const response = await fetch(this.url,{headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json'
                          },
                              method: "POST",
                              body: JSON.stringify(form)
                           })
                            .then(function(res){ 
                              if(res.status == 500) {
                                return 500;
                              } else {
                                return res;
                              }
                            })
                            .catch(function(){ return false })


      if(response != false){
        if(response === 500) {
          this.wrongUser();
        } else {
          localStorage.setItem('token', response.token);
        }
      } else {
        
        alert('Une erreur est survenue, veuillez réessayer.')

      }

    },

    wrongUser(){

      const form = document.querySelector('form');

      const warning = document.createElement('p');
      warning.textContent = 'L\'utilisateur n\'éxiste pas, veuillez réessayer.';

      warning.style.color = "#FF7272";
      warning.style.margin = "10px auto 0 auto";

      form.appendChild(warning);
      
      setTimeout(() => {
        form.removeChild(warning);
      }, 2000);
      
    },

    anim(e){
      const input = e.currentTarget;
      const focusBar = input.nextSibling;
      
      focusBar.style.width = '100%';
    },

    stopAnim(e) {
      const input = e.currentTarget;
      const focusBar = input.nextSibling;
      
      focusBar.style.width = '0';
    }

  }
}
</script>

<style scoped>
main {
  background: linear-gradient(145deg, #f0f0f0, #FAFAFA);
  display: flex;
  align-items: center;
  justify-content: center;
  padding-top: 80px;
  color: #5e5858;
}

form {
  height: 100vh;
  width: 60%;
  display: flex;
  flex-direction: column;
  margin-top: 50px;
}

.input-box {
  height: 100px;
  display: flex;
  flex-direction: column;
}

form label {
  margin-bottom: 10px;
}

form input {
  border: none;
  height: 30px;
  border-radius: 15px;
  margin-bottom: 5px;
}

form input:focus {
  outline: none;
}

.focus-bar {
  display: inline-block;
  height: 3px;
  background-color: #5e5858;
  width: 0;
  margin: 0 auto;
  border-radius: 5px;
  transition: 0.3s cubic-bezier(0.075, 0.82, 0.165, 1);
}

button {
  border: none;
  width: 90px;
  height: 50px;
  margin: 15px auto 0 auto;
  border-radius: 13px;
  color: #5e5858;
  font-weight: 800;
  background: #e0e0e0;
  box-shadow:  7px 7px 15px #a8a8a8,
             -7px -7px 15px #ffffff;
  transform: 0.3s;
}

button:hover {
  background: linear-gradient(145deg, #f0f0f0, #cacaca);
  box-shadow:  7px 7px 15px #a8a8a8,
             -7px -7px 15px #ffffff;
}

button:focus {
  outline: none;
}

button:active {
  border-radius: 13px;
  background: #e0e0e0;
  box-shadow: inset 7px 7px 15px #a8a8a8,
            inset -7px -7px 15px #ffffff;
  color: black;
}

</style>
