<template>
    <div>
        <div>
            <a :href="$store.state.billKey" target="_blank" class="floating-left"><button @click="pushingForwardDummy" class="btn btn-primary shadow-none" style="background-color:#232323; border-color:#232323;">Račun</button></a>
        </div>
    </div>
</template>

<script>
export default {
    name: 'phase2',
    data() {
        return {
        }
    },  
    methods: {
        pushingForwardDummy () {
            this.$store.state.canDownloadAAI = true
            this.$store.dispatch('downloadAIIDummy')
        }
    },
};
</script>

<style scoped>
    @media (min-width: 992px) {
        .floating-left {
            float:left;
        }
    }
</style>