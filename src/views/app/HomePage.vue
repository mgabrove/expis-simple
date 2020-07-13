<template>
    <div v-if="$store.state.render" class="margin-top-120">
        <vue-headful
            :title="this.title"
            :description="this.title"
        />
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
            title: null
        };
    },
    methods: {
    },
    created () {
        this.$store.dispatch('retrieveInfo')
        .then(this.title = "Upisi na UniPu - "+this.$store.getters.name+" "+this.$store.getters.surname)
        console.log(this.$store.state.name)
        console.log(this.title)
    },
};
</script>