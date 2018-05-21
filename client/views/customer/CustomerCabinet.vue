<template>
    <section>
        <b-navbar toggleable="md" type="dark" variant="info">
            <b-navbar-nav>
                <b-nav-item :to="{ name: 'customer-my-insurances' }">
                    <i class="far fa-list-alt"></i> Мои страховки
                </b-nav-item>
                <b-nav-item :to="{ name: 'customer-new-insurance' }">
                    <i class="fas fa-cart-plus"></i> Новая страховка
                </b-nav-item>
            </b-navbar-nav>
            <b-navbar-nav class="ml-auto">
                <b-nav-item-dropdown right>
                    <em slot="button-content">{{ customerFullName }} </em>
                    <b-dropdown-item :to="{ name: 'customer-my-profile' }">
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
        ...mapGetters(['customer', 'customerFullName']),
    },
    methods: {
        async logout() {
            try {
                const response = await axios.get('/api/customers/logout');
            } catch (error) {
                console.log(error);
            }
            this.$store.commit('RESET_CUSTOMER');
            this.$router.push({ name: 'index' });
        }
    }
};
</script>

<style lang="scss" scoped>

</style>