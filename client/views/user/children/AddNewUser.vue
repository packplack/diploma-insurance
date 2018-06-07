<template>
    <transition enter-active-class="fadeIn">
        <div class="cabinet-view">
            <div v-if="options" class="card new-user-card">

                <h3>Добавить нового сотрудника:</h3>

                <b-form @submit="createNewUser">
                    <div class="form-row">
                        <b-form-group label="Имя:">
                            <b-form-input 
                                type="text"
                                v-model="params.firstName"
                                placeholder="Введите имя"
                                size="lg"
                                required
                            />
                        </b-form-group>
                        <b-form-group label="Фамилия:">
                            <b-form-input 
                                type="text"
                                v-model="params.lastName"
                                placeholder="Введите фамилию"
                                size="lg"
                                required
                            />
                        </b-form-group>
                    </div>

                    <div class="form-row">
                        <b-form-group label="Email:">
                            <b-form-input 
                                type="email"
                                v-model="params.email"
                                placeholder="Введите email"
                                size="lg"
                                required
                            />
                        </b-form-group>
                        <b-form-group label="Телефон:">
                            <b-form-input 
                                type="text"
                                v-model="params.phoneNumber"
                                placeholder="Введите номер телефона"
                                size="lg"
                                required
                            />
                        </b-form-group>
                    </div>

                    <b-form-group label="Пароль:">
                        <b-form-input 
                            type="password"
                            v-model="params.password"
                            placeholder="Введите пароль"
                            size="lg"
                            required
                        />
                        <b-form-input 
                            type="password"
                            :style="{marginTop:'25px'}"
                            v-model="params.extraPassword"
                            placeholder="Повторите ввод пароля"
                            size="lg"
                            required
                        />
                    </b-form-group>

                    <div class="form-row">
                        <b-form-group label="Права:">
                            <b-form-checkbox-group 
                                v-model="params.permissions" 
                                :options="permissionsOptions"
                                stacked
                            />
                        </b-form-group>
                        <b-form-group label="Роль пользователя:">
                            <b-form-radio-group 
                                v-model="params.userRole" 
                                :options="userRoleOptions" 
                                stacked
                            />
                        </b-form-group>
                    </div>

                    <b-alert variant="danger" :show="!!formError">{{ formError }}</b-alert>
                    <b-alert variant="success" :show="!!formSuccess">{{ formSuccess }}</b-alert>

                    <b-form-row>
                        <b-button size="lg" type="submit" variant="success">
                            <i class="far fa-address-card"></i> Создать сотрудника
                        </b-button>
                    </b-form-row>

                </b-form>
            </div>
        </div>
    </transition>
</template>

<script>
import axios from 'axios';

export default {
    data() {
        return {
            params: {
                firstName: 'Вася',
                lastName: 'Пупкин',
                email: 'vas@gmail.com',
                phoneNumber: '375251234512',
                password: 'asd',
                extraPassword: 'asd',
                userRole: '',
                permissions: ['страховки-все']
            },
            formError: null,
            formSuccess: null,
            options: null
        };
    },
    computed: {
        userRoleOptions() {
            return this.options.userRoles.map(role => ({ text: role, value: role }));
        },
        permissionsOptions() {
            return this.options.permissions.map(action => ({ text: action, value: action }));
        }
    },
    methods: {
        async createNewUser(event) {
            event.preventDefault();
            this.formError = null;

            if (!this.params.permissions.length) {
                this.formError = 'Невозможно создать пользователя без прав.';
                return;
            }

            try {
                const response = await axios.post('/api/users/create-user', this.params);
                this.formSuccess = response.data.result;

                setTimeout(() => {
                    this.formSuccess = null;
                }, 5000);
            } catch (error) {
                if ('error' in error.response.data) {
                    this.formError = error.response.data.error;
                }
            }

        }
    },
    async created() {
        const response = await axios.get('/api/users/new-user-options');
        this.options = response.data;
        this.params.userRole = this.options.userRoles[0];
    }
}

</script>

<style lang="scss" scoped>
.new-user-card {
    width: auto;

    h3 {
        margin-bottom: 0;
    }

    form {
        width: 600px;

        .form-row {
            display: flex;
            flex-direction: row;

            * {
                margin-right: 30px;
            }
        }
    }
}
</style>