<template>
    <div v-if="users" class="users-all-view">
        <h4>Cотрудники:</h4>
        <user-card 
            v-for="(user, index) in users"
            :user-data="user"
            :key="index"
        />
    </div>
</template>

<script>
import axios from 'axios';

import UserCard from '../../../components/UserCard.vue';

export default {
    components: {
        UserCard
    },
    data() {
        return {
            users: null
        };
    },
    async created() {
        const response = await axios.get('/api/users/all');
        this.users = response.data;
    }
}

</script>

<style lang="scss" scoped>
.users-all-view {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: calc(100% - 56px);
}
</style>