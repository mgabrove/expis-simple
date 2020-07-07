<template>
    <div>
        <table class="table table-striped offset-1 col-10 hidden-xs">
            <tbody>
                <tr>
                    <td class="table_title">Ime</td>
                    <td class="table_content">{{ime}}</td>
                    <td class="table_title">Godina</td>
                    <td class="table_content">{{godina}}</td>
                </tr>
                <tr>
                    <td class="table_title">Prezime</td>
                    <td class="table_content">{{prezime}}</td>
                    <td class="table_title">Studij</td>
                    <td class="table_content">{{studij}}</td>
                </tr>
                <tr>
                    <td class="table_title">OIB</td>
                    <td class="table_content">{{oib}}</td>
                    <td class="table_title">Smjer</td>
                    <td v-if="smjerovi === null" class="table_content">/</td>
                    <td v-if="smjerovi !== null" class="table_content">
                        <ol>
                            <li v-for="(smjer, broj) in smjerovi" v-bind:key="broj">
                                {{broj+1}}. {{smjer}}
                            </li>
                        </ol>
                        <button v-if="phase === 1" class="btn btn-primary shadow-none" style="background-color:#232323; border-color:#232323;" @click="showFET">Izmjeni</button>
                        <FET v-if="isFETVisible === true" :smjerovi="smjerovi" @close="closeFET"/>
                    </td>
                </tr>
            </tbody>
        </table>
        <div class="visible-xs">
            <table class="table table-striped offset-1 col-10" style="margin-bottom:0;">
                <tbody>
                    <tr>
                        <td class="table_title">Ime</td>
                        <td class="table_content">{{ime}}</td>
                    </tr>
                    <tr>
                        <td class="table_title">Prezime</td>
                        <td class="table_content">{{prezime}}</td>
                    </tr>
                    <tr>
                        <td class="table_title">OIB</td>
                        <td class="table_content">{{oib}}</td>
                    </tr>
                </tbody>
            </table>
            <table class="table table-striped offset-1 col-10">
                <tbody>
                    <tr></tr>
                    <tr>
                        <td class="table_title">Godina</td>
                        <td class="table_content">{{godina}}</td>
                    </tr>
                    <tr>
                        <td class="table_title">Studij</td>
                        <td class="table_content">{{studij}}</td>
                    </tr>
                    <tr>
                        <td class="table_title">Smjer</td>
                        <td v-if="smjerovi === null" class="table_content">/</td>
                        <td v-if="smjerovi !== null" class="table_content">
                            <ol>
                                <li v-for="(smjer, broj) in smjerovi" v-bind:key="broj">
                                    {{broj+1}}. {{smjer}}
                                </li>
                            </ol>
                            <button v-if="phase === 1" class="btn btn-primary shadow-none" style="background-color:#232323; border-color:#232323;" @click="showFET">Izmjeni</button>
                            <FET v-if="isFETVisible === true" :smjerovi="smjerovi" @close="closeFET"/>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>        
        <div v-if="phase === 1">
            <button class="btn btn-primary shadow-none" style="background-color:#232323; border-color:#232323;" @click="showConfirm">Prihvati</button>
            <button class="btn btn-primary shadow-none" style="background-color:#232323; border-color:#232323; margin-left:10px;" @click="showConfirm1">Odbij</button>
        </div>
        <Confirm :user="user" v-if="isConfirmVisible === true" :action="isConfirmAccept" @close="closeConfirm"/>
    </div>
</template>

<script>
import firebase from 'firebase'
import db from '@/firebase/firebaseInit'

import FET from '@/views/student/FET'
import Confirm from '@/views/student/Confirm'

export default {
    name: 'phase1',
    props: ['phase'],
    components: {
        FET,
        Confirm
    },
    data() {
        return {
            userDoc: null,
            user: firebase.auth().currentUser,
            ime: '',
            prezime: '',
            oib: '',
            godina: '',
            studij: '',
            smjerovi: '',
            isFETVisible: false,
            isConfirmVisible: false,
            isConfirmAccept: null
        }
    },  
    methods: {
        showFET() {
            this.isFETVisible = true;
        },
        closeFET(lista) {
            this.smjerovi = lista;
            this.isFETVisible = false;
        },
        showConfirm() {
            this.isConfirmAccept = true;
            this.isConfirmVisible = true;
        },
        showConfirm1() {
            this.isConfirmAccept = false;
            this.isConfirmVisible = true;
        },
        closeConfirm(broj) {
            console.log(broj)
            if(broj === 1) {
                this.prihvati()
            }
            else if(broj === -1) {
                console.log("TBC")
            }
            this.isConfirmVisible = false;
        },
        prihvati() {
            this.change()
            this.$emit('prihvatio', 2);
        },
        userDocListener(){ //refreshes userDoc (coz new friends/blocked)
        db.collection("users").where("uID","==",this.user.uid)
        .onSnapshot(snapshot => {
            snapshot.forEach(doc => {
                this.userDoc = doc.data()
                this.ime = this.userDoc.firstName
                this.prezime = this.userDoc.lastName
                this.oib = this.userDoc.oib
                this.godina = this.userDoc.year
                this.studij = this.userDoc.university
                this.smjerovi = this.userDoc.courses
            })
        })
        },
        change(){
                db.collection("users").where("uID","==",this.user.uid)
                .onSnapshot(snapshot => {
                    snapshot.forEach(doc => {
                        db.collection("users").doc(doc.id).update({ 
                            phase: 2,
                            courses: this.smjerovi,
                            status: 0
                        })
                    })
                })

        }
    },
    mounted () {
        this.userDocListener()
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