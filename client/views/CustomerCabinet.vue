<template>
    <div>
        Customer
        <button>DAI</button>
    </div>
</template>

<script>
import axios from 'axios';
import { mapGetters } from 'vuex';

export default {
    methods: {
        async dai() {
            const response = await axios.get('/api/customers/get-my-insurances');
        }
    },
    async created() {
        const response = await axios.get('/api/customers/get-my-insurances');
        console.log(response);
    }
};
</script>

<style lang="scss" scoped>

</style>