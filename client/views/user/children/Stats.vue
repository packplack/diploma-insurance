<template>
    <transition enter-active-class="fadeIn">
        <div class="cabinet-view">
            <div class="card users-card">
                <h2>Кол-во созданных страховок за день</h2>
                <canvas ref="amountChart" width="800" height="300" />
            </div>
            <div class="card users-card">
                <h2>Выручка (в руб) за день</h2>
                <canvas ref="moneyChart" width="800" height="300" />
            </div>
        </div>
    </transition>
</template>

<script>
import Chart from 'chart.js';
import axios from 'axios';

export default {
    data() {
        return {
            chartData: null,
        }
    },
    async mounted() {
        const response = await axios.get('/api/users/get-stats');
        this.chartData = response.data;
        new Chart(this.$refs.amountChart, {
            type: 'line',
            data: this.chartData.amountChart,
            options: {
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero:true,
                            fixedStepSize: 1,
                            suggestedMax: 10
                        }
                    }]
                }
            }
        });
        new Chart(this.$refs.moneyChart, {
            type: 'line',
            data: this.chartData.moneyChart,
            options: {
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero:true,
                            fixedStepSize: 50,
                            suggestedMax: 200
                        }
                    }]
                }
            }
        });
    }
}

</script>

<style lang="scss" scoped>
.card {
    width: 900px;
    margin: 20px 0;
}
</style>