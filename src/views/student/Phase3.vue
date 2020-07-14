<template>
    <div>
        <h3>Skidanje AAI identiteta</h3>
        <a :href="$store.state.AAIkey" target="_blank"><button class="btn btn-primary shadow-none" style="background-color:#232323; border-color:#232323;">AAI podaci</button></a>
    </div>
</template>

<script>
export default {
    name: 'phase3',
    data() {
        return {
        }
    },  
    methods: {
    }
};
</script>

<style scoped>
    @media (min-width: 992px) {
        .floating-right {
            float:right;
        }
    }
    @media (max-width: 768px) {
        .margin-top-10 {
            margin-top: 10px;
        }
    }
</style>