<template>
  <div>
    <Header></Header>
    <main v-if="dataReceived" class="container">
      <article class="article">
        <section class="bloc">
          <h2 class="title">Informations du compte:</h2>
          <div class="underline"></div>
          <p>
            Nom d'utilisateur:
            <span class="data">{{ userData.user.username }}</span>
          </p>
          <p>
            E-mail: <span class="data">{{ userData.user.email }}</span>
          </p>
          <p>
            Date d'inscription:
            <span class="data"
              >Le {{ dateConverted(userData.user.createdAt) }}</span
            >
          </p>
          <p>
            Compte administrateur:
            <span class="data">{{ adminValue }}</span>
          </p>
        </section>
        <section class="bloc">
          <h2 class="title">Activités du compte:</h2>
          <div class="underline"></div>
          <p>
            Nombre d'articles:
            <span class="data"
              >Vous avez publié {{ userData.numberOfArticles }} articles.</span
            >
          </p>
          <p>
            Nombre de commentaires:
            <span class="data"
              >Vous avez publié
              {{ userData.numberOfComments }} commentaires.</span
            >
          </p>
          <p>
            Dernier article:
            <span v-if="isThereArticleToDisplay" class="data"
              >Publié le
              {{ dateConverted(userData.lastArticle.createdAt) }}.</span
            >
            <span v-else class="data"
              >Vous n'avez pas encore publié d'article.</span
            >
          </p>
          <p>
            Dernier commentaire:
            <span v-if="isThereCommentToDisplay" class="data"
              >Publié le
              {{ dateConverted(userData.lastComment.createdAt) }}.</span
            >
            <span v-else class="data"
              >Vous n'avez pas encore publié de commentaire.</span
            >
          </p>
        </section>
        <button
          @click="deleteUser"
          class="deleteButton"
          v-if="!userData.user.isAdmin"
        >
          Supprimer mon compte
        </button>
      </article>
    </main>
  </div>
</template>

<script>
import Header from "../components/Header";
import Router from "../router/index";

export default {
  name: "Settings",
  components: { Header },
  data() {
    return {
      urlGetUser: "http://localhost:3000/groupomonia/users/get-user",
      urlDeleteUser: "http://localhost:3000/groupomonia/users/delete-account",
      userData: {
        user: {},
        lastComment: null,
        lastArticle: null,
        numberOfComments: 0,
        numberOfArticles: 0,
      },
      dataReceived: false,
      isThereCommentToDisplay: false,
      isThereArticleToDisplay: false,
    };
  },
  methods: {
    async getUserData() {
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
          this.assignDataInUserData(response.dataToSend);
        }
      } else {
        alert("Une erreur est survenue, veuillez réessayer.");
      }
    },
    assignDataInUserData(data) {
      this.userData.user = data.user;
      this.userData.numberOfComments = data.numberOfComments;
      this.userData.numberOfArticles = data.numberOfArticles;

      const dataPropertyNames = Object.getOwnPropertyNames(data);

      dataPropertyNames.forEach((property) => {
        if (property === "lastArticle") {
          this.userData.lastArticle = data.lastArticle;
          this.isThereArticleToDisplay = true;
        }

        if (property === "lastComment") {
          this.userData.lastComment = data.lastComment;
          this.isThereCommentToDisplay = true;
        }
      });

      this.dataReceived = true;
    },
    async deleteUser() {
      if (!confirm("Etes vous sûr de vouloir supprimer votre compte?")) {
        return;
      }

      const token = localStorage.getItem("token");

      const response = await fetch(this.urlDeleteUser, {
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
          }
          if (res.status === 204) {
            return res.json();
          }
        })
        .catch(function () {
          return false;
        });

      if (response === 500) {
        alert("Une erreur est survenue, veuillez réessayer.");
      } else {
        localStorage.removeItem("token");
        Router.push("/");
      }
    },
  },
  computed: {
    adminValue() {
      return this.userData.user.isAdmin ? "Oui" : "Non";
    },
    dateConverted() {
      return (target) => {
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

        let date = new Date(target);

        const year = date.getFullYear();
        let month = date.getMonth();

        month = monthList[month];

        const day = date.getDate();

        date = `${day} ${month} ${year}`;

        return date;
      };
    },
  },
  created() {
    this.getUserData();
  },
};
</script>

<style lang="scss" scoped>
.container {
  padding: 130px 250px 0;
  height: calc(100vh - 130px);
  background: linear-gradient(145deg, #f0f0f0, #fafafa);

  @media (max-width: 1210px) {
    padding: 80px 100px 0;
  }

  @media (max-width: 890px) {
    padding: 80px 10px 0;
  }
}

.article {
  border: 1px solid rgba(0, 0, 0, 0.2);
  border-radius: 5px 20px;
  padding: 30px;
}

.bloc {
  margin-bottom: 50px;
}

.title {
  font-size: 20px;
  color: black;

  @media (max-width: 700px) {
    font-size: 16px;
  }
}

.underline {
  height: 2px;
  width: 90%;
  background-color: rgba(0, 0, 0, 0.2);
  margin: 10px 0 20px;
}

p {
  display: flex;
  justify-content: space-between;
  width: 90%;
  font-size: 18px;
  margin-bottom: 20px;
  color: black;

  @media (max-width: 700px) {
    font-size: 15px;
  }
}

.data {
  font-size: 16px;
  color: #5e5858;
  text-align: right;

  @media (max-width: 700px) {
    font-size: 14px;
  }
}

.deleteButton {
  display: block;
  margin: auto;
  padding: 10px 15px;
  color: #5e5858;
  font-weight: 700;
  text-decoration: none;
  border-radius: 13px;
  background: linear-gradient(145deg, #f0f0f0, #fafafa);
  box-shadow: 6px 6px 13px #bcbcbc, -6px -6px 13px #ffffff;
  background: #ff7272;
  border: none;
  font-size: 17px;
  transition: 0.3s;
}

.deleteButton:hover {
  border-radius: 13px;
  box-shadow: 7px 7px 15px #a8a8a8, -7px -7px 15px #ffffff;
  background: #ff7272;
  cursor: pointer;
  color: black;
}
</style>