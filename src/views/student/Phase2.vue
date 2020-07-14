<template>
    <div>
        <div>
            <h3>Uplata upisnine</h3>
            <div><a :href="$store.getters.billUrl" target="_blank"><img :src="$store.getters.billUrl" class="barcode_bill"></a></div>
            <button class="btn btn-primary shadow-none" style="background-color:#232323; border-color:#232323;" @click="showInfoBill">Podaci za uplatu</button>
        </div>
        <InfoBill v-if="isInfoBillVisible === true" @close="closeInfoBill"/>
    </div>
</template>

<script>
import InfoBill from '@/views/student/InfoBill'
export default {
    name: 'phase2',
    components: {
        InfoBill
    },
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
    .barcode_bill {
        width: 60%;
    }
    @media (min-width: 992px) {
        .floating-left {
            float:left;
        }
    }
    @media (max-width: 600px) {
        .barcode_bill {
            width: 100%;
        }
    }
</style>