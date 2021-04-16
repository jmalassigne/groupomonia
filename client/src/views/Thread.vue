<template>

  <div>
  <Header></Header>
  <main>
    <aside>
      <button @click.prevent="toggle('create')" class="margin-bottom"><i class="fas fa-plus-square"></i>Nouvel article</button>
      <div class="bar"></div>
      <div class="search-articles">
        <button @click.prevent="toggle('recents')"><i class="far fa-newspaper"></i>Articles les plus récents</button>
        <button @click.prevent="toggle('liked')"><i class="far fa-thumbs-up"></i>Articles les mieux notés</button>
        <button @click.prevent="toggle('commented')"><i class="far fa-comments"></i>Articles les plus<br> commentés</button>
      </div>
    </aside>
    <CreateArticle v-if="showCreateArticle"></CreateArticle>
    <ListArticles v-if="showListArticles" :filter="filter" @resetFilter="rstFilter()"></ListArticles>
    

  </main>
  </div>

</template>

<script>
import Header from '../components/Header';
import CreateArticle from '../components/CreateArticle';
import ListArticles from '../components/ListArticles';

export default {
    name: 'Thread',
    components: {
        Header,
        CreateArticle,
        ListArticles,
        
    },
    data() {
      return {

        showCreateArticle: true,
        showListArticles: false,
        filter: ''
        
      }
    },

    methods: {

      rstFilter(){

        this.filter = '';


      },

      toggle(target){

        switch (target) {

          case 'create':

            this.showCreateArticle = true;
            this.showListArticles = false;
            this.filter = '';
            
            
            break;

          case 'recents':

            this.showCreateArticle = false;
            this.showListArticles = true;
            this.filter = 'recents';
            
            
            break;

          case 'commented':

            this.showCreateArticle = false;
            this.showListArticles = true;
            this.filter = 'commented';
            
            
            break;

          case 'liked':

            this.showCreateArticle = false;
            this.showListArticles = true;
            this.filter = 'liked';
            
            break;
        
          default:
            break;
        }

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
  min-width: 250px;
  max-width: 250px;
  padding: 30px 0 20px 15px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  border-right: 1px solid rgba(0, 0, 0, 0.2);
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

.margin-bottom {
  margin-bottom: 20px;

}

button:hover {
  background: #21A87D;
  box-shadow:  6px 6px 13px #bcbcbc, -6px -6px 13px #ffffff;
}

button:focus {
  outline: none;
}

button:active {
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