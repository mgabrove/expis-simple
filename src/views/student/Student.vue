<template>
  <div class="home top10">
    <Phase1/>
    <div class="container">
      <div v-if="$store.state.canDownloadBill === true || $store.state.canDownloadAAI === true" class="row" style="display:flex; border:1px solid lightgray;">
        <Phase2 v-if="$store.state.canDownloadBill === true" class="col-12"/>
        <Phase3 v-if="$store.state.canDownloadAAI === true" class="col-12"/>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Phase1 from '@/views/student/Phase1.vue'
import Phase2 from '@/views/student/Phase2.vue'
import Phase3 from '@/views/student/Phase3.vue'

export default {
  name: 'Home',
  components: {
    Phase1,
    Phase2,
    Phase3
  },
  data() {
        return {
        }
    },  
  methods: {
  },
}
</script>

<style scoped>
@media (min-width: 1200px) {
    .pull-right-md {
        float: right;
    }
}
</style>