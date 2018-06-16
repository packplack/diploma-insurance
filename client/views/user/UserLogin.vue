<template>
    <section>

        <div v-if="!canUserLoginFormBeShown" class="card">
            <h3>Проверка доступа</h3>
            <b-form @submit="checkSecretWord">
                <b-form-group label="Секретное слово:">
                    <b-form-input 
                        type="text"
                        v-model="userInput"
                        placeholder="Введите секретное слово"
                        autocomplete="off"
                        size="lg"
                        required
                    />
                </b-form-group>
                <b-alert variant="danger" :show="!!secretWordError">{{ secretWordError }}</b-alert>
                <b-form-row>
                    <b-button size="lg" type="submit" variant="success">
                        <i class="fas fa-user-secret"></i> Проверить
                    </b-button>
                </b-form-row>
            </b-form>
        </div>

        <transition enter-active-class="fadeIn">
            <div v-if="canUserLoginFormBeShown" class="card user-login">
                <h3>Вход для сотрудников</h3>
                <b-form @submit="performLogin">
                    <b-form-group label="Email:">
                        <b-form-input 
                            type="email"
                            v-model="login.email"
                            placeholder="Введите email"
                            size="lg"
                            required
                        />
                    </b-form-group>
                    <b-form-group label="Пароль:">
                        <b-form-input 
                            type="password"
                            v-model="login.password"
                            placeholder="Введите пароль"
                            size="lg"
                            required
                        />
                    </b-form-group>
                    <b-alert variant="danger" :show="!!loginError">{{ loginError }}</b-alert>
                    <b-form-row>
                        <b-button size="lg" type="submit" variant="success">
                            <i class="fas fa-sign-in-alt"></i> Вход
                        </b-button>
                    </b-form-row>
                </b-form>
            </div>
        </transition>

    </section>
</template>

<script>
import axios from 'axios';

export default {
    data() {
        return {
            secretWord: 'диплом',
            userInput: 'диплом',
            secretWordError: null,
            canUserLoginFormBeShown: false,
            login: {
                email: 'yabelski@gmail.com',
                password: 'password'
            },
            loginError: null
        };
    },
    methods: {
        checkSecretWord(event) {
            event.preventDefault();
            this.secretWordError = null;

            if (this.userInput !== this.secretWord) {
                setTimeout(() => {
                    this.secretWordError = 'Неверное секретное слово.';
                }, 200);

                return;
            }

            this.secretWordError = null;
            this.canUserLoginFormBeShown = true;
        },
        async performLogin(event) {
            event.preventDefault();
            this.loginError = null;

            try {
                const response = await axios.post('/api/users/login', this.login);

                this.$store.commit('SAVE_USER', response.data.user);
                this.$router.push({ name: 'страховки-все' });
            } catch (error) {
                console.log(error);
                if ('error' in error.response.data) {
                    this.loginError = error.response.data.error;
                }
            }
        }
    }
};
</script>

<style lang="scss" scoped>
section {
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}

.user-login {
    width: 500px;

    form {
        width: 450px;
    }
}
</style>