<template>
    <article class="container">
      <div class="username">
        <p>{{articleData.id}}</p>
      </div>
      <div class="content">
        <p>{{articleData.content}}</p>
      </div>
      <div class="mentions">
        <div class="like">
          <p><i class="far fa-thumbs-up"></i>2</p>
          <p><i class="far fa-thumbs-down"></i>3</p>
        </div>
        <div class="comments">
          <p><i class="far fa-comments"></i>10 commentaires</p>
        </div>
      </div>
    </article>
</template>

<script>

export default {

  name: 'ArticlePattern',
  props: ['articleData']
   
}
</script>
