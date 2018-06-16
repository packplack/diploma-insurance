<template>
    <transition enter-active-class="fadeIn">
        <div class="cabinet-view">
            <div class="card profile-card">
                <h4>Ваш профиль:</h4>
                <user-card :user-data="customer"/>
            </div>
        </div>
    </transition>
</template>

<script>
import { mapGetters } from 'vuex';
import UserCard from '../../../components/UserCard.vue';

export default {
    components: {
        UserCard
    },
    computed: {
        ...mapGetters(['customer']),
    },
}

</script>

<style lang="scss" scoped>
.profile-card {
    width: 600px;

    h4 {
        margin-bottom: 0;
    }
}
</style>