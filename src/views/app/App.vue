<template>
  <div id="app">
    <Navbar style="position:fixed; top:0; z-index:1;"/>
    <router-view/>
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
    }
  },
  methods: {
  },
  mounted () {
  }
}
</script>

<style src='@/assets/styles/pagestyles.css'></style>