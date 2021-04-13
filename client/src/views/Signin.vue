<template>
    <div class="form-box">
    <form>

      <label for="email">E-mail</label>
      <input type="email" id="email" v-model="form.email">
      <p class="warning" id="email-warning"></p>

      <label for="password">Mot de passe</label>
      <input type="password" id="password" v-model="form.password">
      <p class="warning" id="password-warning"></p>

    </form>
    <button @click="sendForm">Valider</button>
  </div>
</template>

<script>
export default {
  name: 'Signin',
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
                            .then(function(res){ return res.json() })
                            .catch(function(){ return false })


                            console.log(response);

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