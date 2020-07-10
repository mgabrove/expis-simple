<template>
    <div id="nav" class="col-12">
      <div class="stupanj">
      </div>
      <button v-if="this.$route.name !== 'Login' && $store.state.canDownloadBill === true && $store.state.canDownloadAAI === true && $store.state.acceptedEnrollment === true" @click="refreshScenarioDummy" class="stupanj btn-close">RefreshScenarioDummy</button>
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
    refreshScenarioDummy () {
      this.$store.state.canDownloadBill = false
      this.$store.state.canDownloadAAI = false
      this.$store.state.acceptedEnrollment = false
      this.$store.dispatch('refreshScenarioDummy')
    }
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