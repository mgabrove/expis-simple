<template>
  <div class="home top10">
    <Phase1 :stupanj="stupanj" v-if="stupanj >= 1" @prihvatio='prihvati'/>
    <Phase2 v-if="stupanj >= 2" @alliswell='prihvati1'/>
    <Phase3 v-if="stupanj >= 3"/>
  </div>
</template>

<script>
// @ is an alias to /src
import Phase1 from '@/views/student/Phase1.vue'
import Phase2 from '@/views/student/Phase2.vue'
import Phase3 from '@/views/student/Phase3.vue'

export default {
  name: 'Home',
  props: ['stupanj'],
  components: {
    Phase1,
    Phase2,
    Phase3
  },
  methods: {
    prihvati() {
      this.$emit('prihvatio');
    },
    prihvati1() {
      this.$emit('prihvatio1');
    }
  },
}
</script>