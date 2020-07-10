<template>
    <table style="width:90%; margin: 0 auto;">
        <tr class="dodatak">
            <td style="width:10%;"><p>{{this.user.year}}</p></td>
            <td style="width:20%;"><p>{{this.user.firstName}}</p></td>
            <td style="width:20%;"><p>{{this.user.lastName}}</p></td>
            <td style="width:10%;"><p>{{this.user.oib}}</p></td>
            <td style="width:10%;"><p>{{this.user.university}}</p></td>
            <td style="width:10%;"><button @click="showModal">Proširi</button></td>
        </tr>
        <Expand :user="user" v-if="isModalVisible === true" @close="closeModal"/>
    </table>

</template>

<script>
import Expand from '@/views/referada/Expand'

export default {
    props: ['user'],
    components: {
        Expand
    },
    data(){
        return{
            isModalVisible: false
        }
    },
    methods: {
        showModal() {
            this.isModalVisible = true
        },
        closeModal(broj) {
            this.$emit('change1', this.user.oib)
            this.$emit('change', broj)
            this.isModalVisible = false
        },
    },
    computed: {
    },
}
</script>

<style>
    .dodatak{
        border: 1px solid black;
        padding-top: 15px;
    }
    .dodaci {
        border-right: 1px solid black;
    }
</style>