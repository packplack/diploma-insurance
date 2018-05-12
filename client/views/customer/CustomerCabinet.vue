<template>
    <section>
        <b-navbar toggleable="md" type="dark" variant="info">
            <b-navbar-nav>
                <b-nav-item active>
                    <i class="far fa-list-alt"></i> Мои страховки
                </b-nav-item>
                <b-nav-item>
                    <i class="fas fa-cart-plus"></i> Новая страховка
                </b-nav-item>
            </b-navbar-nav>
            <b-navbar-nav class="ml-auto">
                <b-nav-item-dropdown right>
                    <em slot="button-content">{{ customerFullName }}  </em>
                    <b-dropdown-item href="#">
                        <i class="fas fa-id-card"></i> Профиль
                    </b-dropdown-item>
                    <b-dropdown-item href="#">
                        <i class="fas fa-sign-out-alt"></i> Выйти
                    </b-dropdown-item>
                </b-nav-item-dropdown>
            </b-navbar-nav>
        </b-navbar>
    </section>
</template>

<script>
import axios from 'axios';
import { mapGetters } from 'vuex';

export default {
    computed: {
        ...mapGetters(['customer', 'customerFullName']),
    },
    async created() {
        const response = await axios.get('/api/customers/get-my-insurances');
        console.log(response);
    }
};
</script>

<style lang="scss" scoped>

</style>