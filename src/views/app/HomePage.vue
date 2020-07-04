<template>
    <div>
        <Student v-if="isRef === false" :phase="phase" @prihvatio='prihvati'/>
        <Referada v-if="isRef === true" />
    </div>
</template>

<script>
import firebase from 'firebase'
import db from '@/firebase/firebaseInit'

import Student from '@/views/student/Student.vue'
import Referada from '@/views/referada/Referada.vue'

export default {
    components: {
        Student,
        Referada
    },
    data () {
        return {
            profile: null,
            user: firebase.auth().currentUser,
            currentUser: null,
            loading: true,
            userDoc: null,
            phase: null,
            isRef: null,
            ime: null,
            prezime: null
        };
    },
    methods: {
        prihvati(broj) {
            this.phase = broj;
            this.$emit('prihvatio', broj);
        },
        userDocListener(){ //refreshes userDoc (coz new friends/blocked)
            console.log("TU SAM")
            db.collection("users").where("uID","==",this.user.uid)
            .onSnapshot(snapshot => {
                snapshot.forEach(doc => {
                    this.userDoc = doc.data()
                    this.isRef = doc.data().isRef
                    this.phase = doc.data().phase
                    this.ime = doc.data().firstName
                    this.prezime = doc.data().lastName
                })
                this.$emit('prihvatio', this.phase)
                this.$emit('prihvatio1', this.ime)
                this.$emit('prihvatio2', this.prezime)
            })
        }
    },
    mounted () {
        this.userDocListener()
    },
};
</script>