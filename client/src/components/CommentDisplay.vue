<template>
<section class="comment-container">
    <div class="prez">
        <p class="author">De {{author}}</p>
        <p class="date">{{dateConverted}}</p>
        <button
        v-if="isUserCanDelete"
        id="deleteButton"
        @click="deleteComment">
            <i class="fas fa-times-circle"></i>
        </button>
    </div>
    <div class="content">
        <p>{{content}}</p>
    </div>
</section>
</template>

<script>
export default {
  name: "CommentDisplay",
  props: ["author", "content", "date", "userCanDelete", "id"],
  data(){

      return {
          isUserCanDelete: this.userCanDelete
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
        12: "decembre",
      };

      let date = new Date(this.date);
      const year = date.getFullYear();
      let month = date.getMonth();

      month = monthList[month];

      const day = date.getDate();

      date = `Publié le ${day} ${month} ${year}.`;

      return date;
    },
  },
  methods: {
      deleteComment(){

          if(!confirm('Voulez vous vraiment supprimer le commentaire?')){
            return;   
          }

          this.$emit('deleteComment', this.id)
     }
  }
};
</script>

<style scoped>
.comment-container {
  margin: 20px 0;
  border: 1px solid rgba(0, 0, 0, 0.2);
  border-radius: 10px;
}

.prez {
  display: flex;
  position: relative;
  justify-content: space-between;
  border-bottom: 1px solid rgba(0, 0, 0, 0.2);
  padding: 10px 30px;
}

#deleteButton {
  position: absolute;
  top: -10px;
  right: -10px;
  border: none;
  background: none;
  cursor: pointer;
  transition: 0.1s;
}

#deleteButton i {
  color: rgba(0, 0, 0, 0.7);
  font-size: 20px;
  transition: 0.1s;
}

#deleteButton i:hover {
  color: black;
  transform: scale(1.1) rotate(90deg);
}

.author {
  color: black;
}

.date {
  font-size: 12px;
}

.content {
  padding: 10px 30px;
  font-size: 13px;
}
</style>