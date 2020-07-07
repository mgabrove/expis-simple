<template>
    <div id="nav" class="col-12">
      <div class="stupanj">
        <p v-if="this.$route.name !== 'Login' && stupanj === 0">{{ime}} {{prezime}}</p>
        <!---<p v-if="this.$route.name !== 'Login' && stupanj === 1">Potvrda upisa</p>--->
        <!---<p v-if="this.$route.name !== 'Login' && stupanj === 2">Plačanje računa</p>--->
        <!---<p v-if="this.$route.name !== 'Login' && stupanj === 3">Upis uspješan!</p>--->
      </div>
      <img :src="require('@/assets/img/logo.png')" contain class="logo"/>
      <button v-if="this.$route.name !== 'Login'" @click="logout" class="logout btn-close">Odjava</button>
    </div>
</template>

<script>
import firebase from 'firebase'

export default {
  name: 'Navbar',
  props: ['stupanj', 'ime', 'prezime'],
  data () {
    return {
      userDoc: null,
      user: firebase.auth().currentUser,
      phase: null
    }
  },
  methods: {
    logout () {
      firebase.auth().signOut().then(() => {
        this.$router.go({ name: 'Login'})
      })
    },
  },
}
</script>