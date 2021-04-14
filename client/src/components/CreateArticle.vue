<template>
    <div class="container">
        <form>
            <label for="title">Titre de l'article <span id="first-span" class="little">(Entre 5 et 50 caractères)</span></label>
            <input type="text" id="title" v-model="form.title" @blur="controlInput($event)">
            <label for="content">Contenu de l'article <span id="second-span" class="little">(Min. 50 caractères)</span></label>
            <textarea id="content" v-model="form.content" @blur="controlInput($event)"></textarea>
            <button @click.prevent="submitForm">Envoyer</button>
        </form>
    </div>
</template>

<script>
export default {
    name:'CreateArticle',
    data() {
        return {
            url: 'http://localhost:3000/groupomonia/articles/create',
            form: {
                title: '',
                content:''
                }
        }
    },

    methods: {

        controlInput(e) {
            const target = e.currentTarget.id;

            if(target === 'title'){

                if(5 < this.form.title.length && this.form.title.length < 50){

                    const span = document.getElementById('first-span');
                    span.style.color = "#5e5858";
                    span.style.fontSize = "10px";

                } else {

                    const span = document.getElementById('first-span');
                    span.style.color = "red";
                    span.style.fontSize = "13px";

                }

            } else if (target === 'content') {

                if(50 < this.form.content.length){

                    const span = document.getElementById('second-span');
                    span.style.color = "#5e5858";
                    span.style.fontSize = "10px";

                } else {

                    const span = document.getElementById('second-span');
                    span.style.color = "red";
                    span.style.fontSize = "13px";

                }

            }

        },

        submitForm(){

            if(5 < this.form.title.length && this.form.title.length < 50 && 50 < this.form.content.length){

                this.sendForm();
                
            } else {

                if(!(5 < this.form.title.length && this.form.title.length < 50)){

                    const form = document.querySelector('form');

                    const warning = document.createElement('p');
                    warning.textContent = 'Le titre doit contenir entre 5 et 50 caractères.';

                    warning.style.color = "#FF7272";
                    warning.style.margin = "10px auto 0 auto";

                    form.appendChild(warning);

                    setTimeout(() => {
                        form.removeChild(warning);
                    }, 2000);

                    
                } else {
                    
                    const form = document.querySelector('form');

                    const warning = document.createElement('p');
                    warning.textContent = 'L\'article doit contenir plus de 50 caractères.';

                    warning.style.color = "#FF7272";
                    warning.style.margin = "10px auto 0 auto";

                    form.appendChild(warning);

                    setTimeout(() => {
                        form.removeChild(warning);
                    }, 2000);

                }

            }

        },

        async sendForm(){

            const token = localStorage.getItem('token');
            
            const form = {
                  title: this.form.title,
                  content: this.form.content
                }

            const response = await fetch(this.url,{headers: {
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
        if(response === 400) {

            const form = document.querySelector('form');

            const warning = document.createElement('p');
            warning.textContent = 'Un probléme est survenue, veuillez réessayer.';

            warning.style.color = "#FF7272";
            warning.style.margin = "10px auto 0 auto";

            form.appendChild(warning);

            setTimeout(() => {
                form.removeChild(warning);
            }, 2000);
          
        } else {
          console.log(response);

           const form = document.querySelector('form');

            const warning = document.createElement('p');
            warning.textContent = 'Votre article a été pris en compte.';

            warning.style.color = "#21A87D";
            warning.style.margin = "10px auto 0 auto";

            form.appendChild(warning);

            setTimeout(() => {
                form.removeChild(warning);
            }, 2000);

        }
      } else {
        
        alert('Une erreur est survenue, veuillez réessayer.')

      }


        }
       
    }
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

.little {
    font-size: 10px;
    transition: 0.3s;
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

textarea {
    height: 300px;
}

button {
  width: 100px;
  margin: 0 auto;
  border: none;
  padding: 15px 20px;
  color: #5e5858;
  font-weight: 700;
  border-radius: 13px;
  background: linear-gradient(145deg, #f0f0f0, #FAFAFA);
  box-shadow:  6px 6px 13px #bcbcbc, -6px -6px 13px #ffffff;
  transition: 0.3s;
}

button:hover {
  background: #21A87D;
  box-shadow:  6px 6px 13px #bcbcbc, -6px -6px 13px #ffffff;
}

button:focus {
  outline: none;
  background: #21A87D;
  box-shadow: none;
}
</style>

