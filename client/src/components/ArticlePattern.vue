<template>
  <section
    v-if="destroyComponent"
    class="container"
    :data-id="id"
    @click="(id) => $emit('showArticle', id)"
  >
    <div class="prez">
      <p class="username">{{ articleData.author }}</p>
      <p class="date">{{ dateConverted }}</p>
      <button
        v-if="isUserCanDelete"
        id="deleteButton"
        @click.stop="deleteArticle"
      >
        <i class="fas fa-times-circle"></i>
      </button>
    </div>
    <div class="content">
      <h2 class="title">{{ articleData.title }}</h2>
      <p>{{ articleData.content }}</p>
    </div>
    <div class="mentions">
      <div class="likes">
        <p class="margin-right">
          <i class="far fa-thumbs-up"></i> {{ articleData.numberOfLikes }}
        </p>
        <p>
          <i class="far fa-thumbs-down"></i> {{ articleData.numberOfDislikes }}
        </p>
      </div>
      <div class="comments">
        <p>
          <i class="far fa-comments"></i>
          {{ articleData.numberOfComments }} commentaires
        </p>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "ArticlePattern",
  props: ["articleData"],
  data() {
    return {
      id: this.articleData.id,
      isUserCanDelete: this.articleData.userCanDelete,
      destroyComponent: true,
      url: "http://localhost:3000/groupomonia/articles/delete-article?id=",
    };
  },
  computed: {
    dateConverted() {
      const monthList = {
        1: "janvier",
        2: "février",
        3: "mars",
        4: "avril",
        5: "mai",
        6: "juin",
        7: "juillet",
        8: "août",
        9: "septembre",
        10: "octobre",
        11: "novembre",
        12: "decembre",
      };

      let date = new Date(this.articleData.createdAt);
      const year = date.getFullYear();
      let month = date.getMonth();

      month = monthList[month];

      const day = date.getDate();

      date = `Publié le ${day} ${month} ${year}.`;

      return date;
    },
  },
  methods: {
    async deleteArticle() {
      if (confirm("Êtes vous sûr de vouloir supprimer l'article?")) {
        this.destroyComponent = false;
      } else {
        return;
      }

      const articleId = this.id;

      const token = localStorage.getItem("token");

      const response = await fetch(this.url + articleId, {
        headers: {
          Authorization: "Bearer " + token,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        method: "DELETE",
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
          console.log(response);
        }
      } else {
        alert("Une erreur est survenue, veuillez réessayer.");
      }
    },
  },
};
</script>

<style lang="scss" scoped>
section.container {
  position: relative;
  width: 100%;
  border: 1px solid rgba(0, 0, 0, 0.2);
  padding: 0;
  border-radius: 10px;
  transition: 0.3s;
  margin: 0px auto 50px;

  &:hover {
    cursor: pointer;
    box-shadow: 6px 6px 13px #bcbcbc, -6px -6px 13px #ffffff;
  }

  &:active {
    box-shadow: none;
  }
}

.prez {
  border-bottom: 1px solid rgba(0, 0, 0, 0.2);
  padding: 10px;
  background: #489cc1;
  color: #ffffff;
  border-radius: 10px 10px 0 0;
  display: flex;
  justify-content: space-between;
  align-items: center;

  .date {
    font-size: 12px;
  }

  #deleteButton {
    position: absolute;
    top: -10px;
    right: -10px;
    border: none;
    background: none;
    cursor: pointer;
    transition: 0.1s;

    i {
      color: rgba(0, 0, 0, 0.6);
      font-size: 20px;
      transition: 0.1s;

      &:hover {
        color: black;
        transform: scale(1.1) rotate(90deg);
      }
    }
  }
}

.content {
  padding: 10px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.2);
  box-shadow: 6px 6px 13px #bcbcbc inset;
  height: 100px;

  p {
      @media (max-width: 700px) {
        font-size: .9em;
      }
      @media (max-width: 500px) {
        font-size: .8em;
      }

    }

  .title {
    margin-bottom: 20px;
    font-weight: 500;
    font-size: 20px;
    color: black;

    @media (max-width: 700px) {
      font-size: 17px;
      margin-bottom: 15px;
    }
  }
}

.mentions {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 5px 15px;

  .likes {
    display: flex;
    align-items: center;

    .margin-right {
      margin-right: 25px;
    }
    .fa-thumbs-up {
      color: #21a87d;
    }
    .fa-thumbs-down {
      color: #ff7272;
    }
    .fa-comments {
      color: #489cc1;
    }
  }
}
</style>
