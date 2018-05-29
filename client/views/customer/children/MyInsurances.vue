<template>
    <transition enter-active-class="fadeIn">
        <div v-if="insurances" class="cabinet-view">

            <div v-if="pendingInsurances.length" class="card insurances-card">
                <h4>Страховки на рассмотрении:</h4>
                <vuetable 
                    :api-mode="false"
                    :data="pendingInsurances"
                    :fields="tableFields"
                    class="table table-striped vuetalbe"
                >
                    <template slot="data" slot-scope="props">
                        <b-button class="details-button" size="lg" type="submit" variant="outline-success" @click="showDetailsModal(props.rowData)">
                            <i class="fas fa-window-restore"></i> Показать
                        </b-button>
                    </template>
                </vuetable>
            </div>

            <div class="card insurances-card">
                <h4>Страховки ожидающие оплаты:</h4>
                <vuetable 
                    :api-mode="false"
                    :data="pendingInsurances"
                    :fields="tableFields"
                    class="table table-striped vuetalbe"
                >
                    <template slot="data" slot-scope="props">
                        <b-button class="details-button" size="lg" type="submit" variant="outline-success" @click="showDetailsModal(props.rowData)">
                            <i class="fas fa-window-restore"></i> Показать
                        </b-button>
                    </template>
                </vuetable>

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
            tableFields: [
                { title: 'Уникальный идентификатор', name: 'id' },
                { title: 'Тип', name: 'type', callback: this.handleType },
                { title: 'Статус', name: 'status', callback: this.handleStatus },
                { title: 'Подробная информация', name: '__slot:data' },
                { title: 'Дата создания', name: 'created_at' },
            ]
        };
    },
    computed: {
        pendingInsurances() {
            return this.insurances.filter(i => i.status === 'pending');
        },
        waitingForPaymentInsurances() {
            return this.insurances.filter(i => i.status === 'waiting-for-payment');
        },
        doneInsurances() {
            return this.insurances.filter(i => i.status === 'done');
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
        handleStatus(status) {
            if (status === 'pending') {
                return 'На рассмотрении';
            }
            else if (status === 'waiting-for-payment') {
                return 'Ожидание платежа';

            }
            else if (status === 'done') {
                return 'Оформлена';
            }
        },
        showDetailsModal(row) {
            this.modal.title = `Страховка ${row.id}`;
            this.modal.data = row.data;
            this.$refs.detailsModal.show();
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
    width: 80%;
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
