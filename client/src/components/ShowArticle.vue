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

                    <div class="block-button">
                        <button class="like" @click="sendLike(1)"><i class="far fa-thumbs-up"></i></button>
                        <p v-if="areThereLikesInArticle">{{article.likes.likes}}</p><p v-else>0</p>
                    </div>
                    
                    <div class="block-button">
                        <button class="dislike" @click="sendLike(0)"><i class="far fa-thumbs-down"></i></button>
                        <p v-if="areThereLikesInArticle">{{article.likes.dislikes}}</p><p v-else>0</p>
                    </div>
                    
                </div>
                <div>
                    <button class="comment" id="commentButton" v-on="buttonListener">Commenter l'article</button>
                </div>
            </div>
            <textarea v-if="displayCommentInput" v-model="commentContent" placeholder="Ecrivez votre commentaire ici..."></textarea>
        </div>
    </article>
    <div v-if="areThereCommentsInArticle">
        <div class="header-comments"><p>Commentaires: </p><div class="comments-bar"></div></div>
        <Comment-display v-for="comment in article.comments.slice().reverse()" :key="comment.date" :content="comment.content" :date="comment.createdAt" :author="comment.author"></Comment-display>
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
            urlSendLike: 'http://localhost:3000/groupomonia/likes/create?id=',
            urlDeleteLike: 'http://localhost:3000/groupomonia/likes/delete-like?id=',
            article: {},
            areThereCommentsInArticle: false,
            areThereLikesInArticle: false,
            userLikeValue: null,
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
                    this.areThereCommentsInArticle = false;
                    this.showArticle = false;
                    this.article = {};
                    this.commentContent = '';
                    this.displayCommentInput = false;
                    this.commentButtonBehavior = false;
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
                

                const articlePropertyNames = Object.getOwnPropertyNames(response);

                        
                    articlePropertyNames.forEach(key => {

                    
                    if (key === 'comments') {

                        this.areThereCommentsInArticle = true;

                    } else if (key === 'likes'){

                        this.areThereLikesInArticle = true;

                    }

                })

                
                }
            } else {
                
                alert('Une erreur est survenue, veuillez réessayer.')

            }
        },

        sendLike(value){
            
            const newValue = value;
            const currentValue = this.userLikeValue;

            if(newValue === currentValue){

                this.userLikeValue = null;
                this.deleteLike();

            } else {

                if(newValue === 0) {

                    this.userLikeValue = 0;
                    this.createLike(0);


                } else if(newValue === 1) {

                    this.userLikeValue = 1;
                    this.createLike(1);
                   
                }

            }

        },

        async createLike (value) {

            const articleId = this.id;

            const form = {likeValue: value};

            console.log(form)

            const token = localStorage.getItem('token');

            const response = await fetch(this.urlSendLike + articleId,{headers: {
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
                alert('Une erreur est survenue, veuillez réessayer.')
                } else {
                
                    console.log(response)
                
                }
            } else {
                
                alert('Une erreur est survenue, veuillez réessayer.')

            }

        },

        async deleteLike() {

            const articleId = this.id;

            const token = localStorage.getItem('token');

            const response = await fetch(this.urlDeleteLike + articleId,{headers: {
                                'Authorization': 'Bearer ' + token,
                                'Accept': 'application/json',
                                'Content-Type': 'application/json'
                            },
                                method: "DELETE"
                                
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
                
                    console.log(response)
                
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

    },

    watch: {

        areThereLikesInArticle: function() {

            const isUserAlreadyLike = this.article.likes.userLike;

            if(isUserAlreadyLike != -1){
                
                isUserAlreadyLike == 0 ? this.userLikeValue = 0 : this.userLikeValue = 1;

            }

        },

        userLikeValue: function(value) {

            this.$nextTick(() => {
                const likeButton = document.querySelector('.like');
                const dislikeButton = document.querySelector('.dislike');

                if(value === null) {

                    dislikeButton.className = 'dislike';
                    likeButton.className = 'like'
                    
                } else {
                    if(value === 0) {

                        dislikeButton.classList.add('active');
                        likeButton.className = 'like'

                    } else if (value === 1) {

                        likeButton.classList.add('active');
                        dislikeButton.className = 'dislike'

                    }

                }

            });


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

.likes {
    display: flex;
    align-items: center;
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

.block-button {
    display: flex;
    align-items: center;
}

button {
    border: none;
    padding: 5px 10px;
    cursor: pointer;
}

.likes button {
    background: rgba(0, 0, 0, 0);
    margin: 0 0 0 15px;
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

.likes .dislike.active i{
    color: #FF7272;
}

.likes .dislike.active:hover i{
    color: black;
}

.likes .like.active i{
    color: #21A87D;
}

.likes .like.active:hover i{
    color: black
    ;
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
