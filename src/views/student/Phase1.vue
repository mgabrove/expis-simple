<template>
    <div>
        <table class="table table-striped offset-1 col-10">
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
                        <button v-if="phase === 1" class="btn btn-primary" @click="showModal">Izmjeni</button>
                        <FET v-if="isModalVisible === true" :smjerovi="smjerovi" @close="closeModal"/>
                    </td>
                </tr>
            </tbody>
        </table>
        <div v-if="phase === 1">
            <button class="btn btn-primary" @click="prihvati">Prihvati</button>
            <button class="btn btn-primary" @click="showModal">Odbij</button>
        </div>
    </div>
</template>

<script>
import firebase from 'firebase'
import db from '@/firebase/firebaseInit'

import FET from '@/views/student/FET'

export default {
    name: 'phase1',
    props: ['phase'],
    components: {
        FET
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
            isModalVisible: false
        }
    },  
    methods: {
        showModal() {
            this.isModalVisible = true;
        },
        closeModal(lista) {
            this.smjerovi = lista;
            this.isModalVisible = false;
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
                            courses: this.smjerovi
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