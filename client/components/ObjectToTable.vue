<template>
    <table class="table table-striped">
        <tr v-for="(item, index) in tableData" :key="index">
            <td class="key">{{ item.newKey }}</td>
            <td :class="item.classes" v-html="item.value" />
        </tr>
    </table>
</template>

<script>
export default {
    props: {
        object: {
            type: Object,
            required: true,
        },
        objectMapping: {
            type: Array,
            default: () => null,
        },
    },
    computed: {
        tableData() {
            if (this.objectMapping) {
                return this.objectMapping.map((item) => {
                    const oldValue = this.object[item.oldKey];
                    /* eslint-disable no-param-reassign */
                    item.classes = [
                        item.addClass ? item.addClass(oldValue) : '',
                    ];
                    
                    item.value = item.aggregation
                        ? item.aggregation(oldValue)
                        : oldValue;
                    /* eslint-enable no-param-reassign */
                    return item;
                });
            }
            
            return Object.keys(this.object).map(key => ({
                newKey: key,
                value: this.object[key],
                classes: [],
            }));
        },
    },
};
</script>

<style lang="scss" scoped>
.key {
    background-color: rgba(0,0,0,.05);
}
</style>
