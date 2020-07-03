<template>
  <div id="app">
    <Navbar :stupanj="stupanj"/>
    <router-view :stupanj="stupanj" @prihvatio='prihvati' @prihvatio1='prihvati1'/>
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
      stupanj: 1
    }
  },
  methods: {
    prihvati(broj) {
      this.stupanj = broj;
    },
    prihvati1() {
      this.stupanj = 3;
    }
  }
}
</script>

<style src='@/assets/styles/pagestyles.css'></style>