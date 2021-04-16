<template>
<main>
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
            <div class="buttons">
                <div class="likes">
                    <button class="like"><i class="far fa-thumbs-up"></i></button>
                    <button class="dislike"><i class="far fa-thumbs-down"></i></button>
                </div>
                <div>
                    <button class="comment" id="commentButton" v-on="buttonListener">Commenter l'article</button>
                </div>
            </div>
            <textarea v-if="displayCommentInput" v-model="commentContent" placeholder="Ecrivez votre commentaire ici..."></textarea>
        </div>
    </article>
    <div v-if="showArticle">
        <div class="header-comments"><p>Commentaires: </p><div class="comments-bar"></div></div>
        <Comment-display v-for="comment in article.comments" :key="comment"></Comment-display>
    </div>
    
</main>
</template>

<script>

import CommentDisplay from './CommentDisplay'

export default {
    name: 'ShowArticle',
    props: ['id'],
    components: {
        CommentDisplay
    },
    data(){
        return {

            urlGetArticle: 'http://localhost:3000/groupomonia/articles/find?id=',
            urlSendComment: 'http://localhost:3000/groupomonia/comments/create?id=',
            article: {},
            showArticle: false,
            displayCommentInput: false,
            commentContent: '',
            commentButtonBehavior: false

        }
    },

    methods: {
        showCommentInput() {
            
            this.displayCommentInput = true;

            const commentButton = document.querySelector('.comment');

            commentButton.style.background = '#21A87D';
            commentButton.textContent = "Envoyer le commentaire";
            this.commentButtonBehavior = true;

        },

        async sendComment(){
            const form = {
                  content: this.commentContent
                };

            const id = this.id;

            const token = localStorage.getItem('token');

            const response = await fetch(this.urlSendComment + id,{headers: {
                                    'Authorization': 'Bearer ' + token,
                                    'Accept': 'application/json',
                                    'Content-Type': 'application/json'
                                },
                                    method: "POST",
                                    body: JSON.stringify(form)
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
                
                    console.error(response);

                } else {
                
                    console.log(response);
                    this.commentContent = '';
                    this.displayCommentInput = false;
                    this.commentButtonBehavior = false;
                    this.showArticle = false;
                    this.article = {};
                    this.getArticle();
                
                }
            } else {
                
                alert('Une erreur est survenue, veuillez réessayer.')

            }
        },

        async getArticle(){

            const id = this.id;

            const token = localStorage.getItem('token');

            const response = await fetch(this.urlGetArticle + id,{headers: {
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
        }
    },
   

    created() {
        this.getArticle();
    },

    computed: {


        buttonListener() {

            if(!(this.commentButtonBehavior)){
                return {click: this.showCommentInput};
            } else {
                return {click: this.sendComment}
            }

    }, 

    

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
    margin-bottom: 30px;
    border: 1px solid rgba(0, 0, 0, 0.2);
    border-radius: 10px;
}


.article-container {
    padding: 15px 15px;
    margin: 0;
}

.prez {
    margin-bottom: 20px;
    display: flex;
    justify-content: space-between;
    padding: 15px;
    border-bottom: 1px solid rgba(0, 0, 0, 0.2);
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
    flex-direction: column;
    justify-content: space-between;
    padding: 10px;
    border-top: 1px solid rgba(0, 0, 0, 0.2);
}

.buttons {
    display: flex;
    justify-content: space-between;
}

textarea {
    margin-top: 10px;
    border: none;
    border-radius: 10px;
    height: 50px;
}

textarea:focus {
    outline: none;
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

.likes .like:hover {
    background: #21A87D;
}

.likes .dislike:hover {
    background: #FF7272;
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

.header-comments {
    display: flex;
    align-items: center;
}

.comments-bar {
    width: 80%;
    height: 1px;
    border-radius: 1px;
    background: rgba(0, 0, 0, 0.2);
    margin: auto;
}




</style>
