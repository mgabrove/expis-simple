<template>
  <div class="home top10">
    <Phase1 :phase="phase" v-if="phase >= 1" @prihvatio='prihvati'/>
    <Phase2 v-if="phase >= 2" @prihvatio='prihvati'/>
    <Phase3 v-if="phase >= 3"/>
  </div>
</template>

<script>
// @ is an alias to /src
import Phase1 from '@/views/student/Phase1.vue'
import Phase2 from '@/views/student/Phase2.vue'
import Phase3 from '@/views/student/Phase3.vue'

export default {
  name: 'Home',
  props: ['phase'],
  components: {
    Phase1,
    Phase2,
    Phase3
  },
  data() {
        return {
            ime: 'Ivan',
            prezime: 'Ivanić',
            oib: '012345678',
            godina: '1',
            studij: 'FET',
            smjerovi: ['Financijski management', 'Management i poduzetništvo', 'Marketinško upravljanje', 'Informatički menadžment', 'Turizam'],
            isModalVisible: false
        }
    },  
  methods: {
    prihvati(broj) {
      this.$emit('prihvatio', broj);
    }
  },
}
</script>