<template>
  <div>
    <Header></Header>
    <main>
      <aside>
        <button @click.prevent="toggle('create')" class="margin-bottom">
          <i class="fas fa-plus-square"></i>Nouvel article
        </button>
        <div class="bar"></div>
        <div class="search-articles">
          <button @click.prevent="toggle('recents')">
            <i class="far fa-newspaper"></i>Articles les plus récents
          </button>
          <button @click.prevent="toggle('liked')">
            <i class="far fa-thumbs-up"></i>Articles les mieux notés
          </button>
          <button @click.prevent="toggle('commented')">
            <i class="far fa-comments"></i>Articles les plus commentés
          </button>
        </div>
      </aside>
      <CreateArticle v-if="showCreateArticle"></CreateArticle>
      <ListArticles
        v-if="showListArticles"
        :filter="filter"
        @resetFilter="rstFilter()"
      ></ListArticles>
    </main>
  </div>
</template>

<script>
import Header from "../components/Header";
import CreateArticle from "../components/CreateArticle";
import ListArticles from "../components/ListArticles";

export default {
  name: "Thread",
  components: {
    Header,
    CreateArticle,
    ListArticles,
  },
  data() {
    return {
      showCreateArticle: true,
      showListArticles: false,
      filter: "",
    };
  },

  methods: {
    rstFilter() {
      this.filter = "";
    },

    toggle(target) {
      switch (target) {
        case "create":
          this.showCreateArticle = true;
          this.showListArticles = false;
          this.filter = "";

          break;

        case "recents":
          this.showCreateArticle = false;
          this.showListArticles = true;
          this.filter = "recents";

          break;

        case "commented":
          this.showCreateArticle = false;
          this.showListArticles = true;
          this.filter = "commented";

          break;

        case "liked":
          this.showCreateArticle = false;
          this.showListArticles = true;
          this.filter = "liked";

          break;

        default:
          break;
      }
    },
  },
};
</script>

<style scoped lang="scss">
@import "../styles/_variables.scss";

main {
  background: $background fixed;
  padding-top: 80px;
  width: 100%;
  height: calc(100vh - 80px);

  @media (max-width: 1000px) {
    height: calc(100vh - 60px);
    padding-top: 60px;
  }
}

aside {
  position: fixed;
  height: 100vh;
  width: 250px;
  padding: 30px 0 20px 15px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  border-right: 1px solid rgba(0, 0, 0, 0.2);

  @media (max-width: 1000px) {
    width: 200px;
  }

  @media (max-width: 850px) {
    position: absolute;
    top: 60px;
    left: 0;
    right: 0;
    height: 60px;
    width: 100%;
    flex-direction: row;
    align-items: center;
    justify-content: space-around;
    padding: 0;
  }

  .bar {
    display: inline-block;
    width: 80%;
    height: 1px;
    border-radius: 1px;
    background: rgba(0, 0, 0, 0.2);

    @media (max-width: 850px) {
      display: none;
    }
  }

  button {
    display: flex;
    border: none;
    background-color: rgba(0, 0, 0, 0);
    width: 190px;
    text-align: left;
    margin: 3px 0;
    font-size: 13px;
    padding: 10px 12px;
    border-radius: 10px;
    transition: 0.3s;

    @media (max-width: 850px) {
      padding: 5px;
      align-items: center;
      width: 130px;
      font-size: 0.7em;
      margin-right: 5px;
    }

    @media (max-width: 580px) {
      width: 110px;
    }

    &:hover {
      background: #21a87d;
      box-shadow: 6px 6px 13px #bcbcbc, -6px -6px 13px #ffffff;
    }
    &:focus {
      outline: none;
    }
    &:focus {
      background: $green;
      box-shadow: none;
    }
    i {
      margin-right: 10px;
    }
  }
  .margin-bottom {
    margin-bottom: 20px;

    @media (max-width: 850px) {
      margin: 0;
    }
  }
  .search-articles {
    margin-top: 15px;

    @media (max-width: 850px) {
      display: flex;
      margin-top: 0;
    }

    button:hover {
      background: $blue;
      box-shadow: 6px 6px 13px #bcbcbc;
    }
    button:focus {
      background: $blue;
    }
  }
}
</style>