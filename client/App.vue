<template>
    <main>
        <!-- <b-navbar toggleable="md" type="light" variant="info">
            <img src="./img/app-icon.png" alt="">
            <b-navbar-brand  class="" href="/">БЕЛСК-СТРАХ</b-navbar-brand>
        </b-navbar> -->
        <router-view/>
    </main>
</template>

<script>
export default {

}
</script>

<style lang="scss">
body {
    display: flex;
    background: url('./img/pattern.png');
    font-family: 'Roboto', sans-serif;
}

main {
    width: 100%;
}
</style>