<template>
    <table>
        <tr>
            <td class="key-cell">Имя Фамилия:</td>
            <td>{{ getFullName }}</td>
        </tr>
        <tr>
            <td class="key-cell">Email:</td>
            <td>{{ userData.email }}</td>
        </tr>
        <tr>
            <td class="key-cell">Номер телефона:</td>
            <td>{{ userData.phoneNumber }}</td>
        </tr>
        <tr v-if="'userRole' in userData">
            <td class="key-cell">Роль пользователя:</td>
            <td>{{ userData.userRole }}</td>
        </tr>
        <tr v-if="'permissions' in userData">
            <td class="key-cell">Права:</td>
            <td>
                <div class="permissions">
                    <b-badge 
                        v-for="(action, index) in userData.permissions"
                        variant="info"
                        :key="index"
                    >
                        {{ action }}
                    </b-badge>
                </div>
            </td>
        </tr>
    </table>
</template>

<script>
export default {
    props: {
        userData: {
            type: Object,
            required: true
        }
    },
    computed: {
        getFullName() {
            return `${this.userData.firstName} ${this.userData.lastName}`;
        }
    }
}

</script>

<style lang="scss" scoped>
table {
    td {
        border: 1px solid black;
        padding: 15px 20px;
        text-align: center;
        background-color: #fff;
    }

    .key-cell {
        background-color: #9ce9f4;
        font-weight: 600;
    }

    .permissions {
        display: flex;
        flex-direction: column;
    }
}
</style>

<style lang="scss">
.badge {
    font-size: 15px;
    padding: 10px;
    margin: 5px;
    font-weight: 400;
}
</style>
