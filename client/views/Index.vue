<template>
    <section>
        <h2 class="slogan">Поможем с <b>любым</b> видом страхования:</h2>
        <div class="cards-group">
            <div class="card way-card auto">
                <i class="fas fa-car"></i>
                <h3>Авто</h3>
                <p>
                    Страхование автомобиля позволит защититься от непредвиденных потерь в результате аварии, угона или собственной ошибки на дороге. Полис дает возможность возместить расходы на ремонт. Застраховать машину – значит, максимально защитить себя от рисков.
                </p>
            </div>
            <div class="card way-card home">
                <i class="fas fa-home"></i>
                <h3>Жильё</h3>
                <p>
                    Для большинства жильцов предположения, связанные с черезвычайными ситуациями дома, кажутся не более чем излишней предусмотрительностью. Однако эти риски реально существуют и актуальны для каждого.
                </p>
            </div>
            <div class="card way-card health">
                <i class="fas fa-heartbeat"></i>
                <h3>Здоровье</h3>
                <p>
                    Жизнь человека полна неожиданностей, в том числе и неприятных. Медицинское страхование поможет справиться с любой подобной ситуацией легко и без ощутимых материальных вложений.
                </p>
            </div>
        </div>
        <h2 class="slogan">Преимущество выбора <b>нашей комании</b>:</h2>
        <div class="cards-group">
            <div class="card select-card reliability">
                <i class="fas fa-chess-rook"></i>
                <h3>Надёжность</h3>
            </div>
            <div class="card select-card skill">
                <i class="fas fa-user-tie"></i>
                <h3>Проффесионализм</h3>
            </div>
            <div class="card select-card sales">
                <i class="fas fa-percent"></i>
                <h3>Скидки и акции</h3>
            </div>
        </div>
        <h2 class="slogan">Начните пользоваться <b>прямо сейчас</b>:</h2>
        <div class="cards-group action-cards">
            <div class="card">
                <h3>Зарегистрируйтесь</h3>
                <b-form  class="login-form" @submit="performRegister">
                    <b-form-group label="Имя:">
                        <b-form-input 
                            type="text"
                            v-model="register.firstName"
                            placeholder="Введите имя"
                            size="lg"
                            required
                        />
                    </b-form-group>
                    <b-form-group label="Фамилия:">
                        <b-form-input 
                            type="text"
                            v-model="register.lastName"
                            placeholder="Введите фамилию"
                            size="lg"
                            required
                        />
                    </b-form-group>
                    <b-form-group label="Email:">
                        <b-form-input 
                            type="email"
                            v-model="register.email"
                            placeholder="Введите email"
                            size="lg"
                            required
                        />
                    </b-form-group>
                    <b-form-group label="Телефон:">
                        <b-form-input 
                            type="text"
                            v-model="register.phoneNumber"
                            placeholder="Введите номер телефона"
                            size="lg"
                            required
                        />
                    </b-form-group>
                    <b-form-group label="Пароль:">
                        <b-form-input 
                            type="password"
                            v-model="register.password"
                            placeholder="Введите пароль"
                            size="lg"
                            required
                        />
                        <b-form-input 
                            type="password"
                            :style="{marginTop:'25px'}"
                            v-model="register.extraPassword"
                            placeholder="Повторите ввод пароля"
                            size="lg"
                            required
                        />
                    </b-form-group>
                    <b-form-row>
                        <b-button size="lg" type="submit" variant="primary">Зарегистрироваться</b-button>
                    </b-form-row>
                </b-form>
            </div>
            <div class="card">
                <h3>Войдите в личный кабинет</h3>
                <b-form  class="login-form" @submit="performLogin">
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
                    <b-form-row>
                        <b-button size="lg" type="submit" variant="success">Вход</b-button>
                    </b-form-row>
                </b-form>
            </div>
        </div>
    </section>
</template>

<script>
import axios from 'axios';

export default {
    data() {
        return {
            login: {
                email: '',
                password: ''
            },
            register: {
                firstName: 'e',
                lastName: 'z',
                email: 'ez@gmail.com',
                phoneNumber: '12345',
                password: 'asd',
                extraPassword: 'asd'
            }
        };
    },
    methods: {
        performRegister(event) {
            event.preventDefault();
            
            if (this.register.password === this.register.extraPassword) {
                axios
                    .post('/api/customers/register', this.register)
                    .then((res) => {
                        console.log(res)
                    })
            }
        },
        performLogin() {

        }
    }
};

</script>

<style lang="scss" scoped>
section {
    padding-bottom: 50px;
}

.slogan {
    font-weight: 100;
    font-size: 45px;
    margin: 75px 0;
    text-align: center;
}

.way-card.auto {
    i, h3 {
        color: #736CED;
    }
}

.way-card.home {
    i, h3 {
        color: #63D471;
    }
}

.way-card.health {
    i, h3 {
        color: #E07A5F;
    }
}

.select-card.reliability {
    i, h3 {
        color: #4BA3C3;
    }
}

.select-card.skill {
    i, h3 {
        color: #EAC435;
    }
}

.select-card.sales {
    i, h3 {
        color: #97679D;
    }
}

.login-form {
    width: 400px;
}

.action-cards {
    align-items: flex-start;

    .card {
        width: 600px;
    }
}
</style>