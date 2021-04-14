<template>
    <div class="container">
        <form>
            <label for="title">Titre de l'article</label>
            <input type="text" title>
            <label for="content">Contenu de l'article</label>
            <textarea id="content"></textarea>
        </form>
    </div>
</template>

<script>
export default {
    name:'CreateArticle'
}
</script>

<style scoped>
.container {
    width: 100%;
    height: 100vh;
}

form {
    width: 80%;
    margin: 60px auto;
    display: flex;
    flex-direction: column;
}

label {
    margin-bottom: 10px;
}

input, textarea{
    border: 1px solid rgba(0, 0, 0, 0);
    border-radius: 10px;
    margin-bottom: 20px;
}

input:focus, textarea:focus {
    outline: none;
    border: 1px solid rgba(0, 0, 0, 0.2);
}

input {
    height: 20px;
}
</style>

