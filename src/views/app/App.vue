<template>
  <div id="app">
    <Navbar :stupanj="stupanj" :ime="ime" :prezime="prezime"/>
    <router-view @prihvatio='prihvati' @prihvatio1='prihvati1' @prihvatio2='prihvati2'/>
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
      stupanj: 0,
      ime: null,
      prezime: null
    }
  },
  methods: {
    prihvati(broj) {
      this.stupanj = broj;
    },
    prihvati1(ime) {
      this.ime = ime;
    },
    prihvati2(prezime) {
      this.prezime = prezime;
    }
  }
}
</script>

<style src='@/assets/styles/pagestyles.css'></style>