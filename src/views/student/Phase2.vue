<template>
    <div>
        <div>
            <a :href="$store.state.billKey" target="_blank" class="floating-left"><img :src="$store.getters.billUrl"></a>
            <button class="btn btn-primary shadow-none floating-left" style="background-color:#232323; border-color:#232323;">Račun</button>
        </div>
        <InfoBill v-if="isInfoBillVisible === true" @close="closeInfoBill"/>
    </div>
</template>

<script>
import InfoBill from '@/views/student/InfoBill'
export default {
    name: 'phase2',
    data() {
        return {
            isInfoBillVisible: false
        }
    },  
    methods: {
        showInfoBill() {
            this.isInfoBillVisible = true
        },
        closeInfoBill() {
            this.isInfoBillVisible = false
        },
    },
};
</script>

<style scoped>
    @media (min-width: 992px) {
        .floating-left {
            float:left;
        }
    }
</style>