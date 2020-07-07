<template>
    <div>
        <div>
            <a :href="račun" target="_blank" class="floating-left"><button class="btn btn-primary shadow-none" style="background-color:#232323; border-color:#232323;">Račun</button></a>
            <a :href="prototip" target="_blank" class="floating-left"><button class="btn btn-primary shadow-none" style="background-color:#232323; border-color:#232323; margin-left:10px;">Prototip ugovora</button></a>
        </div>
    </div>
</template>

<script>
import firebase from 'firebase'
import db from '@/firebase/firebaseInit'    

export default {
    name: 'phase2',
    props: ['stupanj'],
    data() {
        return {
            user: firebase.auth().currentUser,
            račun: "",
            prototip: "",
            status: ""
        }
    },  
    methods: {
        userDocListener(){ 
            this.user = firebase.auth().currentUser
            db.collection("users").where("uID","==",this.user.uid)
            .onSnapshot(snapshot => {
                snapshot.forEach(doc => {
                    this.userDoc = doc.data()
                    this.račun = doc.data().billPt
                    this.prototip = doc.data().contractPt
                    this.status = doc.data().status
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
    @media (min-width: 992px) {
        .floating-left {
            float:left;
        }
    }
</style>