<template>
  <div class="container">
    <div class="list-container" v-if="articlesLoaded">
      <Article-pattern
        v-for="article in articles.articles"
        :key="article.id"
        :articleData="article"
        @showArticle="showOneArticle"
      ></Article-pattern>
    </div>

    <ShowArticle v-if="displayArticle" :id="idToDisplay"></ShowArticle>
  </div>
</template>

<script>
import ArticlePattern from "./ArticlePattern";
import ShowArticle from "./ShowArticle";

export default {
  name: "ListArticles",
  props: ["filter"],
  components: {
    ArticlePattern,
    ShowArticle,
  },
  data() {
    return {
      url: "http://localhost:3000/groupomonia/articles/list?filter=",
      articles: {},
      articlesLoaded: false,
      displayArticle: false,
      idToDisplay: "",
    };
  },

  methods: {
    showOneArticle(id) {
      this.idToDisplay = id.currentTarget.dataset.id;

      this.articlesLoaded = false;

      this.$emit("resetFilter");

      this.displayArticle = true;
    },

    async loadingList() {
      this.articlesLoaded = false;
      this.displayArticle = false;

      const token = localStorage.getItem("token");

      const response = await fetch(this.url + this.filter, {
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
          this.articles = response;
          this.articlesLoaded = true;
          console.log(this.articles)
        }
      } else {
        alert("Une erreur est survenue, veuillez réessayer.");
      }
    }
  },

  created() {
    this.loadingList();
  },

  watch: {
    filter: function () {
      if (this.filter != "") {
        this.loadingList();
      }
    },
  },
};
</script>

<style scoped>
.container {
  padding: 50px 80px;
  margin-left: 265px;
}

</style>