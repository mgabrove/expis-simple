<template>
  <div id="app">
    <Navbar :stupanj="stupanj"/>
    <router-view @prihvatio='prihvati'/>
  </div>
</template>

<script>
import Navbar from '@/views/app/Navbar'

export default {
  name: 'App',
  components: {
    Navbar
  },
  data () {
    return {
      stupanj: 0
    }
  },
  methods: {
    prihvati(broj) {
      this.stupanj = broj;
    }
  }
}
</script>

<style src='@/assets/styles/pagestyles.css'></style>