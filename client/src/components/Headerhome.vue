<template>
  <nav>
    <img src="../assets/icon-left-font-monochrome-black.png" class="logo" alt="logo">
    <div class="nav-box">
      <router-link to="/" class="btn">Inscription</router-link>
      <router-link to="/signin" class="btn">Connexion</router-link>
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
  position: fixed;
  height: 80px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: linear-gradient(145deg, #f0f0f0, #FAFAFA);
  box-shadow:  6px 6px 13px #bcbcbc, -6px -6px 13px #ffffff;
  }

.logo {
  width: 300px;
  margin-left: 50px;
}

.nav-box {
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
  background: linear-gradient(145deg, #f0f0f0, #FAFAFA);
  box-shadow:  6px 6px 13px #bcbcbc, -6px -6px 13px #ffffff;
  transition: 0.3s;
}

.btn:hover {
  border-radius: 13px;
  background: linear-gradient(145deg, #f0f0f0, #cacaca);
  box-shadow:  7px 7px 15px #a8a8a8,
             -7px -7px 15px #ffffff;    
}


.router-link-active{
  box-shadow:  6px 6px 13px #bcbcbc inset, -6px -6px 13px #ffffff inset;
}


</style>
