<template>
  <div>
    <Header></Header>
    <main class="container">
      <article>
        <p>nom:</p>
      </article>
    </main>
  </div>
</template>

<script>
import Header from '../components/Header'

export default ({
  name: 'Settings',  
  components: { Header },
  data(){
      return {
          urlGetUser: 'http://localhost:3000/groupomonia/users/get-user',
          userData: {}
      }
  },
  methods:{
      async getUserData(){
        const token = localStorage.getItem("token");

        const response = await fetch(this.urlGetUser, {
            headers: {
            Authorization: "Bearer " + token,
            Accept: "application/json",
            "Content-Type": "application/json",
            },
            method: "GET",
        })
            .then(function (res) {
            if (res.status == 500) {
                return 500;
            } else {
                return res.json();
            }
            })
            .catch(function () {
            return false;
            });

        if (response != false) {
            if (response === 500) {
            alert("Une erreur est survenue, veuillez réessayer.");
            } else {
                this.userData = response.dataToSend;
            }
        } else {
            alert("Une erreur est survenue, veuillez réessayer.");
        }
      }
  },
  created(){
      this.getUserData();
  }
    
})
</script>
