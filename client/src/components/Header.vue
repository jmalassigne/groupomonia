<template>
  <nav>
    <img src="../assets/icon-left-font-monochrome-black.png" class="logo" alt="logo">
    <div class="nav-box">
      <router-link to="/thread" class="btn">Fil d'articles</router-link>  
      <router-link to="/settings" class="btn">Paramètres</router-link>
      <button class="btn btn-dcnt" @click.prevent="closeSession">Deconnexion</button>
    </div>
  </nav>
</template>

<script>
import Router from '../router/index'

export default {
    name:'Header',
    methods: {

      closeSession() {

        localStorage.removeItem('token');
        Router.push('/');

      }

    }
}
</script>

<style scoped>
nav {
  position: fixed;
  z-index: 1000;
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
  width: 40%;
  display: flex;
  justify-content: space-around;
}

.btn {
  padding: 10px 15px;
  color: #5e5858;
  font-weight: 700;
  text-decoration: none;
  border-radius: 13px;
  background: linear-gradient(145deg, #f0f0f0, #FAFAFA);
  box-shadow:  6px 6px 13px #bcbcbc, -6px -6px 13px #ffffff;
  transition: 0.3s;
}

.btn-dcnt {
    background: #FF7272;
    border: none;
    font-size: 17px;
    font-weight: 800;
}

.btn:hover {
  border-radius: 13px;
  background: linear-gradient(145deg, #f0f0f0, #cacaca);
  box-shadow:  7px 7px 15px #a8a8a8,
             -7px -7px 15px #ffffff;    
}

.btn-dcnt:hover {
    background: #EE6161;
    cursor: pointer;
}


.router-link-active{
  box-shadow:  6px 6px 13px #bcbcbc inset, -6px -6px 13px #ffffff inset;
}


</style>
