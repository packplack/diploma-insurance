<template>
    <div class="user-profile-view">
        <h4>Ваш профиль:</h4>
        <user-card :user-data="user"/>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';
import UserCard from '../../../components/UserCard.vue';

export default {
    components: {
        UserCard
    },
    computed: {
        ...mapGetters(['user']),
    },
}

</script>

<style lang="scss" scoped>
.user-profile-view {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: calc(100% - 56px);
}
</style>