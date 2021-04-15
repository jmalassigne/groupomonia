<template>
    <div class="container">

        <div v-if="articlesLoaded">
            
                <Article-pattern v-for="article in articles.articles" :key="article.id" :articleData="article"></Article-pattern>
            
        </div>
        
    </div>
</template>

<script>

import ArticlePattern from './ArticlePattern';

export default {

    name: 'ListArticles',
    props: ['filter'],
    components: {
        ArticlePattern
    },
    data() {
      
     return {
            url: 'http://localhost:3000/groupomonia/articles/list',
            articles: {},
            articlesLoaded: false
            
        }
    },

    methods: {
        
        async loadingList(){

        this.articlesLoaded = false;

        const token = localStorage.getItem('token');

        const response = await fetch(this.url,{headers: {
                            'Authorization': 'Bearer ' + token,
                            'Accept': 'application/json',
                            'Content-Type': 'application/json'
                          },
                              method: "GET"
                            
                           })
                            .then(function(res){ 
                              if(res.status == 500) {
                                return 500;
                              } else {
                                return res.json();
                              }
                            })
                            .catch(function(){ return false })


        if(response != false){
            if(response === 500) {
            alert('Une erreur est survenue, veuillez réessayer.')
            } else {
            this.articles = response;
            this.articlesLoaded = true;
            console.log(this.articles);
            }
        } else {
            
            alert('Une erreur est survenue, veuillez réessayer.')

        }

        }


    
    },

    created() {
        
        this.loadingList();
        
    },

   watch: {
    // à chaque fois que la question change, cette fonction s'exécutera
    filter: function () {
      
      this.loadingList();

    }

  }
    
}
</script>

<style scoped>

.container {
    padding: 50px 80px;
}

</style>