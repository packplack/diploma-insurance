<template>
    <section>
        <b-navbar toggleable="md" type="dark" variant="info">
            <b-navbar-nav>
                <b-nav-item 
                    v-for="(item, index) in currentUserAllowedNavItems"
                    :to="{ name: item.routeName }"
                    :key="index"
                >
                    <i :class="item.iconClasses"></i> {{ item.text }}
                </b-nav-item>
            </b-navbar-nav>
            <b-navbar-nav class="ml-auto">
                <b-nav-item-dropdown right>
                    <em slot="button-content">{{ userFullName }} </em>
                    <b-dropdown-item :to="{ name: 'my-profile' }">
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
    data() {
        return {
            navItems: [
                {
                    routeName: 'страховки-все',
                    iconClasses: 'far fa-list-alt',
                    text: 'Страховки'
                },
                {
                    routeName: 'пользователи-создать',
                    iconClasses: 'fas fa-user-plus',
                    text: 'Добавить сотрудника'
                },
                {
                    routeName: 'пользователи-все',
                    iconClasses: 'fas fa-users',
                    text: 'Все сотрудники'
                },
                {
                    routeName: 'страховки-статистика',
                    iconClasses: 'far fa-chart-bar',
                    text: 'Статистика'
                },
            ]
        };
    },
    computed: {
        ...mapGetters(['user', 'userFullName']),
        currentUserAllowedNavItems() {
            return this.navItems.filter(item => this.user.permissions.includes(item.routeName));
        }
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
section {
    height: 100%;
}
</style>