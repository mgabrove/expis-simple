<template>
    <div v-if="$store.state.render" class="margin-top-120">
        <Student v-if="$store.state.oib != null"/>
        <Referada v-if="$store.state.oib === null"/>
    </div>
</template>

<script>
import Student from '@/views/student/Student.vue'
import Referada from '@/views/referada/Referada.vue'

export default {
    components: {
        Student,
        Referada
    },
    data () {
        return {
        };
    },
    methods: {
    },
    mounted () {
        this.$store.dispatch('retrieveInfo')
        this.$route.meta.title = "Upisi na UniPu - "+this.$store.getters.name+" "+this.$store.getters.surname
    },
};
</script>