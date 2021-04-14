<template>

  <div>
  <Header></Header>
  <main>
    <aside>
      <button><i class="fas fa-plus-square"></i>Nouvel article</button>
      <div class="bar"></div>
      <div class="search-articles">
        <button><i class="far fa-newspaper"></i>Articles les plus récents</button>
        <button><i class="far fa-thumbs-up"></i>Articles les mieux notés</button>
        <button><i class="far fa-comments"></i>Articles les plus<br> commentés</button>
      </div>
    </aside>
    <CreateArticle v-if="showCreateArticle"></CreateArticle>
  </main>
  </div>

</template>

<script>
import Header from '../components/Header';
import CreateArticle from '../components/CreateArticle';

export default {
    name: 'Thread',
    components: {
        Header,
        CreateArticle
    },
    data() {
      return {

        showCreateArticle: true

      }
    }
}
</script>

<style scoped>
main {
  background: linear-gradient(145deg, #f0f0f0, #FAFAFA);
  display: flex;
  justify-content: flex-start;
  padding-top: 80px;
  color: #5e5858;
}

aside {
  height: 100vh;
  width: 250px;
  padding: 30px 0 20px 15px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  box-shadow: -9px -15px 20px 0px rgba(0, 0, 0, 0.2) inset;
}

.bar {
  display: inline-block;
  width: 80%;
  height: 1px;
  border-radius: 1px;
  background: rgba(0, 0, 0, 0.2);
}

button {
  border: none;
  background-color: rgba(0, 0, 0, 0);
  margin: 3px 0;
  font-size: 13px;
  padding: 10px 12px;
  border-radius: 10px;
  transition: 0.3s;
}

button:first-of-type {
  margin-bottom: 20px;
}

button:hover {
  background: #21A87D;
  box-shadow:  6px 6px 13px #bcbcbc, -6px -6px 13px #ffffff;
}

button:focus {
  outline: none;
  background: #21A87D;
  box-shadow: none;
}

.search-articles{
  margin-top: 15px;
}

.search-articles button:hover {
  background: #489CC1;
  box-shadow:  6px 6px 13px #bcbcbc;
}

.search-articles button:focus {
  background: #489CC1;
}

i {
  margin-right: 10px;
}


</style>