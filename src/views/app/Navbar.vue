<template>
    <div id="nav" class="col-12">
      <img :src="require('@/assets/img/logo.png')" contain class="logo"/>
      <button v-if="this.$route.name !== 'Login'" @click="destroyToken" class="logout btn-close">Odjava</button>
    </div>
</template>

<script>
export default {
  name: 'Navbar',
  data () {
    return {
    }
  },
  methods: {
    destroyToken () {
      this.$store.dispatch('destroyToken')
      .then(() => {
        this.$router.push({
          name: 'Login'
        })
        .catch(err => {
          console.log(err)
        })
      })
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