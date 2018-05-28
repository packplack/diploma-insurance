<template>
    <transition enter-active-class="fadeIn">
        <div class="cabinet-view">

            <div class="card type-card">
                <h3>Что Вы желаете застраховать?</h3>

                <b-form-radio-group v-model="type" class="insurance-radio-type">
                    <b-form-radio value="car" class="car"><i class="fas fa-car"></i> авто</b-form-radio>
                    <b-form-radio value="home" class="home"><i class="fas fa-home"></i> жильё</b-form-radio>
                    <b-form-radio value="health" class="health"><i class="fas fa-heartbeat"></i> здоровье</b-form-radio>
                </b-form-radio-group>
            </div>

            <div v-if="type === 'car'" class="card">
                <h3>Страхование автомобиля:</h3>

                <b-form @submit="createNewInsurance">
                    <b-form-group label="Тип автостраховки:">
                        <b-form-radio-group v-model="params.car.insuranceType" :options="options.car.insuranceType"/>
                    </b-form-group>
                    <b-form-group label="Кузов автомобиля:">
                        <b-form-radio-group v-model="params.car.bodyType" :options="options.car.bodyType"/>
                    </b-form-group>

                    <div class="form-row">
                        <b-form-group label="Марка производителя:">
                            <b-form-input 
                                type="text"
                                v-model="params.car.manufacturer"
                                placeholder="Введите марку"
                                size="md"
                                required
                            />
                        </b-form-group>

                        <b-form-group label="Модель автомобиля:">
                            <b-form-input 
                                type="text"
                                v-model="params.car.model"
                                placeholder="Введите модель"
                                size="md"
                                required
                            />
                        </b-form-group>
                    </div>

                    <div class="form-row">
                        <b-form-group label="Год выпуска:">
                            <b-form-input 
                                type="number"
                                v-model="params.car.year"
                                placeholder="Введите год"
                                size="md"
                                required
                            />
                        </b-form-group>

                        <b-form-group label="Объем двигателя:">
                            <b-form-input 
                                type="number"
                                v-model="params.car.engineVolume"
                                placeholder="Введите объем"
                                size="md"
                                required
                            />
                        </b-form-group>
                    </div>

                    <b-form-group label="Максимальная страховая выплата:">
                        <b-form-input 
                            type="number"
                            v-model="params.car.maxPayout"
                            placeholder="Введите выплату"
                            size="md"
                            required
                        />
                    </b-form-group>

                    <b-form-row>
                        <b-button size="lg" type="submit" variant="success">
                            <i class="far fa-envelope-open"></i> Создать запрос на страховку
                        </b-button>
                    </b-form-row>

                </b-form>

            </div>

            <div v-if="type === 'home'" class="card">
                <h3>Страхование жилья:</h3>

                <b-form @submit="createNewInsurance">
                    <b-form-group label="Регион:">
                        <b-form-select v-model="params.home.region" :options="options.home.region"/>
                    </b-form-group>
                    <b-form-group label="Тип строения:">
                        <b-form-radio-group v-model="params.home.buildingType" :options="options.home.buildingType"/>
                    </b-form-group>

                    <div class="form-row">
                        <b-form-group label="Количество проживающих:">
                            <b-form-input 
                                type="number"
                                v-model="params.home.peopleAmount"
                                placeholder="Введите количество"
                                size="md"
                                required
                            />
                        </b-form-group>

                        <b-form-group label="Площадь (кв. м):">
                            <b-form-input 
                                type="number"
                                v-model="params.home.area"
                                placeholder="Введите площадь"
                                size="md"
                                required
                            />
                        </b-form-group>
                    </div>

                    <b-form-group v-if="floorTextAccordingToType" :label="floorTextAccordingToType.outer">
                        <b-form-input 
                            type="number"
                            v-model="params.home.floors"
                            :placeholder="floorTextAccordingToType.inner"
                            size="md"
                            required
                        />
                    </b-form-group>

                    <b-form-checkbox v-model="params.home.hasSecurityAlarm">Наличие охранной сигнализации</b-form-checkbox>
                    <b-form-checkbox v-model="params.home.hasFireAlarm">Наличие пожарной сигнализации</b-form-checkbox>

                    <b-form-row>
                        <b-button size="lg" type="submit" variant="success">
                            <i class="far fa-envelope-open"></i> Создать запрос на страховку
                        </b-button>
                    </b-form-row>

                </b-form>
            </div>

            <div v-if="type === 'health'" class="card">
                <h3>Страхование здоровья:</h3>

                <b-form @submit="createNewInsurance">
                    <b-form-group label="Пол:">
                        <b-form-radio-group v-model="params.health.gender" :options="options.health.gender"/>
                    </b-form-group>

                    <b-form-group label="Зона действия страховки:">
                        <b-form-radio-group v-model="params.health.region" :options="options.health.region"/>
                    </b-form-group>

                    <b-form-group label="Возраст:">
                        <b-form-input 
                            type="number"
                            v-model="params.health.age"
                            placeholder="Введите возраст"
                            size="md"
                            required
                        />
                    </b-form-group>

                    <div class="form-row">
                        <b-form-group label="Профессия:">
                            <b-form-input 
                                type="text"
                                v-model="params.health.profession"
                                placeholder="Введите профессию"
                                size="md"
                                required
                            />
                        </b-form-group>
                        <b-form-group label="Опыт работы (лет):">
                            <b-form-input 
                                type="number"
                                v-model="params.health.experience"
                                placeholder="Введите опыт работы"
                                size="md"
                                required
                            />
                        </b-form-group>
                    </div>

                    <b-form-group label="Кол-во больничных (за последние 12 месяцев):">
                        <b-form-input 
                            type="text"
                            v-model="params.health.illnessAmountLastYear"
                            placeholder="Введите количество больничных"
                            size="md"
                            required
                        />
                    </b-form-group>

                    <b-form-group label="Кол-во посещений врача (за последние 12 месяцев):">
                        <b-form-input 
                            type="number"
                            v-model="params.health.doctorVisitsLastYear"
                            placeholder="Введите количество посещений"
                            size="md"
                            required
                        />
                    </b-form-group>

                    <b-form-checkbox v-model="params.home.coverSportIssues">
                        Должна ли страховка распростроняться на травмы связанные со спортом?
                    </b-form-checkbox>

                    <b-form-row>
                        <b-button size="lg" type="submit" variant="success">
                            <i class="far fa-envelope-open"></i> Создать запрос на страховку
                        </b-button>
                    </b-form-row>

                </b-form>
            </div>

        </div>
    </transition>
</template>

<script>
export default {
    data() {
        return {
            type: '',
            options: {
                car: {
                    bodyType: [
                        { text: 'легковой', value: 'легковой' },
                        { text: 'грузовой', value: 'грузовой' },
                        { text: 'мотоцикл', value: 'мотоцикл' },
                    ],
                    insuranceType: [
                        { text: 'обычное', value: 'обычное' },
                        { text: 'каско', value: 'каско' },
                    ]
                },
                home: {
                    buildingType: [
                        { text: 'квартира', value: 'квартира' },
                        { text: 'коттедж', value: 'коттедж' },
                        { text: 'гараж', value: 'гараж' },
                    ],
                    region: [
                        { text: 'Минск', value: 'Минск' },
                        { text: 'Минская обл.', value: 'Минская обл.' },
                        { text: 'Могилёвская обл.', value: 'Могилёвская обл.' },
                        { text: 'Брестская обл.', value: 'Брестская обл.' },
                        { text: 'Гомельская обл.', value: 'Гомельская обл.' },
                        { text: 'Гродненская обл.', value: 'Гродненская обл.' },

                    ]
                },
                health: {
                    gender: [
                        { text: 'мужской', value: 'мужской' },
                        { text: 'женский', value: 'женский' },
                    ],
                    region: [
                        { text: 'только РБ', value: 'только РБ' },
                        { text: 'все страны', value: 'все страны' },
                    ]
                }
            },
            params: {
                car: {
                    bodyType: 'легковой',
                    manufacturer: '',
                    model: '',
                    insuranceType: 'обычное',
                    year: '',
                    engineVolume: '',
                    maxPayout: ''
                },
                home: {
                    buildingType: 'квартира',
                    region: '',
                    peopleAmount: '',
                    area: '',
                    floors: '',
                    hasSecurityAlarm: false,
                    hasFireAlarm: false,
                },
                health: {
                    gender: 'мужской',
                    region: 'только РБ',
                    age: '',
                    profession: '',
                    experience: '',
                    illnessAmountLastYear: '',
                    doctorVisitsLastYear: '',
                    coverSportIssues: false,

                }
            }
        };
    },
    computed: {
        floorTextAccordingToType() {
            if (this.params.home.buildingType === 'гараж') {
                return null;
            }
            else if (this.params.home.buildingType === 'квартира') {
                return { outer: 'Этаж, на котором расположена квартира', inner: 'Введите этаж' };
            }
            else if (this.params.home.buildingType === 'коттедж') {
                return { outer: 'Кол-во этажей в коттедже', inner: 'Введите количество этажей' };
            }
        }
    },
    methods: {
        createNewInsurance() {

        }
    }
}

</script>

<style lang="scss" scoped>
.card {
    width: 550px;
}

.custom-checkbox {
    margin-bottom: 15px;
}

form {
    font-size: 18px;
}

h3 {
    margin-bottom: 10px;
}

.type-card {
    margin-bottom: 35px;
}

.form-group {
    margin-bottom: 2rem !important;
}

.insurance-radio-type {
    i {
        font-size: 19px;
        margin: 0 5px;
    }

    .car {
        color: #736CED;
    }

    .home {
        color: #63D471;
    }

    .health {
        color: #E07A5F;
    }
}

.form-row {
    display: flex;
    flex-direction: row;

    * {
        margin-right: 30px;
    }
}
</style>