<template>
    <div id="nav" class="col-12">
      <div class="stupanj">
      </div>
      <img :src="require('@/assets/img/logo.png')" contain class="logo"/>
      <button v-if="this.$route.name !== 'Login'" @click="logout" class="logout btn-close">Odjava</button>
    </div>
</template>

<script>
import firebase from 'firebase'

export default {
  name: 'Navbar',
  data () {
    return {
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

<style scoped>
  .sticky { 
    position: fixed;
    top: 0;
    width: 100%;
  }
</style>