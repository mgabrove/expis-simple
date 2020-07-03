<template>
    <div id="nav" class="col-12">
      <p v-if="this.$route.name !== 'Login'" class="stupanj">{{stupanj}}</p>
      <img :src="require('@/assets/img/logo.png')" contain class="logo"/>
      <router-link v-if="this.$route.name !== 'Login'" to="/" class="logout">Logout</router-link>
      <a @click="logout" class="nav-item nav-link">Logout</a>
    </div>
</template>

<script>
export default {
  name: 'Navbar',
  props: ['stupanj'],
  data () {
    return {
    }
  }
}
</script>