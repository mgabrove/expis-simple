<template>
    <div>
        <div>
            <h2>Čekaju</h2>
            <ApproveEntry v-for="user in usersWait" :key="user.oib" 
            :user="user" @change1="changing1" @change="changing" style="background: yellow;"/>
        </div>
        <div>
            <h2>Odbijeni</h2>
            <ApproveEntry v-for="user in usersDen" :key="user.oib" 
            :user="user" @change1="changing1" @change="changing" style="background: red;"/>
        </div>
        <div>
            <h2>Prihvaćeni</h2>
            <ApproveEntry v-for="user in usersApp" :key="user.oib" 
            :user="user" @change1="changing1" @change="changing" style="background: green;"/>
        </div>
        <div>
            <h2>Nisu u obradi</h2>
            <ApproveEntry v-for="user in usersNon" :key="user.oib"      
            :user="user" @change1="changing1" @change="changing" style="background: lightgray;"/>
        </div>
    </div>
</template>

<script>

import ApproveEntry from "@/views/referada/ApproveEntry"

export default {
    components: {
        ApproveEntry
    },
    data(){
        return{
            usersWait: [],
            usersDen: [],
            usersApp: [],
            usersNon: [],
            user: null,
            //userDoc: firebase.auth().currentUser,
            filterDropdown: false,
            searchTerm: "",
            status: null,
            temp: ""
        }
    },

    /* methods: {
        changing(broj){
            {  
                var goup = 2;
                if(broj === 1) {
                    goup = 3
                }
                db.collection("users").where("oib","==",this.temp).get()
                .then(snapshot => {
                    snapshot.forEach(doc => {
                        db.collection("users").doc(doc.id).update({ 
                            phase: goup,
                            status: broj
                        })
                    }) 
                })
            }
        },
        changing1(oib){
            this.temp = oib
        },
        userDocListener(){ 
            db.collection("users").where("isRef", "==", false)
            .onSnapshot(snap => {
                this.usersWait = [],
                this.usersDen = [],
                this.usersApp = [],
                this.usersNon = [],
                snap.forEach(doc => {
                    var user = doc.data()
                    if(user.isRef === false){ //preskoci ref
                        if(user.status === 0) {
                            this.usersWait.push(user)
                        }
                        else if(user.status === -1) {
                            this.usersDen.push(user)
                        }
                        else if(user.status === 1) {
                            this.usersApp.push(user)
                        }
                        else {
                            this.usersNon.push(user)
                        }
                    }
                })
            })
        }
    },
    mounted(){
        this.userDocListener()
    } */

}
</script>