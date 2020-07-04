<template>
    <div>
        <div>
            <h2>Čekaju</h2>
            <BillEntry v-for="user in usersWait" :key="user.oib" 
            :user="user" @change1="change1" @change="change" style="background: yellow;"/>
        </div>
        <div>
            <h2>Odbijeni</h2>
            <BillEntry v-for="user in usersDen" :key="user.oib" 
            :user="user" @change1="change1" @change="change" style="background: red;"/>
        </div>
        <div>
            <h2>Prihvaćeni</h2>
            <BillEntry v-for="user in usersApp" :key="user.oib" 
            :user="user" @change1="change1" @change="change" style="background: green;"/>
        </div>
        <div>
            <h2>Nisu u obradi</h2>
            <BillEntry v-for="user in usersNon" :key="user.oib"      
            :user="user" @change1="change1" @change="change" style="background: lightgray;"/>
        </div>
    </div>
</template>

<script>
import firebase from 'firebase'
import db from '@/firebase/firebaseInit'

import BillEntry from "@/views/referada/BillEntry.vue"

export default {
    components: {
        BillEntry
    },
    data(){
        return{
            usersWait: [],
            usersDen: [],
            usersApp: [],
            usersNon: [],
            user:  firebase.auth().currentUser,
            userDoc: null,
            filterDropdown: false,
            searchTerm: "",
            status: null,
            temp: null
        }
    },

    methods: {
        change(broj){
            {  
                var pom = null
                var goup = 2

                for(var i = 0; i < this.usersWait.length; i++) {
                    if(this.usersWait[i].oib === this.temp){
                        pom = this.usersWait[i]
                        this.usersWait.splice(i, i+1);
                    }
                }
                for(i = 0; i < this.usersDen.length; i++) {
                    if(this.usersDen[i].oib === this.temp){
                        pom = this.usersDen[i]
                        this.usersDen.splice(i, i+1);
                    }
                }
                for(i = 0; i < this.usersApp.length; i++) {
                    if(this.usersApp[i].oib === this.temp){
                        pom = this.usersApp[i]
                        this.usersApp.splice(i, i+1);
                    }
                }
                for(i = 0; i < this.usersNon.length; i++) {
                    if(this.usersNon[i].oib === this.temp){
                        pom = this.usersNon[i]
                        this.usersNon.splice(i, i+1);
                    }
                }
                if(broj === 1) {
                    this.usersApp.push(pom);
                    goup = 3
                }
                else if(broj === -1) {
                    this.usersDen.push(pom);
                }
                console.log("TU SAM")
                db.collection("users").where("oib","==",this.temp)
                .onSnapshot(snapshot => {
                    snapshot.forEach(doc => {
                        db.collection("users").doc(doc.id).update({ 
                            phase: goup,
                            status: broj
                        })
                    })
                })
            }
        },
        change1(oib){
            this.temp = oib
        }
},
    created(){
        console.log("TU SAM")
            db.collection("users").get().then(snap => {
                snap.forEach(doc => {
                    var user = doc.data();
                    if(user.isRef === false){ //preskoci ref
                        user.docid = doc.id;
                        if(user.status === 0) {
                            this.usersWait.push(user);
                        }
                        else if(user.status === -1) {
                            this.usersDen.push(user);
                        }
                        else if(user.status === 1) {
                            this.usersApp.push(user);
                        }
                        else {
                            this.usersNon.push(user);
                        }
                    }
                    else if (user.isRef === true & user.uID === this.user.uid){
                        this.userDoc = user 
                    }
                })
            })
    }

}
</script>