<template>
    <div>
        <h2>Osobni podaci</h2>
        <table class="table table-striped offset-1 col-10 hidden-xs">
            <tbody>
                <tr>
                    <td class="table_title">OIB</td>
                    <td class="table_content">{{$store.state.oib}}</td>
                    <td class="table_title">Telefon</td>
                    <td class="table_content">{{$store.state.telephone}}</td>
                </tr>
                <tr>
                    <td class="table_title">Ime</td>
                    <td class="table_content">{{$store.state.name}}</td>
                    <td class="table_title">Fakultet</td>
                    <td class="table_content">{{$store.state.faculty}}</td>
                </tr>
                <tr>
                    <td class="table_title">Prezime</td>
                    <td class="table_content">{{$store.state.surname}}</td>
                    <td class="table_title">Studij</td>
                    <td class="table_content">{{$store.state.course}}</td>
                </tr>
                <tr>
                    <td class="table_title">Poštanski broj</td>
                    <td class="table_content">{{$store.state.postalNumber}}</td>
                    <td class="table_title">Prvi studij</td>
                    <td v-if="$store.state.notStudiedBefore === true" class="table_content">DA</td>
                    <td v-if="$store.state.notStudiedBefore === false" class="table_content">NE</td>
                </tr>
                <tr>
                    <td class="table_title">Mjesto</td>
                    <td class="table_content">{{$store.state.postalTown}}</td>
                    <td class="table_title">Vrsta studiranja</td>
                    <td v-if="$store.state.fullTimeStudent === true" class="table_content">Redovno</td>
                    <td v-if="$store.state.fullTimeStudent === false" class="table_content">Izvanredno</td>
                </tr>
                <tr>
                    <td class="table_title">Adresa</td>
                    <td class="table_content">{{$store.state.streetAddress}}</td>
                    <td v-if="$store.state.courses === undefined"></td>
                    <td v-if="$store.state.courses !== undefined" class="table_title">
                        Moduli
                        <button v-if="$store.state.courses != undefined" class="btn btn-primary shadow-none" style="background-color:#232323; border-color:#232323;" @click="showFET">IZMIJENI</button>
                    </td>
                    <td v-if="$store.state.courses === undefined" class="table_content"></td>
                    <td v-if="$store.state.courses !== undefined" class="table_content">
                        <ol>
                            <li v-for="(smjer, broj) in $store.state.courses" v-bind:key="broj">
                                {{broj+1}}. {{smjer}}
                            </li>
                        </ol>
                        <FET v-if="isFETVisible === true" :smjerovi="$store.state.courses" @close="closeFET"/>
                    </td>
                </tr>
            </tbody>
        </table>
        <div class="visible-xs">
            <table class="table table-striped offset-1 col-10" style="margin-bottom:0;">
                <tbody>
                    <tr>
                        <td class="table_title">OIB</td>
                        <td class="table_content">{{$store.state.oib}}</td>
                    </tr>
                    <tr>
                        <td class="table_title">Ime</td>
                        <td class="table_content">{{$store.state.name}}</td>
                    </tr>
                    <tr>
                        <td class="table_title">Prezime</td>
                        <td class="table_content">{{$store.state.surname}}</td>
                    </tr>
                    <tr>
                        <td class="table_title">Poštanski broj</td>
                        <td class="table_content">{{$store.state.postalNumber}}</td>
                    </tr>
                    <tr>
                        <td class="table_title">Mjesto</td>
                        <td class="table_content">{{$store.state.postalTown}}</td>
                    </tr>
                    <tr>
                        <td class="table_title">Adresa</td>
                        <td class="table_content">{{$store.state.streetAddress}}</td>
                    </tr>                                
                </tbody>
            </table>
            <table class="table table-striped offset-1 col-10">
                <tbody>
                    <tr>
                        <td class="table_title">Telefon</td>
                        <td class="table_content">{{$store.state.telephone}}</td>
                    </tr>
                    <tr>
                        <td class="table_title">Fakultet</td>
                        <td class="table_content">{{$store.state.faculty}}</td>
                    </tr>
                    <tr>
                        <td class="table_title">Studij</td>
                        <td class="table_content">{{$store.state.course}}</td>
                    </tr>
                    <tr>
                        <td class="table_title">Prvi studij</td>
                        <td v-if="$store.state.notStudiedBefore === true" class="table_content">DA</td>
                        <td v-if="$store.state.notStudiedBefore === false" class="table_content">NE</td>
                    </tr>
                    <tr>
                        <td class="table_title">Vrsta studiranja</td>
                        <td v-if="$store.state.fullTimeStudent === true" class="table_content">Redovno</td>
                        <td v-if="$store.state.fullTimeStudent === false" class="table_content">Izvanredno</td>
                    </tr>
                    <tr>
                        <td v-if="$store.state.courses === undefined"></td>
                        <td v-if="$store.state.courses !== undefined" class="table_title">
                            Moduli
                            <button v-if="$store.state.courses != undefined" class="btn btn-primary shadow-none" style="background-color:#232323; border-color:#232323;" @click="showFET">IZMIJENI</button>
                        </td>
                        <td v-if="$store.state.courses === undefined" class="table_content"></td>
                        <td v-if="$store.state.courses !== undefined" class="table_content">
                            <ol>
                                <li v-for="(smjer, broj) in $store.state.courses" v-bind:key="broj">
                                    {{broj+1}}. {{smjer}}
                                </li>
                            </ol>
                            <FET v-if="isFETVisible === true" :smjerovi="$store.state.courses" @close="closeFET"/>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>        
        <div v-if="$store.state.acceptedEnrollment != true">
            <button class="btn btn-primary shadow-none" style="background-color:#232323; border-color:#232323;" @click="showConfirm">Prihvati</button>
            <button class="btn btn-primary shadow-none" style="background-color:#232323; border-color:#232323; margin-left:10px;" @click="showDecline">Odbij</button>
        </div>
        <Confirm v-if="isConfirmVisible === true" :isAccept="isConfirmAccept" @close="closeConfirm"/>
    </div>
</template>

<script>
import FET from '@/views/student/FET'
import Confirm from '@/views/student/Confirm'

export default {
    name: 'phase1',
    components: {
        FET,
        Confirm
    },
    data() {
        return {
            isFETVisible: false,
            isConfirmVisible: false,
            isConfirmAccept: null
        }
    },  
    methods: {
        showFET() {
            this.isFETVisible = true
        },
        closeFET() {
            this.isFETVisible = false
        },
        showConfirm() {
            this.isConfirmAccept = true
            this.isConfirmVisible = true
        },
        showDecline() {
            this.isConfirmAccept = false
            this.isConfirmVisible = true
        },
        closeConfirm(broj) {
            if(broj === 1) {
                this.prihvati()
            }
            else if(broj === -1) {
                console.log("TBI")
            }
            this.isConfirmVisible = false
        },
        prihvati() {
            this.$store.dispatch('acceptEnrollment')
        },
    },
    mounted () {
    },
};
</script>

<style scoped>
    @media (max-width: 767px) {
        .hidden-xs {
            display: none; 
        }
    }
    @media (min-width: 768px) {
        .visible-xs {
            display: none;       
        }
    }
</style>