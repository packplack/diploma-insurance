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
            <td>{{ userData.phoneNumber || userData.phone_number }}</td>
        </tr>
        <tr>
            <td class="key-cell">Роль пользователя:</td>
            <td>{{ userData.userRole || userData.user_role }}</td>
        </tr>
        <tr>
            <td class="key-cell">Права:</td>
            <td class="permissions-cell">
                <b-badge 
                    v-for="(action, index) in userData.permissions"
                    variant="info"
                    :key="index"
                >
                    {{ action }}
                </b-badge>
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
            return `${this.userData.firstName || this.userData.first_name} ${this.userData.lastName || this.userData.last_name}`;
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
    }

    .key-cell {
        background-color: #9ce9f4;
        font-weight: 600;
    }
}
</style>

<style lang="scss">
.badge {
    font-size: 15px;
    padding: 10px;
    margin: 5px;
}
</style>
