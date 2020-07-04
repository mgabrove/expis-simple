<template>
    <div id="nav" class="col-12">
      <p v-if="this.$route.name !== 'Login' && stupanj != 0" class="stupanj">{{stupanj}}</p>
      <p v-if="this.$route.name !== 'Login' && stupanj === 0" class="stupanj">{{ime}} {{prezime}}</p>
      <img :src="require('@/assets/img/logo.png')" contain class="logo"/>
      <button v-if="this.$route.name !== 'Login'" @click="logout" class="logout">Logout</button>
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