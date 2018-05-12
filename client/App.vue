<template>
    <main>
        <router-view/>
    </main>
</template>

<script>
export default {
    created() {
        this.$store.commit('GET_USER_FROM_LOCALE_STORAGE');
        this.$store.commit('GET_CUSTOMER_FROM_LOCALE_STORAGE');
    }
};
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