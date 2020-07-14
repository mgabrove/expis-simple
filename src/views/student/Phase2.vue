<template>
    <div>
        <div>
            <p>Uplata upisnine</p>
            <a :href="$store.getters.billUrl" target="_blank" class="floating-left"><img :src="$store.getters.billUrl" style="width:100%;"></a>
            <button class="btn btn-primary shadow-none floating-left" style="background-color:#232323; border-color:#232323;" @click="showInfoBill">Račun</button>
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
    @media (min-width: 992px) {
        .floating-left {
            float:left;
        }
    }
</style>