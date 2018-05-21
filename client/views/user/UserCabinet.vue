<template>
    <section>
        <b-navbar toggleable="md" type="dark" variant="info">
            <b-navbar-nav>
                <b-nav-item :to="{ name: 'user-insurances' }">
                    <i class="far fa-list-alt"></i> Страховки
                </b-nav-item>
                <b-nav-item :to="{ name: 'user-add-new-user' }">
                    <i class="fas fa-user-plus"></i> Добавить сотрудника
                </b-nav-item>
                <b-nav-item :to="{ name: 'user-all-users' }">
                    <i class="fas fa-users"></i> Все сотрудники
                </b-nav-item>
                <b-nav-item :to="{ name: 'user-stats' }">
                    <i class="far fa-chart-bar"></i> Статистика
                </b-nav-item>
            </b-navbar-nav>
            <b-navbar-nav class="ml-auto">
                <b-nav-item-dropdown right>
                    <em slot="button-content">{{ userFullName }} </em>
                    <b-dropdown-item :to="{ name: 'user-my-profile' }">
                        <i class="fas fa-id-card"></i> Профиль
                    </b-dropdown-item>
                    <b-dropdown-item @click="logout">
                        <i class="fas fa-sign-out-alt"></i> Выйти
                    </b-dropdown-item>
                </b-nav-item-dropdown>
            </b-navbar-nav>
        </b-navbar>
        <router-view />
    </section>
</template>

<script>
import axios from 'axios';
import { mapGetters } from 'vuex';

export default {
    computed: {
        ...mapGetters(['user', 'userFullName']),
    },
    methods: {
        async logout() {
            try {
                const response = await axios.get('/api/users/logout');
            } catch (error) {
                console.log(error);
            }
            this.$store.commit('RESET_USER');
            this.$router.push({ name: 'user-login' });
        }
    }
};
</script>

<style lang="scss" scoped>

</style>