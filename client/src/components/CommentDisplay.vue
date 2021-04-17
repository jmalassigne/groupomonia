<template>
<div class="comment-container">
    <div class="prez">
        <p class="author">De {{author}}</p>
        <p class="date">{{dateConverted}}</p>
    </div>
    <div class="content">
        <p>{{content}}</p>
    </div>
</div>
</template>

<script>

export default {
    name: 'CommentDisplay',
    props: ['author', 'content', 'date'],
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

            let date = new Date(this.date);
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

.comment-container{
    margin: 20px 0;
    border: 1px solid rgba(0, 0, 0, 0.2);
    border-radius: 10px;
}

.prez {
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid rgba(0, 0, 0, 0.2);
    padding: 10px 30px;
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