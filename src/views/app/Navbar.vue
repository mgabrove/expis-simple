<template>
    <div id="nav" class="col-12">
      <p v-if="this.$route.name !== 'Login'" class="stupanj">{{phase}}</p>
      <img :src="require('@/assets/img/logo.png')" contain class="logo"/>
      <button v-if="this.$route.name !== 'Login'" @click="logout" class="logout">Logout</button>
    </div>
</template>

<script>
import firebase from 'firebase'
import db from '@/firebase/firebaseInit'

export default {
  name: 'Navbar',
  props: ['stupanj'],
  data () {
    return {
      user: firebase.auth().currentUser,
      phase: null
    }
  },
  methods: {
    logout () {
      firebase.auth().signOut().then(() => {
        this.$router.push({ name: 'Login'})
      })
    },
    userDocListener(){ //refreshes userDoc (coz new friends/blocked)
        db.collection("users").where("uID","==",this.user.uid)
        .onSnapshot(snapshot => {
            snapshot.forEach(doc => {
                this.userDoc = doc.data()
                this.phase = this.userDoc.phase
            })
        })
      },
  },
  mounted () {
        this.userDocListener()
  },
}
</script>