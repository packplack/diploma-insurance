<template>
    <transition enter-active-class="fadeIn">
        <div v-if="insurances" class="cabinet-view">

            <div class="card insurances-card">
                <h4>Страховки на рассмотрении:</h4>
                <vuetable 
                    v-if="pendingInsurances.length"
                    :api-mode="false"
                    :data="pendingInsurances"
                    :fields="pendingTableFields"
                    class="table table-striped vuetalbe"
                >
                    <template slot="data" slot-scope="props">
                        <b-button class="details-button" size="lg" variant="outline-success" @click="showDetailsModal(props.rowData)">
                            <i class="fas fa-window-restore"></i> Показать
                        </b-button>
                    </template>
                </vuetable>
                <b-alert show v-else>У Вас нет страховок в данном статусе.</b-alert>
            </div>

            <div class="card insurances-card">
                <h4>Страховки ожидающие оплаты:</h4>
                <vuetable 
                    v-if="waitingForPaymentInsurances.length"
                    :api-mode="false"
                    :data="waitingForPaymentInsurances"
                    :fields="waitingForPaymentTableFields"
                    class="table table-striped vuetalbe"
                >
                    <template slot="data" slot-scope="props">
                        <b-button class="details-button" size="lg" variant="outline-success" @click="showDetailsModal(props.rowData)">
                            <i class="fas fa-window-restore"></i> Показать
                        </b-button>
                    </template>
                    <template slot="actions" slot-scope="props">
                        <b-button class="details-button" size="lg" variant="outline-primary" @click="performPayment(props.rowData)">
                            <i class="far fa-credit-card"></i> Оплатить
                        </b-button>
                    </template>
                </vuetable>
                <b-alert show v-else>У Вас нет страховок в данном статусе.</b-alert>
            </div>
            
            <div class="card insurances-card">
                <h4>Оформленные страховки:</h4>
                <vuetable 
                    v-if="paidInsurances.length"
                    :api-mode="false"
                    :data="paidInsurances"
                    :fields="paidTableFields"
                    class="table table-striped vuetalbe"
                >
                    <template slot="data" slot-scope="props">
                        <b-button class="details-button" size="lg" variant="outline-success" @click="showDetailsModal(props.rowData)">
                            <i class="fas fa-window-restore"></i> Показать
                        </b-button>
                    </template>
                    <template slot="actions" slot-scope="props">
                        <b-button class="details-button" size="lg" variant="outline-primary" @click="sendPDF()">
                            <i class="far fa-envelope"></i> Прислать PDF
                        </b-button>
                    </template>
                </vuetable>
                <b-alert show v-else>У Вас нет страховок в данном статусе.</b-alert>
            </div>

            <b-modal ref="detailsModal" size="lg" :centered="true" hide-footer :title="modal.title">
                <div class="d-block text-center">
                    <h3>Подробная информация:</h3>
                    {{ modal.data }}
                </div>
            </b-modal>
        </div>
    </transition>
</template>

<script>
import axios from 'axios';

export default {
    data() {
        return {
            insurances: null,
            modal: {
                title: '',
                data: {}
            },
            pendingTableFields: [
                { title: 'Уникальный идентификатор', name: 'id' },
                { title: 'Тип', name: 'type', callback: this.handleType },
                { title: 'Подробная информация', name: '__slot:data' },
                { title: 'Стоимость', name: 'price', callback: (value) => `${value} РУБ` },
                { title: 'Дата создания', name: 'created_at' },
            ]
        };
    },
    computed: {
        waitingForPaymentTableFields() {
            return [
                ...this.pendingTableFields,
                { title: 'Дата рассмотрения', name: 'reviewed_at' },
                { title: 'Действия', name: '__slot:actions' },
            ]
        },
        paidTableFields() {
            return [
                ...this.pendingTableFields,
                { title: 'Дата рассмотрения', name: 'reviewed_at' },
                { title: 'Дата оплаты', name: 'paid_at' },
                { title: 'Действия', name: '__slot:actions' }
            ]
        },
        pendingInsurances() {
            return this.insurances.filter(i => i.status === 'pending');
        },
        waitingForPaymentInsurances() {
            return this.insurances.filter(i => i.status === 'waiting-for-payment');
        },
        paidInsurances() {
            return this.insurances.filter(i => i.status === 'paid');
        }
    },
    methods: {
        handleType(type) {
            if (type === 'car') {
                return 'Авто-страховка';
            }
            else if (type === 'health') {
                return 'Страхование здоровья';

            }
            else if (type === 'home') {
                return 'Страхование жилья';
            }
        },
        showDetailsModal(row) {
            this.modal.title = `Страховка ${row.id}`;
            this.modal.data = row.data;
            this.$refs.detailsModal.show();
        },
        async performPayment(row) {
            await axios.post('/api/customers/perform-payment', {
                id: row.id
            });
            this.insurances = null;
            const response = await axios.get('/api/customers/get-my-insurances');
            this.insurances = response.data;
        },
        sendPDF() {
            window.alert('В РАЗРАБОТКЕ ...')
        }
    },
    async created() {
        const response = await axios.get('/api/customers/get-my-insurances');
        this.insurances = response.data;
    }
}

</script>

<style lang="scss" scoped>
.insurances-card {
    width: auto;
    padding-left: 20px;
    padding-right: 20px;
    margin: 20px 0;

    h4 {
        margin-bottom: 0;
    }
}

.details-button {
    margin: 0 !important;
}
</style>

<style lang="scss">
button.close {
    margin: 0 !important;
}
</style>
