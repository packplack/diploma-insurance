<template>
    <transition enter-active-class="fadeIn">
        <div v-if="users" class="cabinet-view">
            <div class="card users-card">
                <h4>Cотрудники:</h4>
                <vuetable 
                    :api-mode="false"
                    :data="users"
                    :fields="tableFields"
                    class="table table-striped vuetalbe"
                >
                    <template slot="permissions" slot-scope="props">
                        <div class="permissions">
                            <b-badge 
                                v-for="(action, index) in props.rowData.permissions"
                                variant="info"
                                :key="index"
                            >
                                {{ action }}
                            </b-badge>
                        </div>
                    </template>
                </vuetable>
            </div>
        </div>
    </transition>
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
            users: null,
            tableFields: [
                { title: 'Имя Фамилия', name: 'full_name' },
                { title: 'Email', name: 'email' },
                { title: 'Номер телефона', name: 'phone_number' },
                { title: 'Роль', name: 'user_role' },
                { title: 'Права', name: '__slot:permissions' },
                { title: 'Кем создан', name: 'created_by_full_name' },
                { title: 'Дата создания', name: 'created_at' },
            ]
        };
    },
    async created() {
        const response = await axios.get('/api/users/all-users');
        this.users = response.data.sort((left, right) => right.permissions.length - left.permissions.length);
    }
}

</script>

<style lang="scss">

.vuetalbe {
    width: 100% !important;
    background-color: #fff !important;
    text-align: center;
    vertical-align: center;

    td, th {
        border: 1px solid black !important;
    }
}

.badge {
    font-size: 15px;
    padding: 10px;
    margin: 5px;
    font-weight: 400;
}
</style>


<style lang="scss" scoped>
.users-card {
    width: 80%;
    padding-left: 20px;
    padding-right: 20px;

    h4 {
        margin-bottom: 0;
    }
}
</style>
