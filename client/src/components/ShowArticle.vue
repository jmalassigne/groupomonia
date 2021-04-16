<template>
    <article class="container" v-if="showArticle">
        <div class="prez">
            <p class="username"> De Jean</p>
            <p class="date">{{dateConverted}}</p>
        </div>
        <div class="article-container">
            <h2>{{article.article.title}}</h2>
            <p>{{article.article.content}}</p>
        </div>
        <div class="mentions">
            <div class="likes">
                <button class="like"><i class="far fa-thumbs-up"></i></button>
                <button class="dislike"><i class="far fa-thumbs-down"></i></button>
            </div>
            <div>
                <button class="comment">Commenter l'article</button>
            </div>
        </div>
    </article>
</template>

<script>

export default {
    name: 'ShowArticle',
    props: ['id'],
    data(){
        return {

            url: 'http://localhost:3000/groupomonia/articles/find?id=',
            article: {},
            showArticle: false

        }
    },
   

    async created() {

        const id = this.id;

        const token = localStorage.getItem('token');

        const response = await fetch(this.url + id,{headers: {
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
            
            this.article = response;
            this.showArticle = true;
            console.log(this.article);
            
            }
        } else {
            
            alert('Une erreur est survenue, veuillez réessayer.')

        }
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
          12: "decembre"
      }

      let date = new Date(this.article.article.createdAt);
      const year = date.getFullYear();
      let month = date.getMonth();

      month = monthList[month];

      const day = date.getDate();

      date = `Publié le ${day} ${month} ${year}.`
      
      return date;
       
    }

  }
}

</script>

<style scoped>

.container {
    padding: 0;
}


.article-container {
    border-radius: 10px 10px 0 0;
    border: 1px solid rgba(0, 0, 0, 0.2);
    padding: 15px 15px;
    margin: 0;
}

.prez {
    margin-bottom: 20px;
    display: flex;
    justify-content: space-between;
}

.username {
    color: black;
    font-weight: 600;
    font-size: 16px;
}

.date {
    font-size: 12px;
}

h2 {
    color: black;
    font-size: 20px;
    font-weight: 600;
    margin-bottom: 20px;
}

.mentions {
    display: flex;
    justify-content: space-between;
    padding: 10px;
    border-radius: 0 0 10px 10px;
    border: 1px solid rgba(0, 0, 0, 0.2);
}

button {
    border: none;
    padding: 5px 10px;
    cursor: pointer;
}

.likes button {
    background: rgba(0, 0, 0, 0);
    margin: 0 5px;
    border-radius: 5px;
}

.likes button:hover {
    box-shadow:  6px 6px 13px #bcbcbc, -6px -6px 13px #ffffff;
}

.likes button:active {
    box-shadow: none;
}

.likes button i {
    font-size: 20px;
}

button:focus {
    outline: none;
}

.comment {
    border-radius: 5px;
    background: #489CC1;
    padding: 12px 15px;
}

.comment:hover {
    box-shadow:  6px 6px 13px #bcbcbc, -6px -6px 13px #ffffff;
}

.comment:active {
    box-shadow: none;
}



</style>
