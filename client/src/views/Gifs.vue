<template>
    <div>
        <Header></Header>
        <main class="container">
            <article>
                <h2>
                   En cours de développement
                </h2>
                <div class="bar-container">
                    <div class="bar"></div>
                </div>
            </article>
        </main>
    </div>
</template>

<script>
import Header from '../components/Header'

export default ({
    name: 'Gifs',
    components: {
        Header
    }
})
</script>

<style scoped>
.container {
    padding: 150px;
    background: linear-gradient(145deg, #f0f0f0, #FAFAFA);
    height: calc(100vh - 300px);
    display: flex;
    justify-content: center;
    align-items: center;
}

h2 {
    font-size: 30px;
}

.bar-container {
    position: relative;
    margin-top: 10px;
    height: 10px;
    width: 100%;
}

.bar {
    position: absolute;
    left:0;
    width: 20%;
    height: 100%;
    border-radius: 5px;
    background: rgba(0, 0, 0, 0.5);
    animation: slide 3s cubic-bezier(0.82, 0.51, 0.15, 0.57) infinite;
}

@keyframes slide {
    0% {
        transform: translateX(0)
    }
    50% {
        transform: translateX(400%)
    }
    100% {
        transform: translateX(0)
    }
}


</style>
