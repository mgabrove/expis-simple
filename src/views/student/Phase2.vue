<template>
    <div class="col-12 flexdisplay">
        <div>
            <a :href="račun" target="_blank"><button>Račun za upis</button></a>
            <a :href="prototip" target="_blank"><button>Prototip ugovora</button></a>
        </div>
        <div class="flexdisplay">
            <UploadBill :status="status" @send="storeBill"/>
            <a :href="upload" target="_blank" v-if="status === -1"><button class="red-button">Odbijeno</button></a>
            <a :href="upload" target="_blank" v-if="status === 0"><button class="yellow-button">Obrada</button></a>
            <a :href="upload" target="_blank" v-if="status === 1"><button class="green-button">Prihvaćeno</button></a>
        </div>

    </div>
</template>

<script>
import firebase from 'firebase'
import db from '@/firebase/firebaseInit'    

import UploadBill from '@/views/student/UploadBill'

export default {
    name: 'phase2',
    props: ['stupanj'],
    components: {
        UploadBill
    },
    data() {
        return {
            user: firebase.auth().currentUser,
            račun: "",
            prototip: "",
            upload: "",
            status: ""
        }
    },  
    methods: {
        storeBill (billData) {
            this.change(billData, 0);
        },
        userDocListener(){ //refreshes userDoc (coz new friends/blocked)
            this.user = firebase.auth().currentUser
            db.collection("users").where("uID","==",this.user.uid)
            .onSnapshot(snapshot => {
                snapshot.forEach(doc => {
                    this.userDoc = doc.data()
                    this.račun = doc.data().billPt
                    this.prototip = doc.data().contractPt
                    this.upload = doc.data().billFull
                    this.status = doc.data().status
                })
            })
        },
        change(upload, num){
                this.user = firebase.auth().currentUser
                db.collection("users").where("uID","==",this.user.uid).get()
                .then(snapshot => {
                    snapshot.forEach(doc => {
                        console.log(doc.id)
                        db.collection("users").doc(doc.id).update({ 
                            billFull: upload,
                            status: num
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